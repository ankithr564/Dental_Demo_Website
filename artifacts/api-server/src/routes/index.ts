import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appointmentsRouter from "./appointments";
import contactRouter from "./contact";
import testimonialsRouter from "./testimonials";
import blogRouter from "./blog";
import faqsRouter from "./faqs";
import servicesRouter from "./services";
import doctorsRouter from "./doctors";
import newsletterRouter from "./newsletter";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(contactRouter);
router.use(testimonialsRouter);
router.use(blogRouter);
router.use(faqsRouter);
router.use(servicesRouter);
router.use(doctorsRouter);
router.use(newsletterRouter);
router.use(statsRouter);

export default router;
