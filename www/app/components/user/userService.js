//IMPORTS
import User from '../../models/user.js'

//PRIVATE
// @ts-ignore
let _apiUsers = axios.create({
  baseURL: '/api/users'
})

//utilize localStorage to access the userId across multiple files
//userId: window.localStorage.setItem('userId', user)
let _state = {

}

let _subcribers = {

}

function setState(prop, val) {
  _state[prop] = val
  _subcribers.forEach(fn => fn())
}



//PUBLIC
export default class UserService {
  constructor() {
    console.log('userSevice Built')
  }

  addSubscriber(prop, fn) {
    _subcribers[prop].push(fn)
  }
}