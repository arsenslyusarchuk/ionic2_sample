import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NavController, ActionSheet, Platform, Alert} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Transfer, File } from 'ionic-native';

@Component({
  selector: 'upload-photo',
  templateUrl: 'build/components/upload/upload-component.html'
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
      // this.imageCaptured.emit({
      //    value: base64Image
      // })
      this.saveImageToFileSystem(im);
    }, (err) => {
        console.log(err);
    });
  }

  saveImageToFileSystem(imageUrl){
    this.platform.ready().then(() => {
      let fileTransfer = new Transfer();
      let customDir = 'filesToUpload';
      let imageLocation = `${imageUrl}`;
      let targetPath, persistentStorageDir;

      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        persistentStorageDir = cordova.file.documentsDirectory;
        targetPath = persistentStorageDir + `${customDir}/${new Date().getTime()}.jpg`;
      }
      else if(this.platform.is('android')) {
        persistentStorageDir = cordova.file.dataDirectory;
        targetPath = persistentStorageDir + `${customDir}/${new Date().getTime()}.jpg`;
      }
      else {
        // do nothing, but you could add further types here e.g. windows/blackberry
        return false;
      }

      this.createDirIfNeeded(customDir, persistentStorageDir);

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

      // display images on ui (list)
      // Download them from disk 'filesToUpload'
      this.displayFilesOnUi(persistentStorageDir,customDir);
    });
  }

  createDirIfNeeded(dirName, persistentStorageDir) {
    File.checkDir(persistentStorageDir, dirName)
      .then((data: any) => {
        console.log('Hooray', data);
      })
      .catch((error: any) => {
        // create custom directory 'filesToUpload' because it doesn't exists
        File.createDir(persistentStorageDir, dirName, true);
      })
  }

  displayFilesOnUi(persistentStorageDir, dirName){
    // Read Files from 'filesToUpload' and
    // display them on UI reading image as Base64
    console.log(dirName);
    let fileReader = new FileReader();
    let _self = this;
    let reader = new FileReader();
    File.listDir(persistentStorageDir, dirName).then((data) => {
      console.log(data);
      // upload last image from dir
      let lastEl = data[data.length-1];
      lastEl.file((file) => {

        reader.onloadend = function() {
          _self.imageCaptured.emit({
            value: this.result
          });
        };

        reader.readAsDataURL(file);
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
