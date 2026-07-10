import "./config/env.js";
import app from "./app.js";

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})