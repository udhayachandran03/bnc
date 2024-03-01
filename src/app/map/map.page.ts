// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import  MarkerClusterer from '@googlemaps/markerclustererplus'; // Import MarkerClusterer

// declare var google: any; // Declare google variable

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.page.html',
//   styleUrls: ['./map.page.scss'],
// })
// export class MapPage implements OnInit {

//   map: any;
//   maps: any;


//   @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef<HTMLElement> | any;

//   source: any = {lat:10.9379575, lng:76.9676995}
//   dest:any =  {lat: 10.7854396, lng:77.0745005}

//   infoWindows: any = [];
//   markers: any[] = [
//     { title: 'CHENNAI', lat: 13.0474733, lng: 80.0441992 , snippet:'Chennai formerly known as Madras, is the capital city of Tamil Nadu, the southernmost state of India. It is the states primate city '},
//     { title: 'COIMBATORE', lat: 11.00555, lng: 76.96612,snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India' },
//     { title: 'POLLACHI', lat: 10.641871, lng: 77.0145378,snippet:'Pollachi is a town and a taluk headquarters in Tamil Nadu state, India. Located about 40 km (25 mi) to the south of Coimbatore' },
//     { title: 'PALANI', lat: 10.4528409, lng: 77.4959245 ,snippet:'Palani (Tamil: [paɻani], is a town and a taluk headquarters in Dindigul district of the western part of Tamil Nadu state in India.'},
//     { title: 'TIRUPPUR', lat: 11.108571, lng: 77.281411,snippet:'Tiruppur or Tirupur is a city in the Indian state of Tamil Nadu. It is located on the banks of the Noyyal river and is the fourth largest urban ' },
//     { title: 'Source', lat: this.source.lat, lng: this.source.lng, snippet: 'Source location' },
//     { title: 'Destination', lat: this.dest.lat, lng: this.dest.lng, snippet: 'Destination location' },
// ];
 

//   constructor() { }


//   addMarkersToMap(markers: any[]) {
//     for (let marker of markers) {
//       let position = new google.maps.LatLng(marker.lat, marker.lng);
//       let mapMarker = new google.maps.Marker({
//         position: position,
//         title: marker.title,
//         map: this.map
//       });
//       this.addinfoWindowToMarker(mapMarker, marker);
//     }
//   }
//   addinfoWindowToMarker(mapMarker: any, marker: any) {
//     console.log('Marker:', marker); // Log marker object to check its contents
//     let infoWindowContent = `
//       <div id="content">
//         <h2>${marker.title}</h2>
//         <p>Latitude: ${marker.lat}</p>
//         <p>Longitude: ${marker.lng}</p>
//         <p>${marker.snippet} </p>
       
//       </div>`;
//     console.log('Info Window Content:', infoWindowContent);
//     let infoWindow = new google.maps.InfoWindow({
//       content: infoWindowContent
//     });
//     mapMarker.addListener('click', () => {
//       this.closeAllInfowindows();
//       console.log('Info Window Clicked:', marker); 
//       infoWindow.open(this.map, mapMarker);
//     });
//     this.infoWindows.push(infoWindow);
//   }
  

//   closeAllInfowindows() {
//     for (let window of this.infoWindows) {
//       window.close();
//     }
//   }

//   showMap()  {
//     const location = new google.maps.LatLng(this.source,this.dest);
//     const options = {
//       center: location,
//       zoom: 10,
//     };
//     this.map = new google.maps.Map(this.mapRef.nativeElement, options);
//     this.addMarkersToMap(this.markers);
//     this.displayRoute(this.source, this.dest);
//     this.displayRoute(this.markers[this.markers.length - 2], this.markers[this.markers.length - 1]);
//     console.log(this.displayRoute);

//      this.cluster(this.map,this.markers);

//   }

// //cluster


// cluster(map: any, markers: any[]){

//   const markerCluster = new MarkerClusterer(map,markers, {
//             imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
//          });
     
//         }

//    //direction


//    displayRoute(origin: any, destination: any) {



//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(this.map);
//     const request = {
//       origin: new google.maps.LatLng(origin.lat, origin.lng),
//       destination: new google.maps.LatLng(destination.lat, destination.lng),
//       travelMode: 'DRIVING'
//     };
//     directionsService.route(request, (response: any, status: any) => {
//       if (status === 'OK') {
//         directionsRenderer.setDirections(response);
//       } else {
//         console.error('Directions request failed due to ' + status);
//       }
//     });


    
//   }


//   //initializing functions;;;;

//   ngOnInit() {
//   }

//   ngAfterViewInit(){
  
//      if (this.mapRef && this.mapRef.nativeElement) {
//     this.showMap();
//   }
//     this.showMap();

// }

//    }





