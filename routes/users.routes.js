const express = require("express");
const { userLogIn, userSignUp,getProfileByEmail } = require("../controllers/users.controller");


const userRouter = express.Router();

userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userLogIn);
userRouter.route("/getProfile").get(getProfileByEmail);
// userRouter.route("/reset-password").post(resetPassword);
// userRouter.route("forget-password").post(forgetPass);

module.exports={
    userRouter
}
