const User = require("./../Models/UserModel/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../Email/Email");
const crypto = require("crypto");
const { promisify } = require("util");

exports.singUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    const token = jwt.sign(
      { id: newUser._id },
      "MrQuaggaSuperSecretKeyForToursAndTravells",
      {
        expiresIn: "1d",
      }
    );
    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }
    //2) Check if usr exists && password is Correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "failz",
        message: "Incorrect email or Password",
      });
    }
    //3) If Everything is ok, send token to client
    const token = jwt.sign(
      { id: user._id },
      "MrQuaggaSuperSecretKeyForToursAndTravells",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.forgetPassword = async (req, res, next) => {
  //1)get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "There is no user with this email",
    });
  }

  //2) Genrate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3)send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}api/v1/users/resetpassword/${resetToken}`;
  const message = `Forget your password? Submit a Patch request with your new password and password Confirm to :\n ${resetURL}\n If you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message: message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  //1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2) If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({
      message: "Token is invalid or has expired",
    });
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3) Update changedPasswordAt property for the user
  const token = jwt.sign(
    { id: user._id },
    "MrQuaggaSuperSecretKeyForToursAndTravells",
    { expiresIn: "1d" }
  );
  res.status(200).json({
    status: "success",
    token,
  });
};


exports.protect = async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access",
    });
  }
  //2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    "MrQuaggaSuperSecretKeyForToursAndTravells"
  );
  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exists",
    });
  }
  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: "User recently changed password! Please log in again",
    });
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
};

exports.updatePassword = async (req, res, next) => {
  console.log(req.body);

  //1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
 
  //2) Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return res.status(401).json({
      message: "Your current password is wrong",
    });
  }
  //3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.passwordConfirm;
  await user.save();
  console.log(user);
  //4) Log user in, send JWT
  const token = jwt.sign(
    { id: user._id },
    "MrQuaggaSuperSecretKeyForToursAndTravells",
    { expiresIn: "1d" }
  );
  res.status(200).json({
    status: "success",
    token,
  });
};
