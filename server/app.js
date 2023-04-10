import express from "express";
import fileUpload from "express-fileupload";
import postsRoutes from "./routes/posts.routes.js";

const app = express();

// middlewares
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
    })
);

// routes
app.use(postsRoutes);

export default app;
