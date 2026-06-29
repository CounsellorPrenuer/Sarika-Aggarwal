import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { imageUrl } from "@/lib/sanity";
import { useCms } from "@/hooks/useCms";

export default function BlogPage() {
  const { data } = useCms();
  const posts = data?.blogPosts ?? [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-center">
              Wisdom & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
              Explore our articles on career guidance, personal growth, and finding your path
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post._id}
                  className="hover:-translate-y-2 transition-all flex flex-col overflow-hidden"
                  data-testid={`card-blog-${post._id}`}
                >
                  {post.image && (
                    <img
                      src={imageUrl(post.image, 700)}
                      alt={post.image.alt || post.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <CardHeader>
                    {post.featured && (
                      <span className="text-xs font-semibold text-primary mb-2">FEATURED</span>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 font-semibold text-primary group"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
