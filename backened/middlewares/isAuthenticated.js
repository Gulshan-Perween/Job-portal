import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];  // Use optional chaining
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};

export default isAuthenticated;
