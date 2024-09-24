import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"
import { getNewsArticles } from "@/lib/news/data"
import Link from "next/link";

export default async function Component() {
  const newsArticles = await getNewsArticles();

  return (
    <>
      <div className="mt-10">
        <h1 className="font-bold text-lg">News and Articles</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        {newsArticles.map((item) => (
          <Card key={item.id} className="flex flex-col h-full">
            <img src={item.image_link} alt={item.headline} className="w-full h-48 object-cover rounded-t-md" />
            <CardHeader className="h-24 overflow-hidden">
              <h3 className="text-lg font-semibold line-clamp-2">{item.headline}</h3>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">{item.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-end">
              <div className="flex flex-col text-xs text-muted-foreground">
                <div className="flex items-center">
                  <UserIcon className="w-3 h-3 mr-1" />
                  <span>{item.author}</span>
                </div>
                <div className="flex items-center mt-1">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <Link href={`/news/${item.id}`}>
                <Button variant="outline" size="sm">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}