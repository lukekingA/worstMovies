//imports
import Post from '../../models/post.js'
import Comment from '../../models/comment.js'
import User from '../../models/user.js'

//private
let _apiPosts = axios.create({
  baseURL: '/api/posts'
})

let _apiComments = axios.create({
  baseURL: '/api/comments'
})

let _apiUsers = axios.create({
  baseURL: '/api/users'
})

let _state = {
  posts: [],
  post: {},
  comments: [],
  user: {},
  sort: true
}

let _subcribers = {
  posts: [],
  post: [],
  comments: [],
  user: [],
  sort: []
}

function setState(prop, val) {
  _state[prop] = val
  _subcribers[prop].forEach(fn => fn())
}

//public

export default class PostService {
  constructor() {
    console.log('postSevice Built')
  }
  addSubscriber(prop, fn) {
    _subcribers[prop].push(fn)
  }

  get Posts() {
    return _state.posts.map(p => new Post(p))
  }

  get Post() {
    return new Post(_state.post)
  }

  get Comments() {
    return _state.comments.map(c => new Comment(c))
  }

  get Sort() {
    return _state.sort
  }

  get User() {
    return new User(_state.user)
  }

  getApiPosts() {
    _apiPosts.get().then(res => {
      let data = res.data.map(p => new Post(p))
      setState('posts', data)
    })
  }

  getOneApiPost(id) {
    Promise.all([
        _apiPosts.get('/' + id),
        _apiPosts.get('/' + id + '/comments')
      ])
      .then(res => {
        let post = new Post(res[0].data)
        let comments = res[1].data.map(c => {
          return new Comment(c)
        })
        setState('comments', comments)
        setState('post', post)
      })
  }

  addPost(data) {
    if (!_state.user._id) {
      throw new Error('Please Login')
    }
    data.userId = _state.user._id
    _apiPosts.post('', data).then(res => {
      this.getApiPosts()
    })
  }


  addComment(data) {

    _apiComments.post('', data).then(res => {
      this.getOneApiPost(res.data._id)
    })
  }
  addPostUpVote(postId) {
    _state.post.upvote++
    _apiPosts.put(postId, _state.post)
    setState('post', _state.post)
  }

  addPostDownVote(postId) {
    _state.post.downvote++
    _apiPosts.put(postId, _state.post)
    setState('post', _state.post)
  }
  addCommentUpVote(Id) {
    let comment = _state.comments.filter(comment => comment._id == Id)
    comment[0].upvote++
    _apiComments.put(Id, comment[0])
      .then(res => {
        this.getOneApiPost()
      })
  }
  addCommentDownVote(Id) {
    let comment = _state.comments.filter(comment => comment._id == Id)
    comment[0].downvote++
    _apiComments.put(Id, comment[0])
      .then(res => {
        this.getOneApiPost()
      })
  }

  userLogin(data) {
    _apiUsers.post('/login', data)
      .then(res => {

        setState('user', res.data)
      })
      .catch(e => console.error(e))
  }


  createUser(data) {
    debugger
    _apiUsers.post('', data)
      .then(res => {


        setState('user', res.data)

      })
      .catch(e => console.error(e))





    //ADD TO STATE OR TO DATABASE FIRST?

  }

  sortPost() {
    _state.sort = !_state.sort
  }

  deletePost() {
    if (_state.post.userId._id == _state.user._id) {
      _apiPosts.delete(_state.post._id)
        .then(res => {
          this.getApiPosts()
        })
    }
  }





















}