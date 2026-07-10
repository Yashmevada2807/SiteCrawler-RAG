import { Router } from "express";
import { handleChatRequest } from "../controllers/chatController.controller.js";

const router = Router()

router.route("/chat").post(handleChatRequest)

export default router