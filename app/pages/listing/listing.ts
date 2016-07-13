import { Component, OnInit } from '@angular/core'
import { NavController, Loading, ActionSheet} from 'ionic-angular';
import { ItemService } from '../../services/item-service';
import { Item } from '../../models/item';
import { UploadComponent } from '../../components/upload-component';

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
  addItem(data){
    console.log('image data passed from component');
    console.log(data);
    let item: Item = {
      "id": 1,
      "title": "This is the new Item",
      "description": "This is first Item description",
      "avatar": data.value
    }
    this.items.push(item);
  }
}