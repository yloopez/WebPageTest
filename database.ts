import {createPool, RowDataPacket } from "mysql2/promise";
import { Testimonial, Tour, TourFromDB } from './types';

const pool = createPool({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


export async function fetchTestimonials(all: boolean): Promise<Testimonial[]> {
    let query = "SELECT * FROM TESTIMONIAL ORDER BY TES_DATE DESC";
    if(!all)
    {
        query += " LIMIT 9";
    }

    try {
        const [rows] = await pool.query<Testimonial[] & RowDataPacket[]>(query);
        return rows;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
}






export async function fetchTours(): Promise<Tour[]> {
    const query = `
        SELECT 
            t.TOUR_NAME,
            t.TOUR_DESCRIPTION,
            t.TOUR_COST,
            t.TOUR_DURATION,
            GROUP_CONCAT(
                DISTINCT l.LOCATION_NAME 
                ORDER BY l.LOCATION_NAME ASC 
                SEPARATOR ', '
            ) AS TOUR_LOCATIONS,
            GROUP_CONCAT(
                DISTINCT ts.SERVICE_NAME 
                ORDER BY ts.SERVICE_NAME ASC 
                SEPARATOR ', '
            ) AS TOUR_SERVICES
        FROM 
            TOUR t
        JOIN 
            TOUR_LOCATIONS l ON t.TOUR_NAME = l.TOUR_NAME
        JOIN 
            TOUR_SERVICES ts ON t.TOUR_NAME = ts.TOUR_NAME
        GROUP BY 
            t.TOUR_NAME, 
            t.TOUR_DESCRIPTION, 
            t.TOUR_COST, 
            t.TOUR_DURATION
    `;
    try {
        const [rows] = await pool.query<TourFromDB[] & RowDataPacket[]>(query);
        const tours :Tour[] = rows.map(row => ({
            TOUR_NAME: row.TOUR_NAME,
            TOUR_DESCRIPTION: row.TOUR_DESCRIPTION,
            TOUR_COST: row.TOUR_COST,
            TOUR_DURATION: row.TOUR_DURATION,
            TOUR_LOCATIONS: row.TOUR_LOCATIONS.split(',').map(location => location.trim()),
            TOUR_SERVICES: row.TOUR_SERVICES.split(',').map(service => service.trim()),
        }));

        return tours;
    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
}

