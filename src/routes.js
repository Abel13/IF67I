import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import PostController from "./app/controllers/PostController";
import FileController from "./app/controllers/FileController";

import authMiddleware from "./app/middlewares/auth";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.post("/posts", PostController.store);
routes.get("/posts", PostController.index);
routes.post("/files", upload.single("file"), FileController.store);

export default routes;
