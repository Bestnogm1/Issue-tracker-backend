import { Router } from "express";
import * as ticketsController from "../controllers/tickets.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();
/*---------- Public Routes ----------*/
router.get('/', ticketsController.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

router.post('/',checkAuth , ticketsController.create)

export { router };