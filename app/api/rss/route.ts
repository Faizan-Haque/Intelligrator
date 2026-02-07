import { NextResponse } from 'next/server';
import Parser from 'rss-parser';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

  const parser = new Parser();
  const feed = await parser.parseURL(url);

  return NextResponse.json(feed);
}