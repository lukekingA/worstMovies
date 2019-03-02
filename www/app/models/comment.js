export default class Comment {
  constructor(data) {
    this.upvote = data.upvote || 0
    this.downvote = data.downvote || 0
    this.content = data.content
    this.postId = data.postId
    this.userId = data.userId
    this.subcomments = data.subcomments
    this.createdAt = data.createdAt
    this._id = data._id
  }

}