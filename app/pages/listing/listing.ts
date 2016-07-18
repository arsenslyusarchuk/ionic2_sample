import { Component, OnInit } from '@angular/core'
import { NavController, Loading, ActionSheet, Alert} from 'ionic-angular';
import { ItemService } from '../../services/item-service';
import { Item } from '../../models/item';
import { UploadComponent } from '../../components/upload/upload-component';
import { Auth } from '../../services/auth';

@Component({
  templateUrl: 'build/pages/listing/listing.html',
  providers: [ItemService],
  directives: [UploadComponent]
})
export class ListingPage implements OnInit  {
  items: Item[] = [];
  loadingContent: boolean;

  constructor(
    private _navController: NavController,
    private _itemService: ItemService,
    private _auth: Auth
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
        console.log('current User is', this._auth.currentUser);
      });
  }

  addItem(data){
    console.log('image data passed from component');
    console.log(data);
    let item: Item = {
      "id": this.items.length,
      "title": "This is the new Item",
      "description": "This is first Item description",
      "avatar": data.value
    }
    this.items.push(item);
  }

  showDeleteDialog(item){
    let confirm = Alert.create({
      title: 'Delete Item?',
      message: 'If u agree, item will be deleted forever?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.items.splice(this.items.findIndex(el => el.id == item.id), 1);
          }
        }
      ]
    });
    this._navController.present(confirm);
  }
}
