import e from "express"
import { addItem, emailsend, getAllItems, itemDetail } from "../controllers/item.controller.js";
import upload from "../middleware/upload.js";

let itemRouter=e.Router();
itemRouter.route('/additem').post(upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),addItem);
itemRouter.route('/getallitem').get(getAllItems);
itemRouter.route('/getitem').get(itemDetail);
itemRouter.route('/enquire').post(emailsend);

export default itemRouter