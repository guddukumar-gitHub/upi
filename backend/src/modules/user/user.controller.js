import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./user.model.js";
import catchAsync from "../../utils/catchAsync.js";

export const signupUser = catchAsync(
    async (req, res) => {
        const payload = req.body;

        // check existing user
        const isUserExists = await User.findOne({
            email: payload.email,
        });

        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        // create user
        const user = await User.create({
            ...payload,
            password: hashedPassword,
        });

        // generate token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET
        );

        // remove password
        user.password = undefined;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            data: user,
        });
    }
);


export const loginUser = catchAsync(
    async (req, res) => {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // compare password
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // generate token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
        );

        // remove password
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: user,
        })
    }
);


export const getUserProfile = catchAsync(
    async (req, res) => {
        const user = await User.findById(req.user.userId);

        res.status(200).json({
            success: true,
            data: user,
        });
    }
);
