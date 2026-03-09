import Comment from "./comment"

/*
	Display element for the comments on a thread.
*/

export default function CommentsDisplay(props) {
	const comments = props.comments;
	return(
		<div>
			{
				comments.map((comment, index) => {
					return(<Comment key={index} content={comment.data} />);
				})
			}
		</div>
	);
}