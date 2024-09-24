import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash, Calendar, Clock, User } from "lucide-react"
import { getNewsArticlesById } from "@/lib/news/data";
import Image from "next/image";

const estimateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.length / 5;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
};

export default async function NewsArticle({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { id } = params;
  let newsArticle = await getNewsArticlesById(id);
  newsArticle = newsArticle[0];

  const readTime = estimateReadTime(newsArticle.content_html);

  return (
    <ContentLayout title="News Article">
      {/* <div className="mb-8 p-6 bg-white dark:bg-neutral-950 rounded-lg shadow-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/reporting/dashboard/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/news">News</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-muted-foreground">{newsArticle.headline}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}

      <article className="max-w-3xl mx-auto bg-white dark:bg-neutral-950 p-8 rounded-lg shadow-sm">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{newsArticle.headline}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">{newsArticle.author}</span>
            <Calendar className="h-4 w-4 mr-2" />
            <span className="mr-4">{new Date(newsArticle.created_at).toLocaleDateString()}</span>
            <Clock className="h-4 w-4 mr-2" />
            <span>{readTime} min read</span>
          </div>
          <Image 
            src={newsArticle.image_link} 
            alt={newsArticle.headline} 
            width={800} 
            height={400} 
            className="w-full h-[100%] object-cover rounded-lg"
          />
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6 text-muted-foreground">{newsArticle.description}</p>
          <div 
            dangerouslySetInnerHTML={{ __html: newsArticle.content_html }} 
            className="article-content"
          />
        </div>

        <footer className="mt-8 pt-4 border-t">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to News</Link>
          </Button>
        </footer>
      </article>
    </ContentLayout>
  );
}