export default class Post {
  constructor(data) {
    this._id = data._id,
      this.title = data.title,
      this.imgUrl = data.imgUrl,
      this.description = data.description,
      this.upvotes = data.upvotes,
      this.downvotes = data.downvotes,
      this.createdAt = data.createdAt,
      this.comment = data.comment,
      this.userId = data.userId
  }

  get PostMiniTemplate() {
    return `
  <div onclick="app.controllers.postController.showMainPost('${this._id}')" class="card">
    <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title">${this.title}</h4>
    </div>
  </div>
    `
  }


  get PostMainTemplate() {
    return `
    <div onblur="app.controllers.postController.postUnfocus('${this._id}')" class="card">
    <h4 class="card-title">${this.title} title</h4>
    <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h6 class="card-subtitle mb-2 text-muted">${this.description} </h6>
        <div class="d-flex justify-content-between">
          <span><small>posted by</small>${this.userId.username}</span>
          <span>${this.createdAt}</span>>
        </div>
        <div class="d-flex justtify-content-between">
          <button onclick="app.controllers.postController.showCommentForm('${this._id}')"></button>
          <div>
            <span>${this.upvotes}</span> <span><i onclick="app.controllers.postController.upVote('${this._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
            <span>${this.downvotes}</span> <span><i onclick="app.controllers.postController.downVote('${this._id}')"
                class="fas fa-arrow-alt-circle-down"></i></span>
          </div>
        </div>
      </div>
      <form class="form-group" onsubmit="app.controllers.postController.addComment(event)" hidden>
        <input type="text" maxlength="300" name="comment" placeholder="add comment here">
        <div class="d-flex justify-content-end">
          <button class="mr-1 btn btn-sm" onclick="app.controllers.postController.cancelPostEntry()">Cancel</button>
          <button class="btn btn-sm" type="submitt"></button>
        </div>
      </form>
      <div class="" id="comments">
  
      </div>
    </div>
  </div>
    `
  }
}