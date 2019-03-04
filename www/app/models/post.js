export default class Post {
  constructor(data) {
    this._id = data._id,
      this.title = data.title,
      this.imgUrl = data.imgUrl,
      this.description = data.description,
      this.upvote = data.upvote || 0,
      this.downvote = data.downvote || 0,
      this.createdAt = data.createdAt,
      this.comment = data.comment,
      this.userId = data.userId
  }

  get PostMiniTemplate() {
    return `
  <div onclick="app.controllers.postController.showMainPost('${this._id}')" class="card">
    <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
    <div class="card-body">
      <h6 class="card-title text-center">${this.title}</h6>
    </div>
  </div>
    `
  }


  PostMainTemplate(postId, userId) {
    return `
    <div class="card">
    <div class="d-flex justify-content-between my-2">
    <button class="ml-2 btn btn-sm btn-outline-danger" onclick="app.controllers.postController.dismissPost()">Back</button>
    <h4 class="card-title my-2 text-center">${this.title}</h4>
    <button class="mr-2 btn btn-sm btn-outline-danger" onclick="app.controllers.postController.deletePost()"><i class="fas fa-trash-alt"></i></button>
    </div>
    <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h6 class="card-subtitle mb-2 text-muted">${this.description} </h6>
        <div>
          <span class="mr-2"><small>posted by </small>${this.userId.username}</span>
          <span>${this.createdAt.slice(0,10)}</span>
        </div>
      </div>
        <div class="d-flex justify-content-between">
          <button onclick="app.controllers.postController.showCommentForm()">Add Comment</button>
          <div>
            <span>${this.upvote}</span> <span><i onclick="app.controllers.postController.upVote('${this._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
            <span>${this.downvote}</span> <span><i onclick="app.controllers.postController.downVote('${this._id}')"
                class="fas fa-arrow-alt-circle-down"></i></span>
          </div>
        </div>
      </div>
      <form id="commentForm" class="form-group" onsubmit="app.controllers.postController.addComment(event,'${postId}','${userId}')" hidden>
        <input type="text" maxlength="300" name="comment" placeholder="add comment here">
        <div class="d-flex justify-content-end">
          <button type="button" class="mr-1 btn btn-sm" onclick="app.controllers.postController.cancelPostEntry(event)">Cancel</button>
          <button class="btn btn-sm" type="submit">Submit</button>
        </div>
      </form>
      <div class="" id="comments">
  
      </div>
    </div>
  </div>
    `
  }
}