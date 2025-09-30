import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, Calendar, MessageSquare, CreditCard, 
  Download, LogOut, FileDown
} from "lucide-react";
import type { Contact, Payment } from "@shared/schema";
import AdminLogin from "@/components/AdminLogin";

export default function AdminDashboard() {
  const { toast } = useToast();

  const { data: authCheck, isLoading: isCheckingAuth, refetch: refetchAuth } = useQuery<{ success: boolean; isAuthenticated: boolean }>({
    queryKey: ["/api/admin/check"],
  });

  const { data: contacts } = useQuery<{ success: boolean; data: Contact[] }>({
    queryKey: ["/api/admin/contacts"],
    enabled: authCheck?.isAuthenticated || false,
  });

  const { data: payments } = useQuery<{ success: boolean; data: Payment[] }>({
    queryKey: ["/api/admin/payments"],
    enabled: authCheck?.isAuthenticated || false,
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => {
      queryClient.clear();
      refetchAuth();
      toast({ title: "Logged out successfully" });
    },
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const totalBookings = payments?.data?.length || 0;
  const pendingPayments = payments?.data?.filter(p => p.status === "pending").length || 0;
  const contactedCount = contacts?.data?.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length || 0;
  const completedPayments = payments?.data?.filter(p => 
    p.status === "success" && new Date(p.createdAt) >= thirtyDaysAgo
  ).length || 0;
  const contactForms = contacts?.data?.length || 0;
  const leadDownloads = (contacts?.data?.length || 0) + (payments?.data?.length || 0);
  const totalPaymentsCount = payments?.data?.filter(p => p.status === "success").length || 0;
  const totalRevenue = payments?.data?.filter(p => p.status === "success").reduce((sum, p) => sum + p.amount, 0) || 0;
  const investments = 0;
  
  const recentPayments = [...(payments?.data || [])].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  const recentContacts = [...(contacts?.data || [])].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const allLeads = [
    ...(contacts?.data || []).map(c => ({ ...c, type: 'contact' as const })),
    ...(payments?.data || []).map(p => ({ ...p, type: 'payment' as const }))
  ].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      toast({ title: "No data to export", variant: "destructive" });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Export successful", description: `${filename} downloaded` });
  };

  const exportAllData = () => {
    const allData = {
      contacts: contacts?.data || [],
      payments: payments?.data || [],
    };
    
    const jsonContent = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `all_data_${new Date().toISOString().split("T")[0]}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Export successful", description: "All data downloaded" });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authCheck?.isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => refetchAuth()} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-title">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage all customer data, bookings, and submissions</p>
            </div>
            <div className="flex gap-3">
              <Button 
                className="bg-vibrant-orange hover:bg-vibrant-orange/90 text-white"
                onClick={exportAllData}
                data-testid="button-export-all"
              >
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs-style navigation (non-functional, just for visual matching) */}
          <div className="flex gap-6 border-b pb-2 overflow-x-auto">
            <button className="flex items-center gap-2 text-vibrant-blue font-medium border-b-2 border-vibrant-blue pb-2 whitespace-nowrap">
              <Eye className="h-4 w-4" />
              Overview
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground pb-2 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              Bookings
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground pb-2 whitespace-nowrap">
              <MessageSquare className="h-4 w-4" />
              Contact Forms
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground pb-2 whitespace-nowrap">
              <CreditCard className="h-4 w-4" />
              Payments
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground pb-2 whitespace-nowrap">
              <FileDown className="h-4 w-4" />
              Lead Downloads
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" data-testid="text-total-bookings">{totalBookings}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600" data-testid="text-pending">{pendingPayments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contacted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600" data-testid="text-contacted">{contactedCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600" data-testid="text-completed">{completedPayments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contact Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600" data-testid="text-contact-forms">{contactForms}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Lead Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600" data-testid="text-lead-downloads">{leadDownloads}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600" data-testid="text-total-payments">{totalPaymentsCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600" data-testid="text-revenue">₹{totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600" data-testid="text-investments">{investments}</div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportToCSV(payments?.data || [], "bookings")}
                    data-testid="button-export-bookings"
                    className="text-vibrant-blue hover:text-vibrant-blue/80"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-xs" data-testid={`text-booking-id-${payment.id}`}>
                          {payment.razorpayOrderId?.slice(0, 12)}...
                        </TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === "success" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {recentPayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No bookings yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Contact Forms */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Contact Forms</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportToCSV(contacts?.data || [], "contact_forms")}
                    data-testid="button-export-contacts"
                    className="text-vibrant-blue hover:text-vibrant-blue/80"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell data-testid={`text-contact-name-${contact.id}`}>{contact.name}</TableCell>
                        <TableCell className="text-sm">{contact.email}</TableCell>
                        <TableCell className="text-sm">{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {recentContacts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No contact forms yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Payments</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportToCSV(payments?.data || [], "payments")}
                    data-testid="button-export-payments"
                    className="text-vibrant-blue hover:text-vibrant-blue/80"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-xs" data-testid={`text-payment-id-${payment.id}`}>
                          {payment.razorpayPaymentId?.slice(0, 12)}...
                        </TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === "success" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {recentPayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No payments yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Lead Downloads */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Leads</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => exportToCSV(allLeads, "all_leads")}
                    className="text-vibrant-blue hover:text-vibrant-blue/80"
                    data-testid="button-export-leads"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name/Package</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allLeads.map((lead) => (
                      <TableRow key={`${lead.type}-${lead.id}`}>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lead.type === "contact" 
                              ? "bg-purple-100 text-purple-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {lead.type === "contact" ? "Contact" : "Payment"}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium" data-testid={`text-lead-name-${lead.id}`}>
                          {'packageName' in lead ? lead.packageName : lead.name}
                        </TableCell>
                        <TableCell className="text-sm">{lead.email}</TableCell>
                        <TableCell className="text-sm">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {allLeads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No leads yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
