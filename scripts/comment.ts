import { FormValidation } from "./formvalidation";

export class Comment {
  private commentContainer: HTMLElement;
  private nesting: number;

  constructor(commentContainer: HTMLElement, nesting: number) {
    this.commentContainer = commentContainer;
    this.nesting = nesting;
  }

  createReply(commentWrapDiv:HTMLElement) {                                                           //create comment reply
    const reply = new Comment(commentWrapDiv, this.nesting + 1);
    reply.createComment();
   
  }

  handleFormSubmission(                                                        //submit comment form 
    submitFormButton: HTMLButtonElement,
    commentWrapDiv: HTMLElement,
    commentform: HTMLFormElement,
    formInput: HTMLTextAreaElement
  ) {
    
    submitFormButton.disabled = true;
    const replyContainer = document.createElement("div");
    replyContainer.setAttribute("id", "reply-container");
    replyContainer.classList.add("reply-container");

    const commentPost = document.createElement("p");
    commentPost.setAttribute("id", "comment-post");
    commentPost.classList.add("comment-post");

    const replyButton = document.createElement("button");
    replyButton.setAttribute("id", "reply-button");
    const span = document.createElement("span");
    span.innerHTML = "reply";
    replyButton.appendChild(span);

    replyContainer.appendChild(commentPost);
    replyContainer.appendChild(replyButton);

    replyButton.addEventListener("click", () => {                       
      this.createReply(commentWrapDiv);
    });

    formInput.addEventListener("input", (e) => {
      const commenttext = (e.target as HTMLTextAreaElement).value;
      commentPost.textContent = commenttext;
      FormValidation(commenttext, submitFormButton);
    });
    formInput.addEventListener("blur", () => {
      if (formInput.value == "") {
        commentWrapDiv.removeChild(commentform);
      }
    });

    submitFormButton.addEventListener("click", (e) => {
      e.preventDefault();
      commentWrapDiv.removeChild(commentform);
      commentWrapDiv.appendChild(replyContainer);
    });
  }

  createForm() {                                                             //create comment form
    const commentWrapDiv = document.createElement("div");
    commentWrapDiv.setAttribute("id", "comment-wrap-div");
    commentWrapDiv.classList.add("comment-wrap-div");
    commentWrapDiv.style.setProperty("--indent", `${this.nesting * 1}rem`);

    const commentform = document.createElement("form");
    commentform.setAttribute("id", "commentForm");
    commentform.classList.add("commentform");

    const formInput = document.createElement("textarea");
    formInput.dataset.tag = 'form-input';
    formInput.classList.add("textarea");
    formInput.cols = 68;
    formInput.rows = 5;

    formInput.autofocus = true;

    const submitForm = document.createElement("button");
    submitForm.classList.add("form-submit-button")
    submitForm.setAttribute("id", "form-submit-button");
    submitForm.textContent="comment"
  

    commentform.appendChild(formInput);
    commentform.appendChild(submitForm);
    commentWrapDiv.appendChild(commentform);

    formInput.focus();

    this.handleFormSubmission(                                                       
      submitForm,
      commentWrapDiv,
      commentform,
      formInput
    );
    this.commentContainer.appendChild(commentWrapDiv);
  }

  createComment() {                                                          //create comment
    this.createForm();
  }
}
