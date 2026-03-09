import PostList from "./PostList";

async function getPosts() {
  const data = await fetch("http://www.reddit.com/r/pathofexile.json");
  const posts = await data.json();
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="justify-items-center">
      <main className="w-1/2 my-8">
        <PostList posts={posts} />
      </main>
    </div>
  );
}
