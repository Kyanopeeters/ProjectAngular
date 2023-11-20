import { ActivityType } from "./activityType";

export interface Activity {
    id: number,
    name: string, 
    activityType: ActivityType
}