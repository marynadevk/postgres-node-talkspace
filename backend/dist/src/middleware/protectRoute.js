import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.js";
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized - No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, fullName: true, profilePic: true },
        });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
};
