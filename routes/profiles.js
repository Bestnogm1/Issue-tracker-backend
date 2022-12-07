import { Router } from "express";
import * as profilesCtrl from "../controllers/profiles.js";
import { decodeUserFromToken } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/

router.get("/", profilesCtrl.getAllProfile);
/*---------- Protected Routes ----------*/
router.post("/findOneProfile", profilesCtrl.findOneProfile);
router.use(decodeUserFromToken);

export { router };
