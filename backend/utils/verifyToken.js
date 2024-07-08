import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid.",
            });
        }
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
           return res.status(403).json({
                success: false,
                message: "You are not authenticated",
            });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not authorized",
            });
        }
    });
};

export { verifyToken, verifyUser, verifyAdmin };
