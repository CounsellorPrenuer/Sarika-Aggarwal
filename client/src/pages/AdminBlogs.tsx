import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { BlogPost, InsertBlogPost } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit, Trash, Star } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function AdminBlogs() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    featured: "false",
    status: "published",
  });

  const { data: authData } = useQuery<{ success: boolean; isAuthenticated: boolean }>({
    queryKey: ["/api/admin/check"],
  });

  const { data: blogsData, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/admin/blog"],
    enabled: authData?.isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest("/api/admin/blog", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs/featured"] });
      toast({ title: "Success", description: "Blog post created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) =>
      apiRequest(`/api/admin/blog/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs/featured"] });
      toast({ title: "Success", description: "Blog post updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/admin/blog/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs/featured"] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      featured: "false",
      status: "published",
    });
    setEditingBlog(null);
  };

  const handleOpenDialog = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        author: blog.author,
        featured: blog.featured,
        status: blog.status,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category || !formData.author) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, data: formData as InsertBlogPost });
    } else {
      createMutation.mutate(formData as InsertBlogPost);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id);
    }
  };

  const toggleFeatured = (blog: BlogPost) => {
    const newFeaturedValue = blog.featured === "true" ? "false" : "true";
    updateMutation.mutate({
      id: blog.id,
      data: { featured: newFeaturedValue },
    });
  };

  if (!authData?.isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const blogs = blogsData?.data || [];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-admin">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage your blog posts</p>
            </div>
            <Button 
              onClick={() => handleOpenDialog()} 
              className="gap-2"
              data-testid="button-create-blog"
            >
              <Plus className="w-4 h-4" />
              Create Blog Post
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No blog posts yet. Create your first one!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium" data-testid={`text-blog-title-${blog.id}`}>
                        {blog.title}
                      </TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(blog)}
                          className={blog.featured === "true" ? "text-vibrant-yellow" : "text-muted-foreground"}
                          data-testid={`button-toggle-featured-${blog.id}`}
                        >
                          <Star className={`w-4 h-4 ${blog.featured === "true" ? "fill-current" : ""}`} />
                        </Button>
                      </TableCell>
                      <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(blog)}
                            data-testid={`button-edit-blog-${blog.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog.id)}
                            className="text-destructive"
                            data-testid={`button-delete-blog-${blog.id}`}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingBlog ? "Update the blog post details" : "Fill in the details for your new blog post"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog title"
                data-testid="input-blog-title"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Career Guidance, Admissions"
                data-testid="input-blog-category"
              />
            </div>

            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
                data-testid="input-blog-author"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the blog post"
                rows={3}
                data-testid="input-blog-excerpt"
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full blog post content"
                rows={10}
                data-testid="input-blog-content"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured === "true"}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked ? "true" : "false" })}
                data-testid="switch-blog-featured"
              />
              <Label htmlFor="featured">Featured on homepage</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-blog"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-blog"
              >
                {editingBlog ? "Update" : "Create"} Blog Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
