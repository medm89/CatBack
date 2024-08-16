import { Router } from "express";
import { breeds, breedsId, breedsSearch } from "../controller/cats";


const catRoutes = Router();

catRoutes.get('/breeds',breeds);

catRoutes.get('/breed/:breed_id',breedsId);

catRoutes.get('/breeds/search',breedsSearch);

export default catRoutes;

