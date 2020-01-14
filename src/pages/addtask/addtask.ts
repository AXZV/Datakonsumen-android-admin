import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Datakonsumen } from '../../models/datakonsumen';
import { AngularFirestore} from 'angularfire2/firestore';
import * as moment from 'moment';
import { LoadingProvider } from '../../providers/loading/loading';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ArsipkonsumenPage } from '../arsipkonsumen/arsipkonsumen';
// import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';


@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {
  tanggalpembayaran: string;
  iddd: string;
  dkk: any;
  idkonsumen: string;
  totalalltotalcapital: any;
  totalprices: any;
  datapembayaran: any;
  doc_totalcapital: any;
  segment: string;

  mydata: any;
  nokonsumen: any;
  nokonsumeny: any;
  nokonsumenx: AngularFirestoreCollection<any>;


  MySelect1:any=[];
  moreIndex1:any=1;
  doc_description:any=[];
  doc_price:any=[]; 
  doc_qty:any=[];
  doc_capital:any=[];
  doc_totalitemprice:any=[];

  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: 65 };
  // headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 40 };


  

// ---------------------------------------------------------------------------------------------
datakonsumen = {} as Datakonsumen;
// ---------------------------------------------------------------------------------------------

navhome()
{
  this.navCtrl.push(HomePage); 
}




  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public loadingCtrl:LoadingProvider,
    public toastCtrl: ToastController,) 
  {


    this.datakonsumen.catatan=null;
    this.datakonsumen.no_hp='+62';

    this.segment = 'graph1';
  
  }
back()
{
  this.navCtrl.push(ArsipkonsumenPage); 
}

graph1()
{
  this.segment='graph1';
}

graph2()
{
  this.segment='graph2';
}


ionViewDidLoad() 
{
  this.nokonsumenx = this.firestore.collection<any>('jumlah_konsumen');
  this.nokonsumeny=this.nokonsumenx.valueChanges();
  this.nokonsumeny.subscribe(nk=>{
      this.nokonsumen = nk;
      this.mydata = this.nokonsumen[Math.floor((Math.random() * this.nokonsumen.length) + 0)];
    });
    
    
}
generatenokonsumen()
{
  // --------------------------------------Loading-----------------------------------------------
  this.loadingCtrl.presentWithGif1();
  // --------------------------------------------------------------------------------------------
    this.mydata = this.nokonsumen[Math.floor((Math.random() * this.nokonsumen.length) + 0)];
  // --------------------------------------------------------------------------------------------
    this.firestore.doc<any>(`jumlah_konsumen/JK`).update({
      jumlahkonsumen:this.mydata.jumlahkonsumen + 1,
      }).then((snapshot)=> {

        if (this.segment == 'graph1')
        {
          this.save();
        }
        else if (this.segment == 'graph2')
        {
          this.save2();
        }
        
      }).catch(function(error){
        this.loadingCtrl.dismiss();
        console.log("Error generate no konsumen", error);
      })

}


save()
{

    console.log("tambah data konsumen baru ke firestore");
  // ------------------------------------No Konsumen---------------------------------------------
    var nkonsumen =this.mydata.jumlahkonsumen;
  // -----------------------------------Random String---------------------------------------------
    var text = ""; 
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    for (var i = 0; i < 2; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));   
  // ---------------------------------------------------------------------------------------------
    var dk=this.datakonsumen;

    this.dkk=this.datakonsumen

    var datenow=moment().format('D MMMM YYYY');
    var idkonsumen="su"+nkonsumen+text;
    console.log(idkonsumen);
    this.iddd=idkonsumen;
  // ---------------------------------------------------------------------------------------------
      this.firestore.doc(`data_konsumen/${idkonsumen}`).set({
        id_konsumen     :idkonsumen,
        no_konsumen     :nkonsumen,
        tanggal_masuk   :datenow,
        tanggal_keluar  :'-',
        nama_konsumen   :dk.nama_konsumen,
        merek           :dk.merek,
        kelengkapan     :dk.kelengkapan,
        no_hp           :dk.no_hp,
        problem_desk    :dk.problem_desk,
        catatan         :dk.catatan,
        biaya           :0,
        status          :1,
        third_party_job   :false,
        third_party_name  :"-",
        third_party_transfer_date   :"-"
      }).then((snapshot)=> {
        this.navCtrl.push(ArsipkonsumenPage);
        console.log("Sukses tambah data konsumen");

        this.sendwasttusaccepted();

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
          message: 'Sukses Tambah Data Konsumen',
          duration: 3000
      }).present();
      
    }).catch(e =>{
      console.log("gagal tambah data konsumen : ",e);
      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'Gagal Tambah Data Konsumen',
        duration: 3000
    }).present();

    })      

}

