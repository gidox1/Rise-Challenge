import { Application } from 'express'

import commentRoute from "../modules/comment/comment.route";
import postRoute from "../modules/post/post.route";
import userRoute from "../modules/user/user.route";

export default (app: Application) => {
  userRoute(app);
  postRoute(app);
  commentRoute(app);
}