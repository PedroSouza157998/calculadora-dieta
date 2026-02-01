import express from "express";
import { getPortionRoute } from "./routes/getPortion.route";

const router = express.Router();

router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
router.get("/get-portion", getPortionRoute);

export default router;
