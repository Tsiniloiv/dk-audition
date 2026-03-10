import Post from "./post.tsx"

/*
	Makes a list of Post elements with all the necessary data.
*/

export default function PostList(props) {
	const posts = props.posts.data.children;
	return(
		<ul>
			{
				posts.map((post, index) => (<li key={index}><Post data={post.data}/></li>))
			}
		</ul>
	);
}