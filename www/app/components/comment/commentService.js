//imports
import Comment from '../../models/comment.js'

//private
let _apiComments = axios.create({
  baseURL: ''
})

let _state = {

}

let _subcribers = {

}

function setState(prop, val) {
  _state[prop] = val
  _subcribers.forEach(fn => fn())
}



//public
export default class CommentService {
  constructor() {
    console.log('commentSevice Built')
  }

  addSubscriber(prop, fn) {
    _subcribers[prop].push(fn)
  }
}