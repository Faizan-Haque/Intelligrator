"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bluetooth } from 'lucide-react';

export default function RssClientFeed({ feedUrl }: { feedUrl: string }) {
  const [feed, setFeed] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch(`/api/rss?url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        setFeed(data);
      } catch (error) {
        console.error("Failed to fetch RSS:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [feedUrl]);

  if (loading) return <p>Loading feed...</p>;
  if (!feed) return <p>No feed found.</p>;

  return (
    <div className='container mx-auto grid grid-cols- p-10 px-5'>
        {feed.items.map((item: any, index: number) => (
            <Card size='sm' className="m-4 mx-4" key={index}>
                <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{feed.title}</CardDescription>
                    <CardAction>
                        <button>
                            <a href={item.link}>Read Full</a>
                        </button>
                    </CardAction>
                </CardHeader>
                <CardContent className='line-clamp-3'>
                    <p>{item.contentSnippet}</p>
                </CardContent>
                <CardFooter>{item.pubDate}</CardFooter>
            </Card>
        ))};
    </div>
    
    // <div>
    //   
    //   {feed.items.map((item: any, index: number) => (
    //     <article key={index}>
    //       <h3>{item.title}</h3>
    //       <div/>
    //       <a href={item.link}>
    //         Read original →
    //       </a>
    //     </article>
    //   ))}
    // </div>
  );
}