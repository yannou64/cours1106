import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenBlackList } from "../models/TokenBlackList.js"

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
  try {
    // récupère les infos du user
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "All fields are required" });

    // vérifier si le user existe dans la base de donnée
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exist" });

    // hasher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créer le nouvel utilisateur
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    res.status(200).json({ message: "Nouvel utilisateur bien enregistré" });
  } catch (e) {
    res.status(400).json({ error: "Error during registration" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Fields missing" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    const decoded = await bcrypt.compare(password, user.password);
    if (!decoded) return res.status(400).json({ error: "Invalid password" });

    const payload = { id: user.id, username: user.username, isAdmin: user.isAdmin };
    const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      maxAge: 36000000,
    });

    res.status(200).json({ message: "Login succesfull" });
  } catch (e) {
    res.status(400).json({ error: `Login error : ${e}` });
  }
};

// Logout
export const logout = async(req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "there is no token" });

    const decodedToken = jwt.decode(token)
    const expiresAt = new Date(Date.now())

    console.log(decodedToken.exp)
    await TokenBlackList.create({
        token,
        expiresAt
    })

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      samesite: "strict"
    });

    res.status(200).json({message: "Logout successfull"})
  } catch (e) {
    res.status(500).json({error: `Error while logout: ${e}`})
  }
};

// Promote to Admin
