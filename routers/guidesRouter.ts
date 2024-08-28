import express, {Express, Request, Response, Router} from "express";
const router : Router = express.Router();


router.route('/')
    .get((request, response)=> {
        response.render('guides');
    });


export default router;