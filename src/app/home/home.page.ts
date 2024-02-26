import { Component, ElementRef, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { BackButtonService } from '../back-button.service';


;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage  implements OnInit , OnDestroy{

  @ViewChild('map')

  latitude: any;
  longitude: any;

  networkListener:PluginListenerHandle | any;
  status: boolean | any;
 




  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private router:Router,
    private ngZone:NgZone,
    private backButtonService: BackButtonService
   )
   { 
    this.backButtonService.init();
   }
  
//location plugiun 



  checkLocationPermission() {


    {
      this.router.navigateByUrl('/map');
    }


    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(
      result => {
        if (result.hasPermission) {
          this.askToTurnOnGPS();
        } else {
          this.requestLocationPermission();
        }
      },
      err => {
        console.error(err);
      }
    );
   
   

  }

  requestLocationPermission() {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      .then(() => {
        this.askToTurnOnGPS();
      },
      error => {
        console.error('Error requesting location permission', error);
      });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(() => {
            this.getUserLocation();
          },
          error => console.error('Error requesting location accuracy', error)
        );
      }
    });
  }

  async getUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude);
      console.log(this.longitude);
    }).catch((error) => {
      console.error('Error getting location', error);
    }).finally(() => {
    });
  }



  //network checking plugin 

async ngOnInit() {

  this.networkListener = await Network.addListener('networkStatusChange', status => {
    console.log('Network status changed', status); 

    this.ngZone.run(() => {    //it check and run automatically tells online or offline 
    this.changeStatus(status);
    
   });

  });
  

    const status = await Network.getStatus();
     console.log('Network status:',status);

    this.changeStatus(status);  
    console.log('Network status:',this.status);
    
   
  }
   
  changeStatus(status: any){

    this.status = status?.connected;


    if(!this.status){
     this.router.navigateByUrl('/offline',{ replaceUrl: true });
    }
    // else{
    //   this.router.navigateByUrl('/offline');
    // }


  
    
  }



  ngOnDestroy(): void {  // it removes the current page during offline

    if(this.networkListener) this.networkListener.remove()   
    
  }

  camera(){

    this.router.navigateByUrl('/camera');
  }

  
  document(){

    this.router.navigateByUrl('/document');
  }
  

}

   

 

