const express = require('express');
const app = express();
const router = express.Router();
const userController = require('./../Controllers/UserController');
const authController = require('./../Controllers/AuthController');

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.originalUrl);
    console.log("Hello from the middleware 👋");
    next();
    });

router.route('/').post(userController.createUser).get(userController.getAllUsers);
router.route("/:id").get(userController.getUser)
router.route('/signup').post(authController.singUp);
router.route('/login').post(authController.logIn);
router.route('/forgetPassword').post(authController.forgetPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)
router.route('/updatePassword').patch(authController.protect,authController.updatePassword)

module.exports = router;