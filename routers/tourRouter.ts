import express, {Express, Request, Response, Router} from "express";
import { findTourByName } from '../cache';
const router : Router = express.Router();


router.get("/:tourName", async (req: Request, res: Response) => {
    const tourName = req.params.tourName;
    const tour = findTourByName(tourName);
    if (tour) {
        res.render("tour", {
            layout : "layout",
            title : tour.TOUR_NAME,
            description: tour.TOUR_DESCRIPTION,
            cost: tour.TOUR_COST,
            duration: tour.TOUR_DURATION,
            locations: tour.TOUR_LOCATIONS,
            services: tour.TOUR_SERVICES
        });
    } else {
        res.status(404).send("Tour not found");
    }
});


export default router;