save2()
{


    console.log("tambah data konsumen baru ke firestore");
  // ------------------------------------No Konsumen---------------------------------------------
    var nkonsumen =this.mydata.jumlahkonsumen;
  // -----------------------------------Random String---------------------------------------------
    var text = ""; 
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    for (var i = 0; i < 2; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));  
  // ---------------------------------------------------------------------------------------------
    var dk=this.datakonsumen;
    this.tanggalpembayaran = dk.tanggal_keluar;
    
    this.idkonsumen="su"+nkonsumen+text;
  // ---------------------------------------------------------------------------------------------
      this.firestore.doc(`data_konsumen/${this.idkonsumen}`).set({
        id_konsumen     :this.idkonsumen,
        no_konsumen     :nkonsumen,
        tanggal_masuk   :dk.tanggal_masuk,
        tanggal_keluar  :dk.tanggal_keluar,
        nama_konsumen   :dk.nama_konsumen,
        merek           :dk.merek,
        kelengkapan     :dk.kelengkapan,
        no_hp           :dk.no_hp,
        problem_desk    :dk.problem_desk,
        catatan         :dk.catatan,
        biaya           :0,
        status          :5,
        third_party_job   :false,
        third_party_name  :"-",
        third_party_transfer_date   :"-"
      }).then((snapshot)=> {
        this.detailpembayaran();
        // this.navCtrl.push(ArsipkonsumenPage);
        console.log("Sukses tambah data konsumen");

        this.toastCtrl.create({
          message: 'Sukses Tambah Data Konsumen',
          duration: 3000
      }).present();
      
    }).catch(e =>{
      console.log("gagal tambah data konsumen : ",e);
      this.loadingCtrl.dismiss();

      this.toastCtrl.create({
        message: 'Gagal Tambah Data Konsumen',
        duration: 3000
    }).present();

    })      

}

detailpembayaran()
{
   // CREATE ARRAY TO MAKE ITEMPRICE TOTAL
   let dataarray:any=[];
   for(let i=1; i<=this. MySelect1.length;i++) {
     dataarray.push({"description":this.doc_description[i],"capital":this.doc_capital[i],"price":this.doc_price[i],"qty":this.doc_qty[i]});       
   }


   // array variabel
   var arraycomb = dataarray;

   // GET TOTAL ITEM PRICE
   var itempricetotal = arraycomb.map(function (data) {
     var x = data.price;
     var price = x.split(".").join(""); //menghapus titik
     return (price * data.qty);
   });

   // GET TOTAL CAPITAL
   var totalcapital = arraycomb.map(function (data) {
     var x = data.capital;
     var tcapital = x.split(".").join(""); //menghapus titik
     return (tcapital * data.qty);
   });

   // GET TOTAL ITEM PRICE RUPIAH FORMAT CURRUNCY
   var itempricetotal2 = itempricetotal.map(function (data) {

       var bilangan = data;    
       var	number_string = bilangan.toString(),
         sisa 	= number_string.length % 3,
         rupiah 	= number_string.substr(0, sisa),
         ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
           
       if (ribuan) {
         var separator = sisa ? '.' : '';
         rupiah += separator + ribuan.join('.');
       }
       return rupiah

   });

   this.doc_totalitemprice = itempricetotal2;

   // GET TOTAL ITEM PRICE RUPIAH FORMAT CURRUNCY
   var totalcapital2 = totalcapital.map(function (data) {

     var bilangan = data;    
     var	number_string = bilangan.toString(),
       sisa 	= number_string.length % 3,
       rupiah 	= number_string.substr(0, sisa),
       ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
         
     if (ribuan) {
       var separator = sisa ? '.' : '';
       rupiah += separator + ribuan.join('.');
     }
     return rupiah

   });

   this.doc_totalcapital = totalcapital2;


   // access object in arraycomb
   var arraycombprice = arraycomb.map(function (data) {
     return data.price;
   });
   var arraycombdesc = arraycomb.map(function (data) {
     return data.description;
   });
   var arraycombqty = arraycomb.map(function (data) {
     return data.qty;
   });

   var arraycombcapt = arraycomb.map(function (data) {
     return data.capital;
   });
   
   // CREATE ARRAY TO WITH ITEMPRICETOTAL && TOTALCAPITAL // FINAL ARRAY
   let dataarray2:any=[];
   for(let i=1; i<=this.doc_totalitemprice.length; i++) { 
     dataarray2.push({"description":arraycombdesc[(i-1)],"capital":arraycombcapt[(i-1)],"totalcapital":this.doc_totalcapital[(i-1)],"price":arraycombprice[(i-1)],"qty":arraycombqty[(i-1)],"itempricetotal":this.doc_totalitemprice[(i-1)]}); 
   }
   console.log(dataarray2); 
   this.datapembayaran=dataarray2;
   
   // GET FINAL TOTAL ALL ITEM PRICE
   var totalprice = itempricetotal.reduce(function (acc, score) {
     return acc + score;
   }, 0);
   // GET FINAL TOTAL ALL TOTAL CAPITAL
   var alltotalcapital = totalcapital.reduce(function (acc, score) {
     return acc + score;
   }, 0);


   // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
   var bilangan = totalprice;    
   var	number_string = bilangan.toString(),
     sisa 	= number_string.length % 3,
     totalpricerupiah 	= number_string.substr(0, sisa),
     ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
   if (ribuan) {
     var separator = sisa ? '.' : '';
     totalpricerupiah += separator + ribuan.join('.');
   }
   this.totalprices=totalpricerupiah; /// total price rupiah final


   // GET FINAL TOTAL ALL TOTAL CAPITAL FORMAT TO RUPIAH CURRUNCY
   var bilangan2 = alltotalcapital;    
   var	number_string2 = bilangan2.toString(),
     sisa2 	= number_string2.length % 3,
     totalcapitalrupiah 	= number_string2.substr(0, sisa2),
     ribuan2 	= number_string2.substr(sisa2).match(/\d{3}/g);
   if (ribuan2) {
     var separator2 = sisa2 ? '.' : '';
     totalcapitalrupiah += separator2 + ribuan2.join('.');
   }
   this.totalalltotalcapital=totalcapitalrupiah; /// total price rupiah final

   this.saveDatapembayaran();

}


