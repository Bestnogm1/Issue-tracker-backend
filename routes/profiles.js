import { Router } from "express";
import * as profilesCtrl from "../controllers/profiles.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.get("/", checkAuth, profilesCtrl.getAllProfile);
router.post("/findOneProfile", checkAuth, profilesCtrl.findOneProfile);

export { router };
