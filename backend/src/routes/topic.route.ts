import { Router } from "express";
import { create, list, listTopicTypes } from '../controllers/topic.controller'
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.get('/', list)
router.get('/types', listTopicTypes),
router.post('/', [isAuth, isAdmin], create)

export default router;