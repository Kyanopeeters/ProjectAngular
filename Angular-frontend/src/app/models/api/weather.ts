export interface Weather {
    
        weather: [
            {
            main: string,
            description: string,
        }
    ],
        main: {
            temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        }
    
}