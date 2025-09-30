import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  LayoutDashboard, MessageSquare, Briefcase, Star, FileText, CreditCard, 
  Download, LogOut, MoreVertical, Pencil, Trash2, Plus
} from "lucide-react";
import type { Contact, Payment, Service, Testimonial, BlogPost } from "@shared/schema";
import AdminLogin from "@/components/AdminLogin";

const serviceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
});

const testimonialFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  testimonialText: z.string().min(1, "Testimonial is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1-5"),
});

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  status: z.enum(["Draft", "Published"]),
});

export default function AdminDashboard() {
  const { toast } = useToast();
  const [serviceDialog, setServiceDialog] = useState<{ open: boolean; service?: Service }>({ open: false });
  const [testimonialDialog, setTestimonialDialog] = useState<{ open: boolean; testimonial?: Testimonial }>({ open: false });
  const [blogDialog, setBlogDialog] = useState<{ open: boolean; blog?: BlogPost }>({ open: false });

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

  const { data: services } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ["/api/admin/services"],
    enabled: authCheck?.isAuthenticated || false,
  });

  const { data: testimonials } = useQuery<{ success: boolean; data: Testimonial[] }>({
    queryKey: ["/api/admin/testimonials"],
    enabled: authCheck?.isAuthenticated || false,
  });

  const { data: blogPosts } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/admin/blog"],
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

  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({ title: "Contact deleted successfully" });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Service deleted successfully" });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/testimonials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Testimonial deleted successfully" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "Blog post deleted successfully" });
    },
  });

  const totalRevenue = payments?.data?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const completedPayments = payments?.data?.filter(p => p.status === "success").length || 0;

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
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vibrant-orange text-white font-bold">
              AP
            </div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, admin</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage all aspects of your DreamBridge platform</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">
              <Briefcase className="mr-2 h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">
              <Star className="mr-2 h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              <FileText className="mr-2 h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="payments" data-testid="tab-payments">
              <CreditCard className="mr-2 h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-services">{services?.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-blog-posts">{blogPosts?.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-testimonials">{testimonials?.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-revenue">₹{totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Contact Submissions</h3>
              <Button 
                variant="outline" 
                onClick={() => exportToCSV(contacts?.data || [], "contacts")}
                data-testid="button-export-contacts"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts?.data?.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell data-testid={`text-contact-name-${contact.id}`}>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                        <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" data-testid={`button-contact-actions-${contact.id}`}>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => deleteContactMutation.mutate(contact.id)}
                                data-testid={`button-delete-contact-${contact.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Manage Services</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => exportToCSV(services?.data || [], "services")}
                  data-testid="button-export-services"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={() => setServiceDialog({ open: true })} data-testid="button-add-service">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services?.data?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell data-testid={`text-service-name-${service.id}`}>{service.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                        <TableCell>₹{service.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" data-testid={`button-service-actions-${service.id}`}>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => setServiceDialog({ open: true, service })}
                                data-testid={`button-edit-service-${service.id}`}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteServiceMutation.mutate(service.id)}
                                data-testid={`button-delete-service-${service.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Manage Testimonials</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => exportToCSV(testimonials?.data || [], "testimonials")}
                  data-testid="button-export-testimonials"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={() => setTestimonialDialog({ open: true })} data-testid="button-add-testimonial">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Testimonial
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Testimonial</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials?.data?.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell data-testid={`text-testimonial-client-${testimonial.id}`}>{testimonial.clientName}</TableCell>
                        <TableCell className="max-w-xs truncate">{testimonial.testimonialText}</TableCell>
                        <TableCell>{testimonial.rating}/5</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" data-testid={`button-testimonial-actions-${testimonial.id}`}>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => setTestimonialDialog({ open: true, testimonial })}
                                data-testid={`button-edit-testimonial-${testimonial.id}`}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                                data-testid={`button-delete-testimonial-${testimonial.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Manage Blog Posts</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => exportToCSV(blogPosts?.data || [], "blog_posts")}
                  data-testid="button-export-blog"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={() => setBlogDialog({ open: true })} data-testid="button-add-blog">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts?.data?.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell data-testid={`text-blog-title-${blog.id}`}>{blog.title}</TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{blog.status}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" data-testid={`button-blog-actions-${blog.id}`}>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => setBlogDialog({ open: true, blog })}
                                data-testid={`button-edit-blog-${blog.id}`}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteBlogMutation.mutate(blog.id)}
                                data-testid={`button-delete-blog-${blog.id}`}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-payment-revenue">₹{totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-payment-count">{payments?.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-payment-completed">{completedPayments}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Recent Payments</h3>
              <Button 
                variant="outline" 
                onClick={() => exportToCSV(payments?.data || [], "payments")}
                data-testid="button-export-payments"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments?.data?.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-xs" data-testid={`text-payment-id-${payment.id}`}>
                          {payment.razorpayPaymentId.slice(0, 20)}...
                        </TableCell>
                        <TableCell>{payment.packageName}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <ServiceDialog
        open={serviceDialog.open}
        service={serviceDialog.service}
        onClose={() => setServiceDialog({ open: false })}
      />

      <TestimonialDialog
        open={testimonialDialog.open}
        testimonial={testimonialDialog.testimonial}
        onClose={() => setTestimonialDialog({ open: false })}
      />

      <BlogDialog
        open={blogDialog.open}
        blog={blogDialog.blog}
        onClose={() => setBlogDialog({ open: false })}
      />
    </div>
  );
}

function ServiceDialog({ open, service, onClose }: { open: boolean; service?: Service; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof serviceFormSchema>) => {
      if (service) {
        return apiRequest("PUT", `/api/admin/services/${service.id}`, data);
      }
      return apiRequest("POST", "/api/admin/services", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: service ? "Service updated" : "Service created" });
      onClose();
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-service-form">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add New Service"}</DialogTitle>
          <DialogDescription>Fill in the service details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-service-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="input-service-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} data-testid="input-service-price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-service">
                {mutation.isPending ? "Saving..." : service ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function TestimonialDialog({ open, testimonial, onClose }: { open: boolean; testimonial?: Testimonial; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      clientName: testimonial?.clientName || "",
      testimonialText: testimonial?.testimonialText || "",
      rating: testimonial?.rating || 5,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof testimonialFormSchema>) => {
      if (testimonial) {
        return apiRequest("PUT", `/api/admin/testimonials/${testimonial.id}`, data);
      }
      return apiRequest("POST", "/api/admin/testimonials", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: testimonial ? "Testimonial updated" : "Testimonial created" });
      onClose();
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-testimonial-form">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          <DialogDescription>Fill in the testimonial details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-testimonial-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonialText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea {...field} data-testid="input-testimonial-text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="5" {...field} data-testid="input-testimonial-rating" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-testimonial">
                {mutation.isPending ? "Saving..." : testimonial ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function BlogDialog({ open, blog, onClose }: { open: boolean; blog?: BlogPost; onClose: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      author: blog?.author || "",
      status: (blog?.status as "Draft" | "Published") || "Draft",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof blogFormSchema>) => {
      if (blog) {
        return apiRequest("PUT", `/api/admin/blog/${blog.id}`, data);
      }
      return apiRequest("POST", "/api/admin/blog", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: blog ? "Blog post updated" : "Blog post created" });
      onClose();
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-blog-form">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>Fill in the blog post details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-blog-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} data-testid="input-blog-content" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-blog-author" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-blog-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-blog">
                {mutation.isPending ? "Saving..." : blog ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
