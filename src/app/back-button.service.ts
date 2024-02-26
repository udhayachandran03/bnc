import { Injectable, Optional } from '@angular/core';
import { IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  private lastBackTime = 0;

  constructor(private platform: Platform,
              private router: Router,
              private navController: NavController,
              private toastController: ToastController) 
              
    {
    //  this.platform.ready().then(() => {
    //    this.init();
    // });
  }

 
  init(){
    this.platform.backButton.subscribeWithPriority(-1, async () => {
      if (this.router.url === "/home") {
        this.handleDoublePressToExit();
      } else {
       this.navController.back();
      }
    });
  }

   async handleDoublePressToExit() {

      // alert('hi');
    const now = Date.now();
    if (now - this.lastBackTime < 2000) {
     
      App.exitApp();

    } else {
      
      const toast = await this.toastController.create({
        message: 'Press back again to exit',
        duration: 2000,
     
        cssClass:'toast-bg'

      });
      toast.present();
      this.lastBackTime = now;
    }
   }

 
}
