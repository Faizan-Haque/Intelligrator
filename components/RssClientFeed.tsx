"use client";

import { useEffect, useState } from 'react';

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
    <div>
      <h2>{feed.title}</h2>
      {feed.items.map((item: any, index: number) => (
        <article key={index}>
          <h3>{item.title}</h3>
          <div/>
          <a href={item.link}>
            Read original →
          </a>
        </article>
      ))}
    </div>
  );
}