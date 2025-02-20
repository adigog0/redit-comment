import { Comment } from "./comment";

const addComment = document.getElementById(
  "add-comment"
) as HTMLButtonElement | null;

if (addComment !== null) {
  addComment.addEventListener("click", () => {
    const commentContainer = document.getElementById("comment-container");
    commentContainer?.classList.add("commentContainer");
    if (commentContainer) {
      new Comment(commentContainer, 0).createComment();
    }
  });
}
