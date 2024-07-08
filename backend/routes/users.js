import express from 'express';
const router = express.Router();
import {
    updateUser,
    getSingleUser,
    deleteUser,
    getAllUser,
} from '../controllers/userController.js';
import {verifyToken, verifyUser, verifyAdmin} from '../utils/verifyToken.js';




router.put("/:id",verifyUser, updateUser);
router.delete("/:id",verifyUser, deleteUser);
router.get("/:id",verifyUser, getSingleUser);
router.get("/",verifyAdmin, getAllUser);

export default router;