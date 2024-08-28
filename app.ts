import express, {Express, Request, Response, Router} from "express";
import aboutRouter from "./routers/aboutRouter";
import contactRouter from "./routers/contactRouter";
import guidesRouter from "./routers/guidesRouter";
import testimonialRouter from "./routers/testimonialRouter";
import tourRouter from "./routers/tourRouter";
import { fetchTestimonials } from "./database";
import { initializeCache, getCachedTours } from "./cache";


const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app : Express = express();
const PORT = process.env.PORT || 3000;



// Initialize cache
initializeCache().then(() => {
    console.log('Cache initialized');
}).catch((error) => {
    console.error('Error initializing cache:', error);
});

// Middleware to make cached tours available to all templates
app.use((req: Request, res: Response, next: Function) => {
    res.locals.tours = getCachedTours(); 
    next();
});

app.use(express.static(path.join(__dirname, '../public')));
//app.use('/css', express.static(__dirname + 'public/css'));
//app.use('/js', express.static(__dirname + 'public/js'));
//app.use('/img', express.static(__dirname + 'public/img'));

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', './views');

//Routers
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/guides', guidesRouter);
app.use('/testimonial', testimonialRouter);
app.use('/tour', tourRouter);


app.get('/', async (request: Request, response: Response)=>{
    try {
        const testimonials = await fetchTestimonials(false);
        response.render('index', { testimonials });
    } catch (error) {
        response.status(500).send('Error fetching testimonials');
    }
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});