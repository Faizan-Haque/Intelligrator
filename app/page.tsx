import RssClientFeed from '@/components/RssClientFeed';

export const metadata = {
  title: 'RSS Feed Reader',
};

export default function Page() {
  return (
    <main className="container mx-auto">
      <header className="py-10">
        <h1 className="text-3xl font-bold">Latest Updates</h1>
      </header>

      {/* This part is interactive and runs on the client */}
      <RssClientFeed feedUrl="https://techcrunch.com/feed/" />
    </main>
  );
}