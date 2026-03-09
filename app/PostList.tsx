import Post from "./post"

/*
	Makes a list of Post elements with all the necessary data.
*/

export default function PostList(props) {
	const posts = props.posts.data.children;
	return(
		<div>
			{
				posts.map((post, index) => (<Post key={index} data={post.data}/>))
			}
		</div>
	);
}