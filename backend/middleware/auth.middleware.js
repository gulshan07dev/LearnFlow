import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated, please login again", 400))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;

    next();
}

// authorised roles
const authorisedRoles = (...roles) => async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
        return next(new AppError("You do not have permission to access this routes", 403))
    }
    next();
}

const authorizeSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role; 
    if (currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
        return next(
            new AppError('Please subscribce to access this route!', 403)
        )
    }

    next();
}

export {
    isLoggedIn,
    authorisedRoles,
    authorizeSubscriber
}