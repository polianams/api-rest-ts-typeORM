import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { RoomController } from "../controllers/RoomController";
import { ApiError } from "../helpers/errosHelpers";

const routes = Router();

routes.get("/", (req, res) => {
  throw new ApiError(500, "Error");
});

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.get("/room", new RoomController().listRoom);
routes.post("/room/:idRoom/create", new RoomController().createVideo);
routes.post("/room/:idRoom/addSubject", new RoomController().addSubject);

export default routes;
