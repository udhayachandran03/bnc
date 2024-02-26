
// //RC


// onRCFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   this.rcFile = file;

//   // Display preview
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.rcFilePreview = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }
// }


// viewRCFullScreen() {
//   this.rcFullScreen = true;
// }

// closeRCFullScreen() {
//   this.rcFullScreen = false;
// }


// //insurance


// oninsuranceFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   this.insuranceFile = file;

//   // Display preview
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.insuranceFilePreview = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }
// }


// viewinsuranceFullScreen() {
//   this.insuranceFullScreen = true;
// }

// closeinsuranceFullScreen() {
//   this.insuranceFullScreen = false;
// }



//  }




import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  
  licenceFilePreviews:string[] = []; // Array to store file previews
  currentImageIndex: number = 0; // Current image index
  licenceFullScreen: boolean = false;
  

 
  rcFilePreviews:string[] = []; // Array to store file previews
  rcFullScreen: boolean = false;
  ImageIndex: number = 0 ;



  

  insuranceFilePreviews:string[] = [];
  insuranceFullScreen: boolean = false;
  Index: number = 0 ;
  



  ngOnInit() {
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      //  this.licenceFilePreviews = []; 
       for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
      // if (files && files.length > 0) {
      //   const file: File = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.licenceFilePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
     
      }
    }
  }

  

  viewLicenceFullScreen(index: number) {
    this.currentImageIndex = index;
    this.licenceFullScreen = true;
}

  closeLicenceFullScreen() {
    this.licenceFullScreen = false;
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
   
      console.log(this.currentImageIndex);
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.licenceFilePreviews.length - 1) {
      this.currentImageIndex++;
      console.log(this.currentImageIndex);
    }
  }




  //rc field   
 
  

  onRCFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.rcFilePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  viewRCFullScreen(index: number) {
    this.ImageIndex = index;
    this.rcFullScreen = true;
  }

  closeRCFullScreen() {
    this.rcFullScreen = false;
  }
  

  prev() {
    if (this.ImageIndex > 0) {
      this.ImageIndex--;
   
      console.log(this.ImageIndex);
    }
  }

  next() {
    if (this.ImageIndex < this.rcFilePreviews.length - 1) {
      this.ImageIndex++;
      console.log(this.ImageIndex);
    }
  }



  //insurance 



  
  onInsuranceFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.insuranceFilePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  viewInsuranceFullScreen(index: number) {
    this.Index = index;
    this.insuranceFullScreen = true;
  }

  closeInsuranceFullScreen() {
    this.insuranceFullScreen = false;
  }
  

  pre() {
    if (this.Index > 0) {
      this.Index--;
   
      console.log(this.Index);
    }
  }

  nxt() {
    if (this.Index < this.insuranceFilePreviews.length - 1) {
      this.Index++;
      console.log(this.Index);
    }
  }

}
