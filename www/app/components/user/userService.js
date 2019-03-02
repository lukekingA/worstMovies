//imports
import User from '../../models/user.js'

//private
// @ts-ignore
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
export default class UserService {
  constructor() {
    console.log('userSevice Built')
  }

  addSubscriber(prop, fn) {
    _subcribers[prop].push(fn)
  }
}