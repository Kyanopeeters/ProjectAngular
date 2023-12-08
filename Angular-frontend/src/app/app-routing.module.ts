import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CreateTripComponent} from "./create-trip/create-trip.component";
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { DetailsTripComponent } from './details-trip/details-trip.component';
import { PublicTripsComponent } from './public-trips/public-trips.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';

const routes: Routes = [

  {path: "", component:HomepageComponent},
  {path: "publicTrips", component:PublicTripsComponent},
  {path: "myTrips", component:MyTripsComponent, canActivate: [AuthGuard]},
  {path: "activiteittoevoegen/:tripId", component:ActivityModalComponent, canActivate: [AuthGuard]},
  {path: 'trip/:id', component: DetailsTripComponent, canActivate: [AuthGuard]},
  {path: 'profiel', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'tripaanmaken', component:CreateTripComponent, canActivate: [AuthGuard]},
  {path: 'tripbewerken/:id', component:EditTripComponent, canActivate: [AuthGuard]},
  {path: 'unauthorized', component:UnauthorizedComponent},
  {path: 'activiteitbewerken/:id', component:EditActivityComponent, canActivate: [AuthGuard]},

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
