import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// copy all and chage variable name 
const userProtect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')
            // copy and change user

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not Authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not Authorized')
	}
})

export {userProtect}