import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NavController, ActionSheet, Platform, Alert} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Transfer, File } from 'ionic-native';

@Component({
  selector: 'upload-photo',
  templateUrl: 'build/components/upload-component.html'
})
export class UploadComponent{


  @Input() loading: boolean;

  @Output() imageCaptured = new EventEmitter();

  // @Output() base64Image: string;

  constructor( private platform: Platform, private _navController: NavController) {}

  takePicture(){
    console.log('camera will open');
    Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 200,
        targetHeight: 200
    }).then((im) => {
      // imageData is a base64 encoded string
      // let base64Image = "data:image/jpeg;base64," + im;
      this.saveImageToFileSystem(im);
      // this.imageCaptured.emit({
      //    value: base64Image
      // })
    }, (err) => {
        console.log(err);
    });
  }

  createDirIfNeeded(dirName) {
    let targetPath;
    if (this.platform.is('ios')) {
      targetPath = cordova.file.documentsDirectory;
    }
    else if(this.platform.is('android')) {
      targetPath = cordova.file.dataDirectory;
    }
    File.checkDir(targetPath, dirName)
      .then((data: any) => {
        console.log('Hooray', data);
      })
      .catch((error: any) => {
        File.createDir(targetPath, dirName, true);
        // console.log('Error', error);
      })
  }

  saveImageToFileSystem(imageUrl){
    this.platform.ready().then(() => {
      let fileTransfer = new Transfer();
      let destDir = 'filesToUpload';

      let imageLocation = `${imageUrl}`;

      let targetPath; // storage location depends on device type.

      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      this.createDirIfNeeded(destDir);

      if (this.platform.is('ios')) {
        targetPath = cordova.file.documentsDirectory + `${destDir}/${new Date().getTime()}.jpg`;
      }
      else if(this.platform.is('android')) {
        targetPath = cordova.file.dataDirectory + `${destDir}/${new Date().getTime()}.jpg`;
      }
      else {
        // do nothing, but you could add further types here e.g. windows/blackberry
        return false;
      }

      fileTransfer.download(imageLocation, targetPath)
        .then((result: any) => {
            let alertSuccess = Alert.create({
              title: 'Download Succeeded!',
              subTitle: `${imageLocation} was successfully downloaded to: ${targetPath}`,
              buttons: ['Ok']
            });

            this._navController.present(alertSuccess);
        }).catch((error: any) => {
            let alertFailure = Alert.create({
              title: 'Download Failed!',
              subTitle: `${imageLocation} was not successfully downloaded, please try again later`,
              buttons: ['Ok']
            });

            this._navController.present(alertFailure);
        });
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
