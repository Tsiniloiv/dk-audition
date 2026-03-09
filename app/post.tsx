import Link from "next/link";

/* 
	Component for displaying posts in PostList. Links to detailView.
*/

export default function Post(props) {
	const postData = props.data;
	return(
		<div className="m-1 border-b-1 border-black dark:border-white">
			<div className="flex font-bold my-1">
				<Link href={{pathname: "/detailView", query: { post: postData.permalink}}}>
					<span>{postData.title}</span>
				</Link>
			</div>
			<div className="flex justify-between">
				<span>{postData.ups} Upvotes, {postData.num_comments} Comments</span>
				<span className="italic">{postData.author}</span>
			</div>
		</div>
	);
}