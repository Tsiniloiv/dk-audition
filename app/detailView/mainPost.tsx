import parse from "html-react-parser";

/*
	Display element for the top post of a thread.
*/

function parseHTML(selftext_html: string) {
	return({__html: parse(selftext_html)});
}

function renderBody(post) {
	if(post.post_hint == "image") {
		return(<img alt="" src={post.url} />)
	} else if(post.post_hint == "link") {
		return(<span />);
	} else {
		return(<div dangerouslySetInnerHTML={parseHTML(post.selftext_html)}></div>)
	}
}

export default function MainPost(props) {
	const postData = props.post;
	return(
		<div>
			<div className="justify-between border-b-1 border-black dark:border-white">
				<span className="block font-bold">{postData.title}</span>
				<span className="block italic">by {postData.author}</span>
			</div>
			<span className="flex my-3 justify-center">{renderBody(postData)}</span>
			<div className="my-1">
				<span>{postData.ups} Upvotes, {postData.num_comments} Comments</span>
			</div>
		</div>
	);
}