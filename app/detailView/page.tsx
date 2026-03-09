import MainPost from "./mainPost";
import CommentsDisplay from "./commentsDisplay"

/* 
	Display post body and responses.

	postDetails returns a json with two elements. First, the post itself. Second, the commments.
*/

async function getPostDetails(params) {
	const postLink = (await params).post;
	const postDetailStream = await fetch(`http://www.reddit.com/${postLink}.json`);
	const postDetailsObject = await postDetailStream.json();
	const postDetails = { mainPost: postDetailsObject[0].data.children[0].data, comments: postDetailsObject[1].data.children };
	return postDetails;
}

export default async function Page({ searchParams }: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
	const postDetails = await getPostDetails(searchParams);
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