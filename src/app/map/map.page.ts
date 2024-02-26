import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any; // Declare google variable

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef<HTMLElement> | any;

  infoWindows: any = [];
  markers: any[] = [
    { title: 'CHENNAI', lat: 13.0474733, lng: 80.0441992 , snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India'},
    { title: 'COIMBATORE', lat: 11.00555, lng: 76.96612,snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India' },
    { title: 'POLLACHI', lat: 10.641871, lng: 77.0145378,snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India' },
    { title: 'PALANI', lat: 10.4528409, lng: 77.4959245 ,snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India'},
    { title: 'TIRUPPUR', lat: 11.108571, lng: 77.281411,snippet:'Coimbatore is the second largest city in Tamil Nadu after Chennai in terms of population and the 16th largest urban agglomeration in India' }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
     if (this.mapRef && this.mapRef.nativeElement) {
    this.showMap();
  }
    this.showMap();
  }

  addMarkersToMap(markers: any[]) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.lat, marker.lng);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        map: this.map
      });
      this.addinfoWindowToMarker(mapMarker, marker);
    }
  }
  addinfoWindowToMarker(mapMarker: any, marker: any) {
    console.log('Marker:', marker); // Log marker object to check its contents
    let infoWindowContent = `
      <div id="content">
        <h2>${marker.title}</h2>
        <p>Latitude: ${marker.lat}</p>
        <p>Longitude: ${marker.lng}</p>
        <p>Content: ${marker.snippet} </p>
       
      </div>`;
    console.log('Info Window Content:', infoWindowContent);
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    mapMarker.addListener('click', () => {
      this.closeAllInfowindows();
      console.log('Info Window Clicked:', marker); 
      infoWindow.open(this.map, mapMarker);
    });
    this.infoWindows.push(infoWindow);
  }
  

  closeAllInfowindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(11.00555, 76.96612);
    const options = {
      center: location,
      zoom: 10,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
  
 
}
