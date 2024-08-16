import { Router } from "express";
import { imagesbybreedid  } from "../controller/images";

const imgRoutes = Router();

imgRoutes.get('/imagesbybreedid',imagesbybreedid);

export default imgRoutes;
