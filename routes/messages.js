import { Router } from "express";
import * as messagesCtrl from "../controllers/messages.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();
// router.get("/", messagesCtrl.index);
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

router.post("/createMessage", checkAuth, messagesCtrl.createMessage);
router.get("/getAllMessage", checkAuth, messagesCtrl.getAllMessage);
router.delete("/:ticketId/message/:messageId", checkAuth, messagesCtrl.delete);
// router.put("/:id", checkAuth, messagesCtrl.update);

export { router };
