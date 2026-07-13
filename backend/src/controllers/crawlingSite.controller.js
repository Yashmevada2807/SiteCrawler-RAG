import { ApiRespose } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { crawlingSite } from "../services/crawlingSite.service.js";
import {v4 as uuidv4} from "uuid"



const crawlingSiteHandler = asyncHandler(async (req, res) => {
    const { url, userId } = req.body

    if (!url) throw new ApiError(400, "Please provide a valid website URL.")
    const crawlId = uuidv4() 

    const totalFetchedPages = await crawlingSite(
        url,
        userId,
        crawlId
    )

    return res.json(
        new ApiRespose(
            200,
            totalFetchedPages,
            "site crawling succesfully done"
        )
    )

})

export { crawlingSiteHandler }