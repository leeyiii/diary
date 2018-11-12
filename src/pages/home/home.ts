import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

// import { EntryDataServiceProvider } from '../';

// export let entries: Entry[] = [];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  private entries: Entry[]=[];

  constructor(public navCtrl: NavController,
    private entryDataService: EntryDataServiceProvider, public plt:Platform
  ) {
    this.entryDataService.getObservable().subscribe(update=>{
      this.entries = entryDataService.getEntries();
      console.log(this.entries);
    });

    this.entries = entryDataService.getEntries();
    //


  }

  // private sortAscend(): void{
  //
  //   for (let e of this.entries) {
  //     if (typeof e.time === 'string') {
  //       e.time = new Date(e.time);
  //     }
  //   }
  //   this.entries.sort((a: Entry, b: Entry) => {
  //     let aAsDate =
  //     a.time.getTime() - b.time.getTime()
  //   }).reverse();
  // }





  private editEntry(entryID:number){
    console.log("editing entry ", entryID);
    this.navCtrl.push(EntryDetailPage, {"entryID": entryID});

  }

  private deleteEntry(entryID: number){
    this.entryDataService.removeEntry(entryID);
  }

  public addEntry() {
     this.navCtrl.push(EntryDetailPage);
  }

  public ionViewWillEnter(){
    this.plt.ready().then(() =>{
      for (let e of this.entries) {
        if (typeof e.time === 'string') {
          e.time = new Date(e.time);
        }
      }
      this.entries.sort((a: Entry, b: Entry) => {
        let aAsDate =
        a.time.getTime() - b.time.getTime()
      }).reverse();

    })
  }

}
