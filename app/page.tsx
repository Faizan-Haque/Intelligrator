import RssClientFeed from '@/components/RssClientFeed';

export const metadata = {
  title: 'Intelligrator',
};
// https://techcrunch.com/feed/
// https://www.theverge.com/rss/index.xml
export default function Page() {
  return (
    <html className='dark'> 
      <main>
        <h1 className='text-center pt-10'>Intelligrator</h1>
        <RssClientFeed feedUrl="https://techcrunch.com/feed/" />
      </main>
    </html>
  );
}