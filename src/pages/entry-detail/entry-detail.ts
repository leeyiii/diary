import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry';
import { HomePage } from '../home/home';
//import { EntryDetailPage } from '../entry-detail/entry-detail';

import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
/**
 * Generated class for the EntryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  // private entryTitle : string;
  // private entryText: string;
  private entry: Entry;

  constructor(public navCtrl: NavController, public navParams: NavParams, private entryDataService: EntryDataServiceProvider) {
    let entryID = this.navParams.get("entryID");
    if (entryID === undefined){
      this.entry = new Entry();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.id = -1 ;
    } else{
      this.entry = this.entryDataService.getEntryByID(entryID);
    }
    console.log("entry is ", this.entry);
  }


  public saveEntry(){
    // let newEntry = new Entry();
    // newEntry.title = this.entryTitle;
    // newEntry.text = this.entryText;
    if (this.entry.id === -1){
        this.entryDataService.addEntry(this.entry);
    } else {
        this.entryDataService.updateEntry(this.entry.id, this.entry);
    }
    this.navCtrl.pop();

    // entries.push(newEntry);
  }


  private cancelEntry(){
    this.navCtrl.push(HomePage);

  }


}
