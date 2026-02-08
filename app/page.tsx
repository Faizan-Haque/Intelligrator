import RssClientFeed from '@/components/RssClientFeed';

export const metadata = {
  title: 'RSS Feed Reader',
};

export default function Page() {
  return (
    <html className='dark'>
      <main>
        <header>
          <h1>Intelligrator</h1>
        </header>
        <RssClientFeed feedUrl="https://techcrunch.com/feed/" />
      </main>
    </html>
  );
}