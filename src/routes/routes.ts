import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { RoomController } from "../controllers/RoomController";

const routes = Router();

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.get("/room", new RoomController().listRoom);
routes.post("/room/:idRoom/create", new RoomController().createVideo);
routes.post("/room/:idRoom/addSubject", new RoomController().addSubject);

export default routes;
