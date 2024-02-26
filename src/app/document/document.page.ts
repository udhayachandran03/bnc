import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage {
  licenceFile: File | null = null;
  licenceFilePreview: any = null;
  licenceFullScreen: boolean = false;


  rcFile: File | null = null;
  rcFilePreview: any = null;
  rcFullScreen: boolean = false;

  insuranceFile: File | null = null;
  insuranceFilePreview: any = null;
  insuranceFullScreen: boolean = false;
  

  

  constructor( private router:Router) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.licenceFile = file;

    // Display preview
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.licenceFilePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  viewLicenceFullScreen() {
    this.licenceFullScreen = true;
  }

  closeLicenceFullScreen() {
    this.licenceFullScreen = false;

    console.log(this.licenceFullScreen);
  
  }



//RC


onRCFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.rcFile = file;

  // Display preview
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.rcFilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


viewRCFullScreen() {
  this.rcFullScreen = true;
}

closeRCFullScreen() {
  this.rcFullScreen = false;
}


//insurance


oninsuranceFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.insuranceFile = file;

  // Display preview
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.insuranceFilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


viewinsuranceFullScreen() {
  this.insuranceFullScreen = true;
}

closeinsuranceFullScreen() {
  this.insuranceFullScreen = false;
}


//navigating to new

  
info(){

  this.router.navigateByUrl('/info');
}


}
