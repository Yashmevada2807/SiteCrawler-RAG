import { ApiRespose } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { crawlingSite } from "../services/crawlingSite.service.js";



const crawlingSiteHandler = asyncHandler(async (req, res) => {
    const { url } = req.body

    if (!url) throw new ApiError(400, "Please provide a valid website URL.")

    const totalFetchedPages = await crawlingSite(url)

    return res.json(
        new ApiRespose(
            200,
            totalFetchedPages,
            "site crawling succesfully done"
        )
    )

})

export { crawlingSiteHandler }