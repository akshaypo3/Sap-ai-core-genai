import { createClient } from "@/utils/supabase/server";

export async function getNewsArticles(){
    const supabase = await createClient();

    try {
        const { data: newsArticles, error} = await supabase.from('news_articles').select('*');
        
        if(error){
            console.error("Error while fetching news articles:", error)
        }else{
            return newsArticles;
        };
        
    } catch (error) {
        console.error("Error while fetching news articles:", error)
    } finally {

    }
}

export async function getNewsArticlesById(newsArticleId:any){
    const supabase = await createClient();
    const id = newsArticleId;
    try {
        const { data: newsArticle, error} = await supabase.from('news_articles').select('*').eq('id',id);
        
        if(error){
            console.error("Error while fetching news article:", error)
        }else{
            return newsArticle;
        };
        
    } catch (error) {
        console.error("Error while fetching news article:", error)
    } finally {

    }
}