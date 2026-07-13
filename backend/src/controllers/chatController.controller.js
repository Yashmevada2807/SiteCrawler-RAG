import { asyncHandler } from "../utils/async-handler.js";
import { ApiRespose } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { processUserQuery } from "../services/chatService.service.js";


const handleChatRequest = asyncHandler(async (req, res) => {
    const { userInput, userId } = req.body

    if (!userInput || userInput.trim() === "") throw new ApiError(400, "Please enter a valid question or message.")
    
    const result = await processUserQuery(userInput, userId)

    return res.json(
        new ApiRespose(
            200,
            result,
            "user query processed succesfully"
        )
    )
    
})


export { handleChatRequest }