import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { TripService } from './trip.service';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private tripService: TripService) { }

  generatePDF(tripId: number) {
    const doc = new jsPDF();

    // Get the trip with a specific id
    this.tripService.getTripById(tripId).subscribe(
      (trip) => {
        // Standard style for each p tag
        const paragraphStyle = "style='margin: 0; padding: 0;'";

        // To format departure and return date
        // formatting the date: it has always 2 numbers -> put zero before the date if necessary, put '-' charachter between values, .slice(-2) gets two characters of the string
        const departureDate = new Date(trip.departDate);
        const formattedDepartureDate = `${('0' + departureDate.getDate()).slice(-2)}-${('0' + (departureDate.getMonth() + 1)).slice(-2)}-${departureDate.getFullYear()}`;
        const returnDate = new Date(trip.returnDate);
        const formattedReturnDate = `${('0' + returnDate.getDate()).slice(-2)}-${('0' + (returnDate.getMonth() + 1)).slice(-2)}-${returnDate.getFullYear()}`;

        // Get all tripcountries
        let locationsHtml = '<ul style="padding-left: 7px; margin: 0;">';
        trip.tripCountries.forEach((location) => {
          locationsHtml += `<li style="margin: 3px 0; padding-left: 5px;">${location.cityName} (${location.name})</li>`;
        });
        locationsHtml += '</ul>';

        // Get all activities
        let activitiesHTML = '';
        if (trip.activities && trip.activities.length > 0) {
          activitiesHTML = '<ul style="padding-left: 7px; margin: 0; ">';
          trip.activities.forEach((activity) => {
            activitiesHTML += `<li style="margin: 3px 0; padding-left: 5px;">`;
            activitiesHTML += `<p style="font-weight: bold; margin: 0; padding: 0; ">${activity.name}</p>`;
            activitiesHTML += `<p ${paragraphStyle}>Type: ${activity.activityType}</p>`;

            if (activity.startTime) {
              const startTime = new Date(activity.startTime);
              const formattedStartTime = `${('0' + startTime.getDate()).slice(-2)}-${('0' + (startTime.getMonth() + 1)).slice(-2)}-${startTime.getFullYear()} ${('0' + startTime.getHours()).slice(-2)}:${('0' + startTime.getMinutes()).slice(-2)}`;
              activitiesHTML += `<p ${paragraphStyle}>Begintijd: ${formattedStartTime}</p>`;
            }
            if (activity.endTime) {
              const endTime = new Date(activity.endTime);
              const formattedEndTime = `${('0' + endTime.getDate()).slice(-2)}-${('0' + (endTime.getMonth() + 1)).slice(-2)}-${endTime.getFullYear()} ${('0' + endTime.getHours()).slice(-2)}:${('0' + endTime.getMinutes()).slice(-2)}`;
              activitiesHTML += `<p ${paragraphStyle}>Eindtijd: ${formattedEndTime}</p>`;
            }
            if (activity.city) {
              activitiesHTML += `<p ${paragraphStyle}>Stad: ${activity.city}</p>`;
            }  
            if (activity.postalCode) {
              activitiesHTML += `<p ${paragraphStyle}>Postcode: ${activity.postalCode}</p>`;
            }
            if (activity.streetName) {
              activitiesHTML += `<p ${paragraphStyle}>Straatnaam: ${activity.streetName}</p>`;
            }
            if (activity.streetNr) {
              activitiesHTML += `<p ${paragraphStyle}>Huisnummer: ${activity.streetNr}</p>`;
            }
            if (activity.price) {
              activitiesHTML += `<p ${paragraphStyle}>Prijs: €${activity.price}</p>`;
            }
            if (activity.distance) {
              activitiesHTML += `<p ${paragraphStyle}>Afstand: ${activity.distance} km</p>`;
            }
            if (activity.transportType) {
              activitiesHTML += `<p ${paragraphStyle}>Vervoersmiddel: ${activity.transportType} km</p>`;
            }
            if (activity.comment) {
              activitiesHTML += `<p ${paragraphStyle}>Opmerkingen: ${activity.comment}</p>`;
            }
            activitiesHTML += `</li>`;

          });
          activitiesHTML += '</ul>';
        }
                  
        // Path to the trip type image
        let path = `../assets/${trip.tripType.id}.jpg`;

        // Content PDF file
        const tripDetails = `
        <div style="font-size: 4px; margin: 0; padding: 0; white-space: nowrap; display: flex;">
        <img src="${path}" alt="Trip Image" style="max-width: 100px; max-height: 100px;"/>
        <div style="margin-left: 10px;">
          <p style="font-weight:bold; margin:0; padding:0; margin-bottom:4px; ">Informatie over deze trip</p> 
          <p ${paragraphStyle}>Vertrekdatum: ${formattedDepartureDate}</p> 
          <p ${paragraphStyle}>Terugkomstdatum: ${formattedReturnDate}</p>
          <p ${paragraphStyle}>Trip type: ${trip.tripType.name}</p>
          <p ${paragraphStyle}>Locaties: ${locationsHtml}</p>
        </div>
        </div>
        <div style="font-size: 4px; margin: 0; padding: 0; white-space: nowrap; margin-top:5px; ">
        ${activitiesHTML ? `<p ${paragraphStyle}>Activiteiten:</p> ${activitiesHTML}` : ''}
        </div>
        `;

        // Making the document
        doc.html(tripDetails, {
          callback: function (doc) {
            // Regex: All spaces are removed -> so the name is put together (replace(/\s+/g, '') \s-> stands for whitespaces, tabs /g->global:apply to entire string 
            // Regex: ^: not this characters, \w-> all letters and numbers
            // Conclusion -> All spaces are removed, and the letter ë is not replaced, if it are special characters than thery are replaced with ' '.
            const fileName = `Trip-${trip.name.replace(/[^\w\së]/g, '').replace(/\s+/g, '')}-details.pdf`;

            // Save the pdf file
            doc.save(fileName);
          },
          // 15 stands for X, Y position on the page
          x: 15,
          y: 15
        });
      },
      // In case of errors
      (error) => {
        console.error('Er is een fout opgetreden bij het ophalen van gegevens van de API:', error);
      }
    );

  }

}