saveDatapembayaran()
  {

    /////////  cari tanggal pembayaran
    

    var date=this.tanggalpembayaran
    console.log(date);

    /////////////////////////// GET YEAR
      var y = parseInt(date);
      var year = y.toString();

    /////////////////////////// GET MONTH

      var arr = date.split("-");
      
      var months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
      var month_index = parseInt(arr[1],10) - 1;
      var month     = months[month_index];

    /////////////////////////// GET DAY
      var day_index = parseInt(arr[2]);
      var day       = day_index.toString();


    console.log(day, month, year);


    this.firestore.doc(`data_pembayaran_konsumen/${this.idkonsumen}`).set({
      detailpembayaran     :this.datapembayaran,
      totalcapital         :this.totalalltotalcapital,
      totalpembayaran      :this.totalprices,
      datenowD             :day,
      datenowM             :month,
      datenowY             :year,
    }).then((snapshot)=> {

      console.log("Sukses tambah data pembayaran");
      
        

        this.firestore.doc(`data_konsumen/${this.idkonsumen}`).update({
          biaya           :this.totalprices,
        }).then((snapshot)=> {

          console.log("Sukses tambah data biaya ");
          this.navCtrl.push(ArsipkonsumenPage);
          this.loadingCtrl.dismiss();

        })

  
    
    }).catch(e =>{
      console.log("gagal tambah data pembayaran : ",e);
      this.loadingCtrl.dismiss();

    })      

  }




selectNo1(val1)
{
  if(val1==1)
  {
    this.MySelect1.push(this.moreIndex1);
    this.moreIndex1++;
  }
  else{
    this.MySelect1.pop(this.moreIndex1);
    this.moreIndex1--;
  }    
}


sendwasttusaccepted()
{

  // console.log("total price",this.totalprices)
  const jam = new Date().getHours();

  const pagi = jam >= 4 && jam <= 10;
  const siang = jam > 10 && jam <= 13;
  const sore = jam > 13 && jam <= 17;;
  const malam = jam > 17 && jam <= 24 || jam > 0 && jam <= 3 ;

  console.log("pagi : ",pagi,"| siang : ",siang,"| sore : ",sore ,"| malam : ",malam   );

  const nama_konsumen = this.dkk.nama_konsumen; // ambil data nama konsumen
  const first_name_konsumen = nama_konsumen.replace(/ .*/,''); // ambil nama pertama
  const first_name_konsumen_kapital = first_name_konsumen.charAt(0).toUpperCase() + first_name_konsumen.slice(1) // buat jadi kapital
  const fix_nama = first_name_konsumen_kapital;
  const no_WA = this.dkk.no_hp;// ambil data no telp
  const idkons = this.iddd;

  // console.log(fix_nama, "  ", no_WA);

  if (pagi == true && siang == false && sore == false && malam == false )
  {
    let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20pagi%20*"+fix_nama+"*,%20Device%20anda%20sudah%20kami%20terima,%20silahkan%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
    window.open(url, '_blank');
    
  }
  else if (pagi == false && siang == true && sore == false && malam == false )
  {
    let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20siang%20*"+fix_nama+"*,%20Device%20anda%20sudah%20kami%20terima,%20silahkan%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
    window.open(url, '_blank');
  }
  else if (pagi == false && siang == false && sore == true && malam == false )
  {
    let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20sore%20*"+fix_nama+"*,%20Device%20anda%20sudah%20kami%20terima,%20silahkan%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
    window.open(url, '_blank'); 
  }    
  else if (pagi == false && siang == false && sore == false && malam == true )
  {
    let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20malam%20*"+fix_nama+"*,%20Device%20anda%20sudah%20kami%20terima,%20silahkan%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
    window.open(url, '_blank');
  }    
  else if (pagi == false && siang == false && sore == false && malam == false )
  {
    let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Halo%20*"+fix_nama+"*,%20Device%20anda%20sudah%20kami%20terima,%20silahkan%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
    window.open(url, '_blank');
  }
  

}



}


