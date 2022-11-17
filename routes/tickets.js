import { Router } from "express";
import * as ticketsController from "../controllers/tickets.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();
/*---------- Public Routes ----------*/
router.get("/", ticketsController.index);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

router.post("/", checkAuth, ticketsController.create);
router.post("/updateTicketStatus", checkAuth, ticketsController.updateStatus);
router.delete("/deleteTicket/:id", checkAuth, ticketsController.deleteTicket);

export { router };