//it works 


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import MarkerClusterer from '@googlemaps/markerclustererplus'; // Import MarkerClusterer

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: google.maps.Map | any;
  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  markerData: { title: string, snippet: string, position: { lat: number, lng: number } }[] = [];
  lines: google.maps.Polyline[] = [];
  polygon: google.maps.Polygon | null = null; // Variable to store the polygon

  @ViewChild('map', { static: false }) mapRef: ElementRef | any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.showMap();
  }

  showMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 10.9379575, lng: 76.9676995 },
      zoom: 10,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.addMarkers();
    this.addInfoWindows();
    this.addMarkerCluster();
    this.addLinesBetweenMarkers();
    this.addGeofencedArea(); // Call function to add geofenced area
    this.addAdditionalGeofencedArea();
    this.addLineGeofence();
  }

  addMarkers() {
    const locations = [
      { title: 'CHENNAI', lat: 13.0474733, lng: 80.0441992, snippet: 'Chennai formerly known as Madras, is the capital city of Tamil Nadu, the southernmost state of India. It is the states primate city ' },
      { title: 'COIMBATORE', lat: 11.00555, lng: 76.96612, snippet: 'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India' },
      { title: 'POLLACHI', lat: 10.641871, lng: 77.0145378, snippet: 'Pollachi is a town and a taluk headquarters in Tamil Nadu state, India. Located about 40 km (25 mi) to the south of Coimbatore' },
      { title: 'PALANI', lat: 10.4528409, lng: 77.4959245, snippet: 'Palani (Tamil: [paɻani], is a town and a taluk headquarters in Dindigul district of the western part of Tamil Nadu state in India.' },
      { title: 'TIRUPPUR', lat: 11.108571, lng: 77.281411, snippet: 'Tiruppur or Tirupur is a city in the Indian state of Tamil Nadu. It is located on the banks of the Noyyal river and is the fourth largest urban ' },
      { title: 'BNC Motors', lat:10.939241178102202,lng: 76.97837798334106, snippet:'To make sure that customers transition to clean energy 2-wheelers en masse, we design vehicles which are equal to or better than their ICE counterparts in every'},
      { title:'Home Sweet Home', lat:10.783544492151865,lng:77.06660235615354,snippet:''},
   
    ];

    locations.forEach((location) => {
      const markerData = {
        position: { lat: location.lat, lng: location.lng },
        title: location.title,
        snippet: location.snippet,
      };
      const marker = new google.maps.Marker({
        position: markerData.position,
        title: markerData.title,
        map: this.map,
      });
      this.markers.push(marker);
      this.markerData.push(markerData);
    });
  }

  addInfoWindows() {
    this.markers.forEach((marker, index) => {
      const infoWindowContent = `
        <div id="content">
          <h2>${marker.getTitle()}</h2>
          <p>Latitude: ${this.markerData[index].position.lat}</p>
          <p>Longitude: ${this.markerData[index].position.lng}</p>
          <p>${this.markerData[index].snippet} </p>
        </div>`;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      marker.addListener('click', () => {
        this.closeAllInfoWindows();
        infoWindow.open(this.map, marker);
      });

      this.infoWindows.push(infoWindow);
    });
  }

  closeAllInfoWindows() {
    this.infoWindows.forEach((infoWindow) => {
      infoWindow.close();
    });
  }

  addMarkerCluster() {
    const markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
  }

  addLinesBetweenMarkers() {
    for (let i = 0; i < this.markers.length - 1; i++) {
      const lineCoordinates = [
        { lat: 13.0474733, lng: 80.0441992 },    //chennai  
        //  { lat:61.99797200033277, lng:94.56108498872399},
        // { lat: 10.641871, lng: 77.0145378},
        // { lat:14.472042045246518 ,lng:108.11633065183597}, 


        // {lat: 11.00555, lng: 76.96612,},    //coimbatore  
        {lat: 10.641871, lng: 77.0145378,}, //pollachi
        
        {lat: 10.942760809879006,lng:76.97929098929872}, //sidco ,

        {lat: 10.942640336682834,lng: 76.97780733827231}, ///sidco first left 10.939241178102202,
         
        {lat:10.939241178102202,lng: 76.97837798334106}, //Bnc motors



        // this.markers[i].getPosition(),
        // this.markers[i + 1].getPosition(),
      ];
      const line = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      line.setMap(this.map);

      this.lines.push(line);

      // console.log(this.addLinesBetweenMarkers)
    }
  }

  addGeofencedArea() {
    // Ensure that both this.map and google namespace are available
    if (!this.map || !google) {
      console.error('Map or Google Maps JavaScript API is not available.');
      return;
    }

    // Define the coordinates for the geofenced area
    const areaCoordinates = [
      { lat:11.00555, lng:  76.96612 },
      { lat: 10.641871, lng: 77.0145378 },
      { lat: 10.4528409, lng:  77.4959245 },
    ];

    // Construct the polygon
    const newPolygon = new google.maps.Polygon({
      paths: areaCoordinates,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });

    // Set the polygon on the map if it's not null
    if (newPolygon) {
      newPolygon.setMap(this.map);
      this.polygon = newPolygon; // Update the reference to the polygon
    }
  }


  addAdditionalGeofencedArea() {
    // Ensure that both this.map and google namespace are available
    if (!this.map || !google) {
      console.error('Map or Google Maps JavaScript API is not available.');
      return;
    }
  
    // Define the center and radius for the circle
    const center = { lat:10.783544492151865, lng: 77.06660235615354 };
    const radius = 5000; // Specify the radius in meters
  
    // Construct the circle
    const circle = new google.maps.Circle({
      strokeColor: 'black',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00FF00',
      fillOpacity: 0.35,
      map: this.map,
      center: center,
      radius: radius,
    });
  
    // Set the circle on the map
    circle.setMap(this.map);
  }
    

  addLineGeofence() {
    if (!this.map || !google) {
      console.error('Map or Google Maps JavaScript API is not available.');
      return;
    }
  
    // Define the coordinates for the line (start and end points)
    const startPoint = { lat:11.2971584, lng:76.8514278 };
    const endPoint = { lat:11.4217662, lng: 76.9239403 };
  
    // Create a polyline with the defined coordinates
    const line = new google.maps.Polyline({
      path: [startPoint, endPoint],
      geodesic: true,
      strokeColor: '#00FF00', // Choose a color for the line
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
    // Set the line on the map
    line.setMap(this.map);
  }
  
}
