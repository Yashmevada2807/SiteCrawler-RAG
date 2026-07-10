import { Router } from "express";
import { crawlingSiteHandler } from "../controllers/crawlingSite.controller.js";


const router = Router()

router.route("/crawlingSite").post(crawlingSiteHandler)

export default router