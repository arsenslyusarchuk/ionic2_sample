import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NavController, ActionSheet} from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  selector: 'upload-photo',
  templateUrl: 'build/components/upload-component.html',
})
export class UploadComponent{


  @Input() loading: boolean;

  @Output() imageCaptured = new EventEmitter();

  // @Output() base64Image: string;

  constructor( private _navController: NavController) {}

  takePicture(){
    console.log('camera will open');
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200
    }).then((im) => {
      // imageData is a base64 encoded string
      let base64Image = "data:image/jpeg;base64," + im;

      this.imageCaptured.emit({
         value: base64Image
      })
    }, (err) => {
        console.log(err);
    });
  }

  openActionsDialog() {
    let actionSheet = ActionSheet.create({
      title: 'Choose action',
      buttons: [
        {
          text: 'Upload Photo',
          icon: 'add',
          role: 'add',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this._navController.present(actionSheet);
  }
}
