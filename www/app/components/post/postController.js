import PostService from "./postService.js";

//imports


//private
let _ps = new PostService()

function drawComments(post) {
  let template = ''
  let postorder = []
  for (let comment in post) {
    postorder.push(post[comment])
  }
  postorder.sort((a, b) => a.date - b.date)
  postorder.forEach(c => {
    template += `
    <li>
    <div class="d-flex justify-content-between">
      <span>${c.user.username}</span>
      <span>${c.createdAt}</span>
    </div>
    <div>
      <p>${c.content}</p>
      <div class="d-flex justify-content-betwween">
        <div>
          <span>${c.upvotes}</span> <span><i onclick="app.controllers.postController.upVote('${c._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
        </div>
        <div>
          <span>${c.downvotes}</span> <span><i onclick="app.controllers.postController.downVote('${c._id}')" class="fas fa-arrow-alt-circle-down"></i></span>
        </div>
      </div>
      <ul>
        <li>`
    c.subcomments.forEach(sc => {
      template +=
        ` <p>${sc.content}</p>
              <div class="d-flex justify-content-betwween">
                <div>
                  <span>${sc.upvotes}</span> <span><i onclick="app.controllers.postController.upVote('${sc._id}')" class="fas fa-arrow-alt-circle-up"></i></span>
                </div>
                <div>
                  <span>${sc.downvotes}</span> <span><i onclick="app.controllers.postController.downVote('${sc._id}')" class="fas fa-arrow-alt-circle-down"></i></span>
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
}

function drawMainPost(id) {
  let post = _ps.Posts.filter(p => {
    return p._id == id
  })
  let template = '<div class="col col-sm-6 offset-sm-3">'
  template += post[0].PostMainTemplate
  template += '</div>'
  document.querySelector('body').innerHTML = template
  drawComments(post)
}

function drawPosts() {
  let template = '<div class="col col-sm-4">'
  _ps.Posts.forEach(p => {
    template += p.PostMiniTemplate
  })
  template += '</div>'
  document.querySelector('#posts').innerHTML = template
}


//public
export default class PostController {
  constructor() {
    console.log('postController Built')
    _ps.addSubscriber('posts', drawPosts)
    _ps.addSubscriber('post', drawMainPost)
    _ps.getApiPosts()
  }

  showMainPost(id) {
    _ps.getOneApiPost(id)
  }

  postUnFocus() {
    _ps.getApiPosts()
  }

  addComment(e) {
    let form = e.target
    let data = {
      comment: form.comment
    }
    _ps.addComment(data)

  }
}