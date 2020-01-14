import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Alert, ModalController, Content } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  id_kons: any;
  datadetail: any;
  noWhatsapp: string;
  divstatus: string;
  dataaccepted: any;

  no_wa_kons: any;
  nama_kons: any;
  datadelete: any;

  dataisnull: boolean;

  value: any;

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 40 };

  headerScrollConfig2: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 55 };

  @ViewChild('pageTop') pageTop: Content;

  @ViewChild(Content) content: Content;

  datakonsumeny: any;
  datakonsumenx: AngularFirestoreCollection<any>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) 
  {

    // this.datakonsumenx = this.firestore.collection<any>('data_booking_konsumen');
    // this.datakonsumeny=this.datakonsumenx.valueChanges();
    // this.datakonsumeny.subscribe(jk=>{
    //   this.value = jk;
    //   this.datanullornot();
    //   // console.log(this.datakonsumen)
    // });

    this.divstatus = "modenormal";

    this.value = navParams.get('datakonsumen');

    this.dataisnull = false;

    this.datanullornot();
  }

  nav_home()
  {
    this.navCtrl.push(HomePage);
  }

  datanullornot()
  {

      if (this.value.length == 0)
      {
        this.dataisnull = true;
      } 
      else if (this.value.length >= 1)
      {
        this.dataisnull = false;
      }
  
  }


  delete(x)
  {
    this.datadelete = x;
    this.nama_kons  = this.datadelete.nama_konsumen;
    this.no_wa_kons      = this.datadelete.no_hp;

    const alert: Alert = this.alertCtrl.create({
      message: 'Are you sure want reject this job ?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: data => 
          {
            this.loadingCtrl.presentWithGif1(); //show loading
            this.firestore.doc(`data_booking_konsumen/${this.datadelete.id_konsumen}`).delete().then( _=>
            {
              this.navCtrl.push(BookingPage);
              console.log("Sukses hapus data booking konsumen");
              this.loadingCtrl.dismiss();
              this.toastCtrl.create({
                message: 'Pemesanan jasa telah ditolak',
                duration: 3000
              }).present();

              ///// Send Wa To Customerrrrrrrrr

              this.sendWAcancel()

            }).catch(e =>{
              console.log("gagal hapus data booking konsumen : ",e);
              this.loadingCtrl.dismiss();
              this.toastCtrl.create({
                message: 'Data Gagal Dihapus',
                duration: 3000
            }).present();
        
            }) 
    
          }
        }
      ]
    });
    alert.present();
  }

  accepted(x)
  {

    this.dataaccepted     = x;
    this.nama_kons        = this.dataaccepted.nama_konsumen;
    this.no_wa_kons       = this.dataaccepted.no_hp;
    this.id_kons          = this.dataaccepted.id_konsumen;

    const alert: Alert = this.alertCtrl.create({
      title: 'Confirmation',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Device',
          value: 'Device',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Bag',
          value: 'Bag'
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Charger',
          value: 'Charger'
        },
      ],
      message: 'Are you sure want accept this job ?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: data => 
          {
            this.loadingCtrl.presentWithGif1(); //show loading

            // ---------------------------------------------------------------------------------------------
                this.firestore.doc(`data_konsumen/${this.dataaccepted.id_konsumen}`).set({
                  id_konsumen     :this.dataaccepted.id_konsumen,
                  no_konsumen     :this.dataaccepted.no_konsumen ,
                  tanggal_masuk   :this.dataaccepted.tanggal_masuk,
                  tanggal_keluar  :this.dataaccepted.tanggal_keluar,
                  nama_konsumen   :this.dataaccepted.nama_konsumen,
                  merek           :this.dataaccepted.merek,
                  kelengkapan     :data,
                  no_hp           :this.dataaccepted.no_hp,
                  problem_desk    :this.dataaccepted.problem_desk,
                  catatan         :this.dataaccepted.catatan,
                  biaya           :this.dataaccepted.biaya,
                  status          :this.dataaccepted.status,
                  third_party_job   :this.dataaccepted.third_party_job,
                  third_party_name  :this.dataaccepted.third_party_name,
                  third_party_transfer_date   :this.dataaccepted.third_party_transfer_date
                }).then((snapshot)=> {

                  console.log("Sukses accept data booking konsumen 1");

                  this.firestore.doc(`data_booking_konsumen/${this.dataaccepted.id_konsumen}`).delete().then( _=>
                  {
                    this.navCtrl.push(BookingPage);
                    console.log("Sukses accept data booking konsumen 2");
                    this.loadingCtrl.dismiss();
                    this.toastCtrl.create({
                      message: 'Sukses accept data booking konsumen',
                      duration: 3000
                    }).present();

                    ///// Send Wa To Customerrrrrrrrr

                    this.sendWAaccept();

                  }).catch(e =>{
                    console.log("gagal accept data booking konsumen 2 : ",e);
                    this.loadingCtrl.dismiss();              
                  }) 

              }).catch(e =>{
                console.log("gagal accept data booking konsumen 1 : ",e);
                this.loadingCtrl.dismiss();
                this.toastCtrl.create({
                  message: 'Gagal Proses "accept" Data Booking Konsumen',
                  duration: 3000
              }).present();

              })      
          
    
          }
        }
      ]
    });
    alert.present();

  }


  sendWAaccept()
  {
    const jam = new Date().getHours();

    const pagi = jam >= 4 && jam <= 10;
    const siang = jam > 10 && jam <= 13;
    const sore = jam > 13 && jam <= 17;;
    const malam = jam > 17 && jam <= 24 || jam > 0 && jam <= 3 ;

    console.log("pagi : ",pagi,"| siang : ",siang,"| sore : ",sore ,"| malam : ",malam   );

    const nama_konsumen = this.nama_kons; // ambil data nama konsumen
    const first_name_konsumen = nama_konsumen.replace(/ .*/,''); // ambil nama pertama
    const first_name_konsumen_kapital = first_name_konsumen.charAt(0).toUpperCase() + first_name_konsumen.slice(1) // buat jadi kapital
    const fix_nama = first_name_konsumen_kapital;
    const no_WA = this.no_wa_kons;// ambil data no telp
    const idkons = this.id_kons;

    console.log(fix_nama, "  ", no_WA);

    if (pagi == true && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20pagi%20*"+fix_nama+"*,%20Status%20pemesanan%20anda%20telah%20kami%20terima%20silahkan%20hubungi%20kami%20mengenai%20sistematika%20pengambilan%20atau%20pengantaran%20device%20anda%20,%20serta%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*"; 
      window.open(url, '_blank');
      
    }
    else if (pagi == false && siang == true && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20siang%20*"+fix_nama+"*,%20Status%20pemesanan%20anda%20telah%20kami%20terima%20silahkan%20hubungi%20kami%20mengenai%20sistematika%20pengambilan%20atau%20pengantaran%20device%20anda%20,%20serta%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*"; 
      window.open(url, '_blank');
    }
    else if (pagi == false && siang == false && sore == true && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20sore%20*"+fix_nama+"*,%20Status%20pemesanan%20anda%20telah%20kami%20terima%20silahkan%20hubungi%20kami%20mengenai%20sistematika%20pengambilan%20atau%20pengantaran%20device%20anda%20,%20serta%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
      window.open(url, '_blank'); 
    }    
    else if (pagi == false && siang == false && sore == false && malam == true )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20malam%20*"+fix_nama+"*,%20Status%20pemesanan%20anda%20telah%20kami%20terima%20silahkan%20hubungi%20kami%20mengenai%20sistematika%20pengambilan%20atau%20pengantaran%20device%20anda%20,%20serta%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
      window.open(url, '_blank');
    }    
    else if (pagi == false && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20 %20Hallo%20*"+fix_nama+"*,%20Status%20pemesanan%20anda%20telah%20kami%20terima%20silahkan%20hubungi%20kami%20mengenai%20sistematika%20pengambilan%20atau%20pengantaran%20device%20anda%20,%20serta%20gunakan%20kode%20berikut%20ini%20untuk%20mengecek%20status%20device%20anda%20menggunakan%20aplikasi%20resmi%20Service%20Unnes.%20Terimakasih%20atas%20kepercayaan%20anda%20pada%20jasa%20kami.%20KODE%20:%20*"+idkons+"*";
      window.open(url, '_blank');
    }
    

  }

  sendWAcancel()
  {
    const jam = new Date().getHours();

    const pagi = jam >= 4 && jam <= 10;
    const siang = jam > 10 && jam <= 13;
    const sore = jam > 13 && jam <= 17;;
    const malam = jam > 17 && jam <= 24 || jam > 0 && jam <= 3 ;

    console.log("pagi : ",pagi,"| siang : ",siang,"| sore : ",sore ,"| malam : ",malam   );

    const nama_konsumen = this.nama_kons; // ambil data nama konsumen
    const first_name_konsumen = nama_konsumen.replace(/ .*/,''); // ambil nama pertama
    const first_name_konsumen_kapital = first_name_konsumen.charAt(0).toUpperCase() + first_name_konsumen.slice(1) // buat jadi kapital
    const fix_nama = first_name_konsumen_kapital;
    const no_WA = this.no_wa_kons;// ambil data no telp

    console.log(fix_nama, "  ", no_WA);

    if (pagi == true && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20pagi%20*"+fix_nama+"*.%20Maaf,%20dengan%20berat%20hati%20kami%20sampaikan%20bahwa%20status%20booking%20anda%20terpakasa%20kami%20tolak%20dikarenakan%20suatu%20alasan%20tertentu.%20Terimakasih.";   
      window.open(url, '_blank');
      
    }
    else if (pagi == false && siang == true && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20siang%20*"+fix_nama+"*.%20Maaf,%20dengan%20berat%20hati%20kami%20sampaikan%20bahwa%20status%20booking%20anda%20terpakasa%20kami%20tolak%20dikarenakan%20suatu%20alasan%20tertentu.%20Terimakasih.";   
      window.open(url, '_blank');
    }
    else if (pagi == false && siang == false && sore == true && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20sore%20*"+fix_nama+"*.%20Maaf,%20dengan%20berat%20hati%20kami%20sampaikan%20bahwa%20status%20booking%20anda%20terpakasa%20kami%20tolak%20dikarenakan%20suatu%20alasan%20tertentu.%20Terimakasih.";   
      window.open(url, '_blank'); 
    }    
    else if (pagi == false && siang == false && sore == false && malam == true )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20malam%20*"+fix_nama+"*.%20Maaf,%20dengan%20berat%20hati%20kami%20sampaikan%20bahwa%20status%20booking%20anda%20terpakasa%20kami%20tolak%20dikarenakan%20suatu%20alasan%20tertentu.%20Terimakasih.";   
      window.open(url, '_blank');
    }    
    else if (pagi == false && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Hallo%20*"+fix_nama+"*.%20Maaf,%20dengan%20berat%20hati%20kami%20sampaikan%20bahwa%20status%20booking%20anda%20terpakasa%20kami%20tolak%20dikarenakan%20suatu%20alasan%20tertentu.%20Terimakasih.";   
      window.open(url, '_blank');
    }
    

  }

  modenormal()
  {
    this.divstatus = "modenormal";
  }

  modedetaildata(x)
  {
    this.content.scrollToTop();
    
    this.datadetail = x;

    var nohp = this.datadetail.no_hp;
    var nophonefix = nohp.substr(1);
    
    this.noWhatsapp = "https://wa.me/"+nophonefix;

    this.divstatus = "modedetaildata";



  }




}
