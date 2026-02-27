"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { formatDistanceToNow, isValid } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feed {
  title?: string;
  items?: FeedItem[];
}

interface FeedItem {
  title?: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
  content?: string;
}

function formatItemDate(item: FeedItem): string {
  const dateStr = item.isoDate ?? item.pubDate;
  if (!dateStr) return "Unknown date";
  const date = new Date(dateStr);
  return isValid(date) ? formatDistanceToNow(date, { addSuffix: true }) : "Unknown date";
}

export default function RssClientFeed({ feedUrl }: { feedUrl: string }) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      setError(null);
      try {
        const response = await fetch(
          `/api/rss?url=${encodeURIComponent(feedUrl)}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data?.error ?? "Failed to load feed");
          setFeed(null);
          return;
        }

        if (!data || !Array.isArray(data.items)) {
          setError("Invalid feed format");
          setFeed(null);
          return;
        }

        setFeed({ title: data.title, items: data.items });
      } catch (err) {
        console.error("Failed to fetch RSS:", err);
        setError("Failed to load feed");
        setFeed(null);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [feedUrl]);

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!feed?.items?.length) return <p>No feed found.</p>;

  const feedTitle = feed.title ?? "Feed";

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 px-5">
      {feed.items.map((item: FeedItem) => (
        <Card className="m-4 mx-4" key={item.link}>
          <CardHeader>
            <CardTitle>{item.title ?? "Untitled"}</CardTitle>
            <CardDescription>
              {feedTitle} – {formatItemDate(item)}
            </CardDescription>
          </CardHeader>

          <CardContent className="line-clamp-3">
            <p>{item.contentSnippet ?? ""}</p>
          </CardContent>

          <CardFooter>
            <Button asChild className="w-full">
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