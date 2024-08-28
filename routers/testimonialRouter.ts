import express, {Express, Request, Response, Router} from "express";
import { fetchTestimonials } from "../database";
const router : Router = express.Router();


router.route('/').get( async (request: Request, response: Response)=> {
    try
    {   
        const testimonials = await fetchTestimonials(true);
        response.render('testimonial', {testimonials});
    } catch (error)
    {
        console.error('Error fetching testiomoials:', error);
        response.status(500).send('Internal Server Error');
    }

});


export default router;