import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

// copy all and chage variable name 
const adminProtect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.admin = await Admin.findById(decoded.id).select('-password')
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

export {adminProtect}