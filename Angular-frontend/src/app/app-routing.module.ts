import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CreateTripComponent} from "./create-trip/create-trip.component";
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { ActivityComponent } from './activity/activity.component';
import { DetailsTripComponent } from './details-trip/details-trip.component';
import { PublicTripsComponent } from './public-trips/public-trips.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [

  {path: "", component:HomepageComponent},
  {path: "publicTrips", component:PublicTripsComponent},
  {path: "myTrips", component:MyTripsComponent, canActivate: [AuthGuard]},

  {path: 'activiteiten', component: ActivityComponent },
  {path: 'trip/:id', component: DetailsTripComponent, canActivate: [AuthGuard]},
  {path: 'profiel', component: ProfileComponent },
  {path: 'tripaanmaken', component:CreateTripComponent},
  {path: 'tripbewerken', component:EditTripComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
