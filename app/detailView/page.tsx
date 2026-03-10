"use client"

import MainPost from "./mainPost";
import CommentsDisplay from "./commentsDisplay";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import {Suspense} from "react";

/* 
	Display post body and responses.

	postDetails returns a json with two elements. First, the post itself. Second, the commments.
*/

async function getPostDetails(params) {
	const postDetailStream = await fetch(`https://api.reddit.com/${params}.json`);
	const postDetailsObject = await postDetailStream.json();
	const postDetails = { mainPost: postDetailsObject[0].data.children[0].data, comments: postDetailsObject[1].data.children };
	return postDetails;
}

function PageContent() {
	const searchParams = useSearchParams();
	const link = searchParams.get("post");
	const { data, isLoading } = useSWR(link, getPostDetails)
	if (isLoading || !data) return (<div>Loading!</div>);
	return(
		<div className="justify-items-center">
			<main className="w-1/2">
				<MainPost post={data.mainPost}/>
				<span className="flex font-bold border-b-1">Comments</span>
				<CommentsDisplay comments={data.comments} />
			</main>
		</div>
	);
}

//export default function Page({ searchParams }: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
export default function Page() {
	const searchParams = useSearchParams();
	const link = searchParams.get("post");
	const { data, isLoading } = useSWR(link, getPostDetails)
	if (isLoading || !data) return (<div>Loading!</div>);
	return(
		<Suspense fallback={<div>Loading!</div>}>
			<PageContent />
		</Suspense>
	)
}