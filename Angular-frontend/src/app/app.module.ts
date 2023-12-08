import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { MenuComponent } from './menu/menu.component';
import { DetailsTripComponent } from './details-trip/details-trip.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { FooterComponent } from './footer/footer.component';
import { PublicTripsComponent } from './public-trips/public-trips.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment'; '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { CustomFilterPipe } from './custom-filter-pipe/custom-filter-pipe.pipe';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsActivityDialogComponent } from './details-activity-dialog/details-activity-dialog.component';
import { DeleteActivityDialogComponent } from './delete-activity-dialog/delete-activity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const domain = environment.AUTH0_DOMAIN;
const clientId = environment.AUTH0_CLIENT_ID;

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MyTripsComponent,
    FooterComponent,
    CustomFilterPipe,
    PublicTripsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    EditTripComponent,
    DetailsTripComponent,
    CreateTripComponent,
    ActivityModalComponent,
    NgxPaginationModule,
    WeatherModalComponent,
    DetailsActivityDialogComponent,
    DeleteActivityDialogComponent,
    MatDialogModule,
    MatButtonModule,
    AuthModule.forRoot({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        audience: environment.AUTH0_AUDIENCE,
        redirect_uri: environment.redirectUri
      },
      // The AuthHttpInterceptor configuration
      httpInterceptor: {
        allowedList: [`${environment.api_url}/Trip/*`, `${environment.api_url}/Activity/create`]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
