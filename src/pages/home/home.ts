import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArsipkonsumenPage } from '../arsipkonsumen/arsipkonsumen';
import { RekappembayaranPage } from '../rekappembayaran/rekappembayaran';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { BookingPage } from '../booking/booking';
import { PricelistPage } from '../pricelist/pricelist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  booknumber: any;
  dataisnull: boolean;

arsipkonsumen()
{
  this.navCtrl.push(ArsipkonsumenPage); 
}
rekappembayaran()
{
  this.navCtrl.push(RekappembayaranPage);
}
pricelist()
{
  this.navCtrl.push(PricelistPage);
}

bookingpage(datakonsumen)
{
  this.navCtrl.push(BookingPage, {datakonsumen:datakonsumen});
}


datakonsumen: any;
datakonsumeny: any;
datakonsumenx: AngularFirestoreCollection<any>;


  constructor(
    public navCtrl: NavController,
    public firestore: AngularFirestore,

  ){

    this.dataisnull = true;
    this.booknumber = 0;
    this.getdata()
    

  }





getdata()
{
  this.datakonsumenx = this.firestore.collection<any>('data_booking_konsumen',ref => ref.orderBy('no_konsumen', 'desc'));
  this.datakonsumeny=this.datakonsumenx.valueChanges();
  this.datakonsumeny.subscribe(jk=>{
    this.datakonsumen = jk;
    this.datanullornot();
    // console.log(this.datakonsumen)
  });
}


datanullornot()
{

  if (this.datakonsumen.length == 0)
  {
    this.dataisnull = true;
  } 
  else if (this.datakonsumen.length >= 1)
  {
    this.dataisnull = false;
    this.booknumber = this.datakonsumen.length;
  }

  // console.log("status",this.dataisnull)
}




}
