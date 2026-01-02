import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided.',
                success: false
            });
        };
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token.',
                success: false
            });
        };
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }

}

export default isAuthenticated;