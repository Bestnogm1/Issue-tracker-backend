import { Router } from "express";
import * as messagesCtrl from "../controllers/messages.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();
router.get("/getAllMessage", messagesCtrl.getAllMessage);
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post("/createMessage", checkAuth, messagesCtrl.createMessage);
router.post("/deleteMessage", checkAuth, messagesCtrl.delete);

export { router };
