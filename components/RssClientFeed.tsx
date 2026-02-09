"use client";

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Feed {
  title: string;
  items: FeedItem[];
}

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
}

export default function RssClientFeed({ feedUrl }: { feedUrl: string }) {
  const [feed, setFeed] = useState<Feed>();
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
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 px-5'>
      {feed.items.map((item: FeedItem, index: number) => (
        <Card className="m-4 mx-4" key={index}>

          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>
              {feed.title} - {formatDistanceToNow(item.pubDate, {addSuffix: true})}
            </CardDescription>
          </CardHeader>

          <CardContent className='line-clamp-3'>
            <p>{item.contentSnippet}</p>
          </CardContent>

          <CardFooter>
            <Button asChild className='w-full'>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Read Full
              </a>
            </Button>
          </CardFooter>

        </Card>
      ))}
    </div>
  );
}