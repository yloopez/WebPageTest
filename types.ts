export interface Testimonial {
    TES_CODE: number;
    TES_CLIENT_NAME: string;
    TES_TOUR_NAME: string;
    TES_COMMENT: string;
    TES_RATING: number;
    TES_DATE: Date;
}

export interface Tour {
    TOUR_NAME: string;
    TOUR_DESCRIPTION: string;
    TOUR_COST: number;
    TOUR_DURATION: number;
    TOUR_LOCATIONS: string[];
    TOUR_SERVICES: string[];
}

export interface TourFromDB {
    TOUR_NAME: string;
    TOUR_DESCRIPTION: string;
    TOUR_COST: number;
    TOUR_DURATION: number;
    TOUR_LOCATIONS: string;
    TOUR_SERVICES: string;
};