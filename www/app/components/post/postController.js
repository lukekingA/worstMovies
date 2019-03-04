import PostService from "./postService.js";

//imports


//private
let _ps = new PostService()

function drawComments() {
  let comments = _ps.Comments
  let template = ''
  if (_ps.Sort) {
    comments.sort((a, b) => a.createdAt - b.createdAt)
  } else {
    comments.sort((a, b) => {
      return (a.upvote + a.downvote) - (b.upvote + b.downvote)
    })
  }
  comments.forEach(c => {
    template += `
    <li>
    <div class="d-flex justify-content-between mx-2">
      <span class="ml-3">${c.userId.username}</span>
      <span class="mr-3">${c.createdAt.slice(0,10)}</span>
    </div>
    <div class="ml-4">
      <p>${c.content}</p>
      <div class="d-flex justify-content-betwween">
        <div>
          <span>${c.upvote}</span> <span><i onclick="app.controllers.postController.addCommentUpVote('${c._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
        </div>
        <div>
          <span>${c.downvote}</span> <span><i onclick="app.controllers.postController.addCommentDownVote('${c._id}')" class="fas fa-arrow-alt-circle-down"></i></span>
        </div>
      </div>
      <ul>
        <li>`
    c.subcomments.forEach(sc => {
      template +=
        ` <p>${sc.content}</p>
              <div class="d-flex justify-content-betwween">
                <div>
                  <span>${sc.upvote}</span> <span><i onclick="app.controllers.postController.addSubCommentUpVote('${sc._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
                </div>
                <div>
                  <span>${sc.downvote}</span> <span><i onclick="app.controllers.postController.addSubCommentDownVote('${sc._id}')" class="fas fa-arrow-alt-circle-down"></i></span>
                </div>
              </div>
            </li>`
    })
    template +=
      `</ul>
    </div>
  </li>
    `
  })
  document.querySelector('#comments').innerHTML = template

}

function drawMainPost() {
  let post = _ps.Post
  let template = '<div class="col col-sm-8 offset-sm-2">'
  template += post.PostMainTemplate(_ps.Post._id, _ps.User._id)
  template += '</div>'
  document.querySelector('#posts').innerHTML = template
  drawComments()
}

function drawPosts() {
  let template = ''
  _ps.Posts.forEach(p => {
    template += '<div class="col col-sm-4">'
    template += p.PostMiniTemplate
    template += '</div>'
  })
  document.querySelector('#posts').innerHTML = template
}

function drawUser() {
  document.querySelector('#login').setAttribute("hidden", '')
  document.querySelector('#logout').removeAttribute('hidden')
  document.querySelector('#addPostBtn').removeAttribute('disabled')

}

//public
export default class PostController {
  constructor() {
    console.log('postController Built')
    _ps.addSubscriber('posts', drawPosts)
    _ps.addSubscriber('post', drawMainPost)
    _ps.addSubscriber('sort', drawPosts)
    _ps.addSubscriber('user', drawUser)
    _ps.getApiPosts()
  }

  showMainPost(id) {
    _ps.getOneApiPost(id)
    // _ps.getApiComments(id)
  }

  postUnFocus() {
    _ps.getApiPosts()
  }

  upVote(id) {
    _ps.addPostUpVote(id)
  }
  downVote(id) {
    _ps.addPostDownVote(id)
  }

  addCommentUpVote(id) {
    _ps.addCommentUpVote(id)
  }
  addCommentDownVote(id) {
    _ps.addCommentDownVote(id)
  }

  addPost(e) {
    e.preventDefault()
    let form = e.target
    let data = {
      title: form.title.value,
      description: form.description.value,
      imgUrl: form.url.value
    }

    _ps.addPost(data)
    form.reset()
  }


  addComment(e, postId, userId) {
    e.preventDefault()
    let form = e.target
    let data = {
      content: form.comment.value,
      postId: postId,
      userId: userId
    }
    _ps.addComment(data)
  }

  addPostForm() {
    let element = document.querySelector('#postForm')
    if (element.hasAttribute('hidden')) {
      element.removeAttribute('hidden')
    } else {
      element.setAttribute('hidden', '')
    }
  }

  showCommentForm(id) {
    document.querySelector('#commentForm').removeAttribute('hidden')
    window.scrollTo(0, document.querySelector('body').scrollHeight)
  }

  cancelPostEntry(e) {
    let form = e.target.parentElement.parentElement
    e.preventDefault()
    document.querySelector('#commentForm').setAttribute('hidden', "")
    form.reset()
  }

  dismissPost() {
    _ps.getApiPosts()
  }

  userLogin(e) {
    e.preventDefault()
    let form = e.target
    let data = {
      username: form.username.value,
      password: form.password.value
    }
    _ps.userLogin(data)
  }


  createUser() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    let data = {
      username,
      password
    }
    _ps.createUser(data)
  }

  sortPost() {
    _ps.sortPost()
  }

  deletePost() {
    _ps.deletePost()
  }









}