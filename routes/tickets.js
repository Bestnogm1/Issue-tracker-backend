import { Router } from "express";
import * as ticketsController from "../controllers/tickets.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();
/*---------- Public Routes ----------*/
router.get('/', ticketsController.index)
router.get('/', ticketsController.show)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

router.post('/',checkAuth , ticketsController.create)
router.delete('/:id',checkAuth , ticketsController.deleteTicket)
// router.put('/:id',checkAuth , ticketsController.update)
router.patch('/:id',checkAuth , ticketsController.completedOrNot)

export { router };