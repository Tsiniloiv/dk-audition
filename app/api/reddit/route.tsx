import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subreddit = searchParams.get('path') ?? 'popular';

  const res = await fetch(
    `https://www.reddit.com/r/${subreddit}.json`,
    {
      headers: {
        // Reddit requires a User-Agent for API calls
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
      },
      next: { revalidate: false },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch from Reddit' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}