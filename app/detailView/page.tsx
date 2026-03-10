"use client"

import MainPost from "./mainPost";
import CommentsDisplay from "./commentsDisplay";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

/* 
	Display post body and responses.

	postDetails returns a json with two elements. First, the post itself. Second, the commments.
*/

async function getPostDetails(params) {
	console.log(params);
	const postDetailStream = await fetch(`https://api.reddit.com/${params}.json`);
	const postDetailsObject = await postDetailStream.json();
	const postDetails = { mainPost: postDetailsObject[0].data.children[0].data, comments: postDetailsObject[1].data.children };
	console.log(postDetails);
	return postDetails;
}

//export default function Page({ searchParams }: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
export default function Page() {
	const searchParams = useSearchParams();
	const link = searchParams.get("post");
	const postDetails = useSWR(link, getPostDetails)
	return(
		<div className="justify-items-center">
			<main className="w-1/2">
				<MainPost post={postDetails.mainPost}/>
				<span className="flex font-bold border-b-1">Comments</span>
				<CommentsDisplay comments={postDetails.comments} />
			</main>
		</div>
	)
}