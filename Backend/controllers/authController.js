import userModel from "../models/UserSchema";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { userName, email, password,city,phone,country } = req.body;
        if (!userName || !email || !password || city||phone||country) {
            return res.status(400).json({
                msg: 'All fields are required'
            })
        }
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.json({
                msg: "User already exsts"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                email, userName, password: hashedPassword,city,phone,country
            })
            await newUser.save()
            return res.status(200).send({
                msg: "User saved successfully",
                newUser
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const findUser = userModel.find({ userName })
        if (!findUser) {
            return res.status(400).send({
                msg: 'Not found'
            })
        }
        const pass = await bcrypt.compare(password, findUser.password)
        const token = jwt.sign({id:findUser._id,isAdmin:findUser.isAdmin}, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.cookie('ascess_token', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        if (pass) {
            return res.status(200).send({
                msg: "User loginedIn successfully",
                findUser,
                token
            })
        }
    } catch (error) {
        console.log(error)
    }
}