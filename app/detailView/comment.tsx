import parse from "html-react-parser";

interface Post {
	readonly body_html: string
}

function parseHTML(html: string) {
	return({__html: parse(html)});
}

function renderBody(post: Post) {
	if(post.body_html) {
		return(<div className="my-1" dangerouslySetInnerHTML={parseHTML(post.body_html)}></div>)
	} else return;
}

export default function Comment(props) {
	const content = props.content;
	if(content.author) {
		return(
			<div>
				<div className="border-b-1 border-black dark:border-white">
					<span className="italic">{content.author} says:</span>
					{renderBody(content)}
					<span className="flex justify-self-end">{content.ups} Upvotes</span>
				</div>
				{(content.replies != "") && 
				<ul className="w-7/8 justify-self-end">
					{content.replies?.data.children.map((reply, index) => {
						return(<li key={index}><Comment content={reply.data} /></li>)
					})}	
				</ul>}
			</div>
		);
	}
}