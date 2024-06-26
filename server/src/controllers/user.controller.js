import { UserModel } from "../models/user.model.js";
import { validateEmail } from "../utils/validations/email.validation.js";
import { validatePassword } from "../utils/validations/password.validation.js";
import { toUpperCase } from "../utils/helpers/to_upper_case.js";
import {
  generateJwToken,
  generateRefreshToken,
} from "../middlewares/generate_tokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SIGN_UP = async (req, res) => {
  try {
    const dateTime = new Date().toLocaleString();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const emailValidation = validateEmail(req.body.email);
    const passwordValidation = validatePassword(req.body.password);

    if (!emailValidation) {
      return res
        .status(404)
        .json({ message: "Please provide a properly formatted email address" });
    }

    if (passwordValidation !== true) {
      return res.status(400).json({ message: passwordValidation });
    }

    const userExist = await UserModel.findOne({ email: req.body.email });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = new UserModel({
      createdDate: dateTime,
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const changeToUpperCase = toUpperCase(user.name);

    user.name = changeToUpperCase;
    user.user_id = user._id.toString();

    const response = await user.save();

    const jwt_token = generateJwToken(user.user_id, user.email, user.name);

    const jwt_refresh_token = generateRefreshToken(
      user.user_id,
      user.email,
      user.name
    );

    return res.status(201).json({
      response: response,
      message: `User (${req.body.email}) was added successfully`,
      jwt_token: jwt_token,
      jwt_refresh_token: jwt_refresh_token,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Unrecognized username or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ message: "Unrecognized username or password" });
    }

    const jwt_token = generateJwToken(user.user_id, user.email, user.name);

    const jwt_refresh_token = generateRefreshToken(
      user.user_id,
      user.email,
      user.name
    );

    return res.status(200).json({
      status: `User (${user.email}) have been logged in successfully`,
      jwt_token: jwt_token,
      jwt_refresh_token: jwt_refresh_token,
    });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      user_id: req.params.id,
    });

    if (!user) {
      return res.status(400).json({
        message: `The entered ID (${req.params.id}) does not exist. Please try entering a different ID.`,
      });
    }

    return res.json(user);
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.json({ users });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const VERIFY_TOKEN = (req, res) => {
  try {
    return res.status(200).json({
      message: `You already logged in`,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Your token has expired, you must log in again" });
  }
};

// const AUTHENTICATE_TOKEN = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({
//       message:
//         "Unable to find, please provide a token to perform further actions",
//     });
//   }

//   jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
//     if (err)
//       return res.status(403).json({
//         message: "Data not exist",
//       });

//     try {
//       const user = await UserModel.findById(decoded.userId);

//       if (!user)
//         return res.status(404).json({
//           message: "Unable to find user",
//         });

//       req.user = user; // Attach user to request

//       next();
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       return res.status(500).json({ err: "Something went wrong" });
//     }
//   });
// };

const REFRESH_TOKEN = async (req, res) => {
  try {
    const jwtRefreshToken = req.body.jwt_refresh_token;

    if (!jwtRefreshToken) {
      return res.status(400).json({
        message:
          "Unable to find, please provide a refresh token to perform further actions",
      });
    }

    jwt.verify(jwtRefreshToken, process.env.REFRESH_JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Your time has expired, you must log in again" });
      }

      const userId = decoded.userId;
      console.log(userId);
      const email = decoded.email;

      const jwtToken = jwt.sign({ userId, email }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        message: `Welcome back ${email} you have successfully logged in`,
        jwt_token: jwtToken,
        jwt_refresh_token: jwtRefreshToken,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  SIGN_UP,
  LOG_IN,
  GET_USER_BY_ID,
  GET_ALL_USERS,
  VERIFY_TOKEN,
  REFRESH_TOKEN,
};
