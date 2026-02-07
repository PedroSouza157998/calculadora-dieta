import express from "express";
import { getPortionRoute } from "./routes/getPortion.route";
import { generateDietRoute } from "./routes/generateDiet.route";

const router = express.Router();

router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
    res.json({ status: "OK" });
});
router.get("/get-portion", getPortionRoute);
router.post("/generate-diet", generateDietRoute);

export default router;
