import { Router } from "express";
import * as ticketsController from "../controllers/tickets.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";
import multer from "multer";
import { addImagesToTicket } from "../middleware/AddingImage.js";
const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage });
const router = Router();
/*---------- Public Routes ----------*/
router.get("/", ticketsController.index);

router.post(
  "/addImagesToTicket",
  uploadImage.single("image"),
  addImagesToTicket
);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post("/", checkAuth, ticketsController.create);
router.post("/updateTicketStatus", checkAuth, ticketsController.updateStatus);
router.delete("/deleteTicket/:id", checkAuth, ticketsController.deleteTicket);

export { router };
