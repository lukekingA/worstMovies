import UserController from "./components/user/userController.js";
import CommentController from "./components/comment/commentController.js";
import PostController from "./components/post/postController.js";


class App {
  constructor() {
    let controllers = {
      userController: new UserController(),
      commentController: new CommentController(),
      postController: new PostController()
    }
  }
}

window.app = new App()