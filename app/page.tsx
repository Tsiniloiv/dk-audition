"use client"

import PostList from "./PostList";
import useSWR from "swr";

const fetcher = (url) => fetch(url, {mode: 'cors'}).then(res => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("https://www.reddit.com/r/pathofexile.json", fetcher);
  if(error) {
    console.log(error);
    return(<div>Failed to fetch post data</div>);
  }
  if(isLoading) return(<div>Loading!</div>);

  return (
    <div className="justify-items-center">
      <main className="w-1/2 my-8">
        <PostList posts={data} />
      </main>
    </div>
  );
}
