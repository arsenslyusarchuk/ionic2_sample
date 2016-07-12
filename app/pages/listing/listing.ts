import { Component, OnInit } from '@angular/core'
import { NavController, Loading, ActionSheet} from 'ionic-angular';
import { ItemService } from '../../services/item-service';
import { Item } from '../../models/item';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/listing/listing.html',
  providers: [ItemService]
})
export class ListingPage implements OnInit  {
  items: Item[] = [];
  loadingContent: boolean;
  public base64Image: string;

  constructor(
    private _navController: NavController,
    private _itemService: ItemService
   )  { this.loadingContent = true; }

  ngOnInit() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 3000
    });
    this._navController.present(loading);
    this._itemService.getItems()
      .then((data) => {
        this.loadingContent = false;
        loading.dismiss();
        this.items = data
      });
  }
  takePicture(){
    console.log('camera will open');
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200
    }).then((imageData) => {
      // imageData is a base64 encoded string
        let base64Image = "data:image/jpeg;base64," + imageData;

        let item: Item = {
          "id": 1,
          "title": "This is the new Item",
          "description": "This is first Item description",
          "avatar": base64Image
        }
        this.items.push(item);
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
