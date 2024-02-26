import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit {

  constructor(private ngZone:NgZone,
              private router:Router) { }

  refresh() {
    Network.getStatus().then(status => {
      console.log('Network status:', status);
      if (status.connected) {
        this.ngZone.run(() => {
          // Navigate to the home page if online
          this.router.navigateByUrl('/home',{ replaceUrl: true });
        });
      }
    });
  }

  ngOnInit(){}
}
