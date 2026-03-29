import express from "express";
import { login, register, updateProfile, logout } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload as upload} from "../middlewares/multer.js";


const router = express.Router();

router.post("/register", upload,register);
router.post("/login", login);    
router.get("/logout", logout);
router.put("/profile/update", isAuthenticated,upload, updateProfile);

export default router;