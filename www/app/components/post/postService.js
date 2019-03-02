//imports
import Post from '../../models/post.js'

//private
let _apiPosts = axios.create({
  baseURL: '/api/posts'
})

let _apiComments = axios.create({
  baseURL: '/api/comments'
})

let _state = {
  posts: [],
  post: {}
}

let _subcribers = {
  posts: [],
  post: []
}

function setState(prop, val) {
  _state[prop] = val
  _subcribers.forEach(fn => fn())
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

  getApiPosts() {
    _apiPosts.get().then(res => {
      let data = res.data.map(p => new Post(p))
      setState('posts', data)
    })
  }

  getOneApiPost(id) {
    _apiPosts.get('/' + id).then(res => {
      let data = new Post(res.data)
      setState('post', data)
    })
  }
  addComment(data) {
    _apiComments.post(data).then(res => {
      this.getOneApiPost(res.data._id)
    })
  }
}