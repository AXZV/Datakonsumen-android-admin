import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController, Alert, Content, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AddtaskPage } from '../addtask/addtask';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Datakonsumen } from '../../models/datakonsumen';
import { LoadingProvider } from '../../providers/loading/loading';
import * as moment from 'moment';
import { InvoicePage } from '../invoice/invoice';
import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';




@IonicPage()
@Component({
  selector: 'page-arsipkonsumen',
  templateUrl: 'arsipkonsumen.html',
})
export class ArsipkonsumenPage {
  third_party_total_payment_form_up_status: any;
  third_party_name_form_up_status: any;

  dataisnull: boolean;
  segment: string;

  datakons: any;
  datadetail21: any;
  noWhatsapp: any;

  @ViewChild('pageTop') pageTop: Content;

  @ViewChild(Content) content: Content;

  jph: any;
  jps: any;

  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: 65 };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 37 };
  headerScrollConfig2: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 51 };

  divdetailpembayaran: boolean;
  
  id: any;
  btwo: boolean;
  bone: boolean;
  datadetail2: any;
  totalprices: any;
  totalalltotalcapital: any;

  datapembayaran: any;


  MySelect1:any=[];
  moreIndex1:any=1;
  doc_description:any=[];
  doc_price:any=[]; 
  doc_qty:any=[];
  doc_capital:any=[];
  doc_totalitemprice:any=[];
  doc_totalcapital:any=[];

 
  divcheckout: boolean;


  datadetail: any;
  datadelete: any;
  
  
  datakonsumen: any;
  datakonsumeny: any;
  datakonsumenx: AngularFirestoreCollection<any>;

  datakonsumen2: any;
  datakonsumeny2: any;
  datakonsumenx2: AngularFirestoreCollection<any>;

  datapembayarankonsumen: any;
  datapembayarankonsumeny: any;
  datapembayarankonsumenx: AngularFirestoreDocument<any>;
  

  status:any;
  divstatus: any;
  dataedit: any;

  modecari:any;
// ---------------------------------------------------------------------------------------------
  adatakonsumen = {} as Datakonsumen;

  bdatakonsumen = {} as Datakonsumen;



// ---------------------------------------------------------------------------------------------


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingProvider,
    public toastCtrl: ToastController,
    private plt: Platform,
    ) 
  {
    this.status= 0;

    this.divstatus = 'modenormal';

    this.modecari = 'false';

    this.divcheckout=false;

    this.segment = "graph1";

    this.dataisnull = false;

  }


// =========================================== navigation ==========================================
// ====================================================================================================

  navhome()
  {
    this.navCtrl.push(HomePage); 
  }
  navaddtask()
  {
    this.navCtrl.push(AddtaskPage);
  }
  printinvoice(x)
  {
    this.navCtrl.push(InvoicePage, {x:x});
  }

  modecaris()
  {
    this.modecari = 'true';
  }

// =========================================== Mode Normal ==========================================
// ====================================================================================================

  modenormal()
  {
    this.divstatus = 'modenormal';
  }

// ============================================ Edit Data ===========================================
// ====================================================================================================

  modeedit(x)
  {
    this.divstatus = 'modeedit';
    this.dataedit = x;
    this.adatakonsumen.nama_konsumen    =x.nama_konsumen;
    this.adatakonsumen.merek            =x.merek;
    this.adatakonsumen.kelengkapan      =x.kelengkapan;
    this.adatakonsumen.no_hp            =x.no_hp;
    this.adatakonsumen.problem_desk     =x.problem_desk;
    this.adatakonsumen.catatan           =x.catatan;
    this.adatakonsumen.third_party_name  =x.third_party_name;
    this.adatakonsumen.third_party_job   =x.third_party_job;
    
  }

  editdata()
  {
    this.loadingCtrl.presentWithGif1(); //show loading
    var dk=this.adatakonsumen;
  // ---------------------------------------------------------------------------------------------
      this.firestore.doc(`data_konsumen/${this.dataedit.id_konsumen}`).update({
        nama_konsumen             :dk.nama_konsumen,
        merek                     :dk.merek,
        catatan                   :dk.catatan,
        kelengkapan               :dk.kelengkapan,
        no_hp                     :dk.no_hp,
        problem_desk              :dk.problem_desk,
      }).then((snapshot)=> {

        this.navCtrl.push(ArsipkonsumenPage);
        console.log("Sukses edit data konsumen");

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
          message: 'Sukses Edit Data',
          duration: 3000
      }).present();
      
    }).catch(e =>{
      console.log("gagal edit data konsumen : ",e);

      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'Gagal Edit Data',
        duration: 3000
    }).present();

    }) 
  }

  editdata2()
  {
    this.loadingCtrl.presentWithGif1(); //show loading
    var dk=this.adatakonsumen;
  // ---------------------------------------------------------------------------------------------
      this.firestore.doc(`data_konsumen/${this.dataedit.id_konsumen}`).update({
        nama_konsumen             :dk.nama_konsumen,
        third_party_name          :dk.third_party_name,
        merek                     :dk.merek,
        catatan                   :dk.catatan,
        kelengkapan               :dk.kelengkapan,
        no_hp                     :dk.no_hp,
        problem_desk              :dk.problem_desk,
      }).then((snapshot)=> {

        this.navCtrl.push(ArsipkonsumenPage);
        console.log("Sukses edit data konsumen");

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
          message: 'Sukses Edit Data',
          duration: 3000
      }).present();
      
    }).catch(e =>{
      console.log("gagal edit data konsumen : ",e);

      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'Gagal Edit Data',
        duration: 3000
    }).present();

    }) 
  }


// ============================================ Delete Data ==========================================
// ====================================================================================================

  delete(x)
  {
    this.datadelete = x;
    const alert: Alert = this.alertCtrl.create({
      message: 'Delete This Data ?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: data => 
          {
            this.loadingCtrl.presentWithGif1(); //show loading
            this.firestore.doc(`data_konsumen/${this.datadelete.id_konsumen}`).delete().then( _=>
            {
              this.firestore.doc(`data_pembayaran_konsumen/${this.datadelete.id_konsumen}`).delete().then( _=>
                {
                  this.navCtrl.push(ArsipkonsumenPage);
                  console.log("Sukses hapus data konsumen");
                  this.loadingCtrl.dismiss();
                  this.toastCtrl.create({
                    message: 'Data Berhasil Dihapus',
                    duration: 3000
                  }).present();
                }).catch(e => {
                    console.log("error hapus data pembayaran konsumen", e)
                })

            }).catch(e =>{
              console.log("gagal hapus data konsumen : ",e);
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



// =================================== Filter Status && Data show ==========================================
// ====================================================================================================

  status_f(stf)
  {
    this.status=stf;
    this.ionViewDidLoad();
  }

  graph1()
  {
    this.content.scrollToTop();
    this.status = 0;
    this.dataisnull = false;
    this.segment="graph1";
    this.ionViewDidLoad();
    
    
  }
  graph2()
  {
    this.content.scrollToTop();
    this.status = 0;
    this.dataisnull = false;
    this.segment="graph2";
    this.ionViewDidLoad();

    
  }
  
  ionViewDidLoad() {
    if(this.status == 0 && this.segment == "graph1" )
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        });
        

    }
    else if(this.status == 1 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 1 ).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        });
        
    }
    else if(this.status == 2 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 2).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        }); 
    }
    else if(this.status == 3 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 3).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        }); 
    }
    else if(this.status == 4 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 4).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        });
    }
    else if(this.status == 5 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 5).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        });

    }
    else if(this.status == 6 && this.segment == "graph1")
    {
      this.datakonsumenx = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 6).where('third_party_job', '==', false));
      this.datakonsumeny=this.datakonsumenx.valueChanges();
      this.datakonsumeny.subscribe(jk=>{
          this.datakonsumen = jk;
          this.datanullornot();
        }); 
    }

    // ---------------------------------------- SEGEMNT 2 ----------------------------------------

    if(this.status == 0 && this.segment == "graph2" )
    {
      this.datakonsumenx2 = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('third_party_job', '==', true));
      this.datakonsumeny2=this.datakonsumenx2.valueChanges();
      this.datakonsumeny2.subscribe(jk=>{
          this.datakonsumen2 = jk;
          this.datanullornot();
        }); 
    }
    if(this.status == 4 && this.segment == "graph2" )
    {
      this.datakonsumenx2 = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 4).where('third_party_job', '==', true));
      this.datakonsumeny2=this.datakonsumenx2.valueChanges();
      this.datakonsumeny2.subscribe(jk=>{
          this.datakonsumen2 = jk;
          this.datanullornot();
        }); 
    }
    else if(this.status == 5 && this.segment == "graph2" )
    {
      this.datakonsumenx2 = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 5).where('third_party_job', '==', true));
      this.datakonsumeny2=this.datakonsumenx2.valueChanges();
      this.datakonsumeny2.subscribe(jk=>{
          this.datakonsumen2 = jk;
          this.datanullornot();
        }); 
    }
    else if(this.status == 6 && this.segment == "graph2" )
    {
      this.datakonsumenx2 = this.firestore.collection<any>('data_konsumen',ref => ref.orderBy('no_konsumen', 'desc').where('status', '==', 6).where('third_party_job', '==', true));
      this.datakonsumeny2=this.datakonsumenx2.valueChanges();
      this.datakonsumeny2.subscribe(jk=>{
          this.datakonsumen2 = jk;
          this.datanullornot();
        }); 
    }


  }


  datanullornot()
  {
    if(this.segment == "graph1")
    {


      if (this.datakonsumen.length == 0)
      {
        this.dataisnull = true;
      } 
      else if (this.datakonsumen.length >= 1)
      {
        this.dataisnull = false
      }

    }

    else if(this.segment == "graph2")
    {


      if (this.datakonsumen2.length == 0)
      {
        this.dataisnull = true;
      } 
      else if (this.datakonsumen2.length >= 1)
      {
        this.dataisnull = false
      }

    }

  }

// ====================================== DIV Edit Status =============================================
// ====================================================================================================
  editstatus(x)
  {
    this.divstatus = 'modeeditstatus';
    this.dataedit = x;
  }
// =============================== Update Status NON FINISHED==========================================
// ====================================================================================================

  changestatus(st, id_konsumen, status)
  {
    this.loadingCtrl.presentWithGif1(); //show loading

    var statusx = status;


    // console.log("statusss",status);
    this.firestore.doc(`data_konsumen/${id_konsumen}`).update({
      status          :st,
      tanggal_keluar  :'-',
      biaya           :0
    }).then((snapshot)=> {


      if (statusx == 5)
      {
        this.firestore.doc(`data_pembayaran_konsumen/${id_konsumen}`).delete().then( _=>
          {
            console.log("sukses hapus data pembayaran");
            this.ionViewDidLoad();
            this.divstatus = 'modenormal';
            console.log("Sukses edit status data konsumen");

          }).catch( e => {console.log(e)})
      }
      else if (statusx !=5 )
      {
        this.ionViewDidLoad();
        this.divstatus = 'modenormal';
        console.log("Sukses edit status data konsumen");
      }




      if (st == 1)
      {
        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
        message: 'Status Berhasil di Update ke ACCEPTED',
        duration: 3000
        }).present();
      }
      else if (st == 2)
      {
        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
        message: 'Status Berhasil di Update ke CHECK',
        duration: 3000
        }).present();
      }
      else if (st == 3)
      {
        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
        message: 'Status Berhasil di Update ke WAITING',
        duration: 3000
        }).present();
      }
      else if (st == 4)
      {

        console.log("statusx",statusx)

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
        message: 'Status Berhasil di Update ke PROCESS',
        duration: 3000
        }).present();
      }

    
    }).catch(e =>{
      console.log("gagal edit status data konsumen : ",e);

      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
      message: 'Status Gagal di Update',
      duration: 3000
    }).present();

    }) 
 
  }

  changestatus2(st, id_konsumen)
  {

    this.loadingCtrl.presentWithGif1(); //show loading
    var datenow=moment().format('D MMMM YYYY');
    this.firestore.doc(`data_konsumen/${id_konsumen}`).update({
      status          :st,
      tanggal_keluar  :datenow,
    }).then((snapshot)=> {

      this.ionViewDidLoad();
      this.divstatus = 'modenormal';
      console.log("Sukses edit status data konsumen");

        this.loadingCtrl.dismiss();
        this.toastCtrl.create({
        message: 'Status Berhasil di Update ke FAILED',
        duration: 3000
        }).present();
    
    }).catch(e =>{
      console.log("gagal edit status data konsumen : ",e);

      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
      message: 'Status Gagal di Update',
      duration: 3000
      }).present();

    })
    
      
  }

  // =================================== Transfer Job  =============================================
   transferjob(id_konsumen, status) 
   {

    if (status <= 4 )
    {
      var datenowx=moment().format('D MMMM YYYY');

      const alert: Alert = this.alertCtrl.create({
        title: 'Transfer Job',
        message: 'Do you want to transfer this job to a third party? If yes, please enter the name of a third party',
      inputs: [
          {
            name: 'name',
            placeholder: "Third Party Name"
          }
        ],
        buttons: [
          { text: 'No', role: 'cancel' },
          {
            text: 'Yes',

            handler: data => 
            {

              this.loadingCtrl.presentWithGif1(); 

              this.firestore.doc(`data_konsumen/${id_konsumen}`).update({

                status            :4,
                third_party_job   :true,
                third_party_name  :data.name,
                third_party_transfer_date   :datenowx
              }).then((snapshot)=> {

                console.log("succes transfer to third party work");
                this.loadingCtrl.dismiss();
                this.ionViewDidLoad();
                this.divstatus = 'modenormal';

                this.toastCtrl.create({
                  message: 'Status Berhasil di Pindah ke Third Party Work',
                  duration: 3000
                  }).present();

              }).catch(e =>{
                console.log("error transfer", e);
                this.loadingCtrl.dismiss();
              })
            }
          }
        ]
      });
      alert.present();
    }
    else if (status >= 5)
    {

      var pesan = "This function cannot be used in the data status above or equal to 'Finished', please lower the data status to 'Process' or below if you want to use this function"

      let alert = this.alertCtrl.create({
        title: 'Attention',
        subTitle: pesan,
        buttons: ['Dismiss']
      });
      alert.present();


    }

  }

  /////////////////////////////////  SEGMENT TWO   ///////////////////////////////////


  transferjob2(id_konsumen, status) 
  {

   if (status == 4 )
   {

      const alert: Alert = this.alertCtrl.create({
       title: 'Take Back This Job',
       message: 'Are you sure you want to take this job back from a third party?',
       buttons: [
         { text: 'No', role: 'cancel' },
         {
           text: 'Yes',
           handler: () => 
           {

            this.loadingCtrl.presentWithGif1(); 

            this.firestore.doc(`data_konsumen/${id_konsumen}`).update({

              status            :4,
              third_party_job   :false,
              third_party_name  :"-",
              third_party_transfer_date   :"-"
            }).then((snapshot)=> {

              console.log("succes get the job back");
              this.loadingCtrl.dismiss();
              this.ionViewDidLoad();
              this.divstatus = 'modenormal';

              this.toastCtrl.create({
                message: 'Status Berhasil di Pindah ke Non Third Party Work',
                duration: 3000
                }).present();

            }).catch(e =>{
              console.log("error get back job", e);
              this.loadingCtrl.dismiss();
            })

           }
         }
       ]
     });
     alert.present();

   }
   else if (status >= 5)
   {

    const alert: Alert = this.alertCtrl.create({
      title: 'Take Back This Job',
      message: 'Are you sure you want to take this job back from a third party? payment data to third parties will be deleted',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: () => 
          {

           this.loadingCtrl.presentWithGif1(); 

           this.firestore.doc(`data_konsumen/${id_konsumen}`).update({

             status            :status,
             third_party_job   :false,
             third_party_name  :"-",
             third_party_transfer_date   :"-"
           }).then((snapshot)=> {


                this.firestore.doc(`data_pembayaran_konsumen/${id_konsumen}`).update({

                  third_party_total_payment: 0

                }).then((snapshot)=> {
    
                  console.log("succes get the job back");
                  this.loadingCtrl.dismiss();
                  this.ionViewDidLoad();
                  this.divstatus = 'modenormal';
    
                  this.toastCtrl.create({
                    message: 'Status Berhasil di Pindah ke Non Third Party Work',
                    duration: 3000
                    }).present();
    
                }).catch(e =>{
                  console.log("error get back job", e);
                  this.loadingCtrl.dismiss();
                })



           }).catch(e =>{
             console.log("error get back job", e);
             this.loadingCtrl.dismiss();
           })

          }
        }
      ]
    });
    alert.present();


   }

 }



// =========================================== Detail Data ==========================================
// ====================================================================================================


  detaildata(x)
  {
    this.content.scrollToTop();
    
    this.datadetail = x;
    // console.log(this.datadetail)
    var nohp = this.datadetail.no_hp;
    var nophonefix = nohp.substr(1);
    
    this.noWhatsapp = "https://wa.me/"+nophonefix;

    if (this.datadetail.status != 5)
    {
      this.divstatus = 'modedetaildata';

    }
    else if (this.datadetail.status == 5)
    {
      this.loadingCtrl.presentWithGif1(); //show loading

      this.datapembayarankonsumenx = this.firestore.doc<any>(`data_pembayaran_konsumen/${x.id_konsumen}`);
      this.datapembayarankonsumeny=this.datapembayarankonsumenx.valueChanges();
      this.datapembayarankonsumeny.subscribe(jk=>{

          this.datapembayarankonsumen = jk;
          this.divstatus = 'modedetaildata';
          this.loadingCtrl.dismiss();//STOP loading
          console.log(this.datapembayarankonsumen);
      })          
    }

  }
  detailpembayaran()
  {
    this.divdetailpembayaran = true;
    this.content.scrollToTop();
  }
  closedivdetailpembayaran()
  {
    this.divdetailpembayaran = false;
  }

// =========================================== Update Status ==========================================
// ====================================================================================================


  statusfinished1(dataedit)//via div edit status
  {
    this.bone = true;
    this.btwo = false;
    this.divstatus = 'detailpembayaran';
    this.datadetail = dataedit;
  }
  statusfinished1seg2(dataedit)//via div edit status segment 2
  {
    this.bone = true;
    this.btwo = false;
    this.divstatus = 'detailpembayaran';
    this.datadetail = dataedit;

    this.third_party_name_form_up_status = this.datadetail.third_party_name;
    this.third_party_total_payment_form_up_status = null;


  }
  statusfinished2(x)
  {
    this.btwo = true;
    this.bone = false;
    this.divstatus = 'detailpembayaran';
    this.datadetail2 = x.id_konsumen;
    this.datadetail21 = x;
  }

  selectNo1(val1){
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


  
  submitData() {
    this.content.scrollToTop();
    this.divcheckout=true;

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


  }

  submitDatasegment2() {

    console.log("ffff",this.third_party_total_payment_form_up_status)
    // var dk=this.bdatakonsumen;

    this.third_party_name_form_up_status = this.third_party_name_form_up_status;
    this.third_party_total_payment_form_up_status = this.third_party_total_payment_form_up_status;

    this.content.scrollToTop();
    this.divcheckout=true;

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


  }

  closex()
  {
    this.divcheckout=false;
  }

  saveData()
  {
    if (this.bone == true && this.btwo == false)
    {
      this.id = this.datadetail.id_konsumen;
      this.datakons = this.datadetail
    }
    else if (this.bone == false && this.btwo == true)
    {
      this.id = this.datadetail2;
      this.datakons = this.datadetail21;
    }
    this.loadingCtrl.presentWithGif1(); //show loading
    
    // INPUT DATE BY DAY, MONTH, YEARS
    var datenowD=moment().format('D');
    var datenowM=moment().format('MMMM');
    var datenowY=moment().format('YYYY');

    this.firestore.doc(`data_pembayaran_konsumen/${this.id}`).set({
      detailpembayaran     :this.datapembayaran,
      totalcapital         :this.totalalltotalcapital,
      totalpembayaran      :this.totalprices,
      datenowD             :datenowD,
      datenowM             :datenowM,
      datenowY             :datenowY,
    }).then((snapshot)=> {

      console.log("Sukses tambah data pembayaran");
      
      // UPDATE STATUS
      var datenow=moment().format('D MMMM YYYY');
      this.firestore.doc(`data_konsumen/${this.id}`).update({
        status          :5,
        tanggal_keluar  :datenow,
      }).then((snapshot)=> {

        // =============================================================
        if (this.plt.is('cordova')) {
          this.sendwasttusfinis();
        }
        else
        {
          this.sendwasttusfinis();
        }       
        // =============================================================
        this.navCtrl.push(ArsipkonsumenPage);
        this.divstatus = 'modenormal';
        console.log("Sukses edit status data konsumen");
  
          this.loadingCtrl.dismiss();

          this.toastCtrl.create({
          message: 'Status Berhasil di Update ke SUCCESS',
          duration: 3000
          }).present();
      
      }).catch(e =>{
        console.log("gagal edit status data konsumen : ",e);
  
        this.loadingCtrl.dismiss();

        this.toastCtrl.create({
        message: 'Status Gagal di Update',
        duration: 3000
        }).present();
  
      })


    
    }).catch(e =>{
      console.log("gagal tambah data pembayaran : ",e);
      this.loadingCtrl.dismiss();

    })      

  }

  saveDatasegment2()
  {

    this.id = this.datadetail.id_konsumen;
    this.datakons = this.datadetail

    this.loadingCtrl.presentWithGif1(); //show loading
    
    // INPUT DATE BY DAY, MONTH, YEARS
    var datenowD=moment().format('D');
    var datenowM=moment().format('MMMM');
    var datenowY=moment().format('YYYY');

    this.firestore.doc(`data_pembayaran_konsumen/${this.id}`).set({
      detailpembayaran     :this.datapembayaran,
      totalcapital         :this.totalalltotalcapital,
      totalpembayaran      :this.totalprices,
      datenowD             :datenowD,
      datenowM             :datenowM,
      datenowY             :datenowY,
      third_party_total_payment :this.third_party_total_payment_form_up_status
    }).then((snapshot)=> {

      console.log("Sukses tambah data pembayaran");
      
      // UPDATE STATUS
      var datenow=moment().format('D MMMM YYYY');
      this.firestore.doc(`data_konsumen/${this.id}`).update({
        status          :5,
        third_party_name : this.third_party_name_form_up_status,
        tanggal_keluar  :datenow,
      }).then((snapshot)=> {

        // =============================================================
        if (this.plt.is('cordova')) {
          this.sendwasttusfinis();
        }
        else
        {
          this.sendwasttusfinis();
        }       
        // =============================================================
        this.navCtrl.push(ArsipkonsumenPage);
        this.divstatus = 'modenormal';
        console.log("Sukses edit status data konsumen");
  
          this.loadingCtrl.dismiss();

          this.toastCtrl.create({
          message: 'Status Berhasil di Update ke SUCCESS',
          duration: 3000
          }).present();
      
      }).catch(e =>{
        console.log("gagal edit status data konsumen : ",e);
  
        this.loadingCtrl.dismiss();

        this.toastCtrl.create({
        message: 'Status Gagal di Update',
        duration: 3000
        }).present();
  
      })


    
    }).catch(e =>{
      console.log("gagal tambah data pembayaran : ",e);
      this.loadingCtrl.dismiss();

    })      

  }


  sendwasttusfinis()
  {
    if (this.bone == true && this.btwo == false)
    {
      this.id = this.datadetail.id_konsumen;
      this.datakons = this.datadetail
    }
    else if (this.bone == false && this.btwo == true)
    {
      this.id = this.datadetail2;
      this.datakons = this.datadetail21;
      
    }
    console.log("total price",this.totalprices)
    const jam = new Date().getHours();

    const pagi = jam >= 4 && jam <= 10;
    const siang = jam > 10 && jam <= 13;
    const sore = jam > 13 && jam <= 17;;
    const malam = jam > 17 && jam <= 24 || jam > 0 && jam <= 3 ;

    console.log("pagi : ",pagi,"| siang : ",siang,"| sore : ",sore ,"| malam : ",malam   );

    const nama_konsumen = this.datakons.nama_konsumen; // ambil data nama konsumen
    const first_name_konsumen = nama_konsumen.replace(/ .*/,''); // ambil nama pertama
    const first_name_konsumen_kapital = first_name_konsumen.charAt(0).toUpperCase() + first_name_konsumen.slice(1) // buat jadi kapital
    const fix_nama = first_name_konsumen_kapital;
    const no_WA = this.datakons.no_hp;// ambil data no telp
    const total_biaya = this.totalprices;

    console.log(fix_nama, "  ", no_WA);

    if (pagi == true && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20pagi%20*"+fix_nama+"*,%20Device%20anda%20sudah%20jadi,%20total%20biaya%20yang%20harus%20anda%20bayarkan%20sebesar%20Rp.%20"+total_biaya+".%20Silahkan%20konfirmasi%20ke%20kami%20jika%20akan%20mengambil%20Device.%20Terimakasih.";   
      window.open(url, '_blank');
      
    }
    else if (pagi == false && siang == true && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20siang%20*"+fix_nama+"*,%20Device%20anda%20sudah%20jadi,%20total%20biaya%20yang%20harus%20anda%20bayarkan%20sebesar%20Rp.%20"+total_biaya+".%20Silahkan%20konfirmasi%20ke%20kami%20jika%20akan%20mengambil%20Device.%20Terimakasih.";  
      window.open(url, '_blank');
    }
    else if (pagi == false && siang == false && sore == true && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20sore%20*"+fix_nama+"*,%20Device%20anda%20sudah%20jadi,%20total%20biaya%20yang%20harus%20anda%20bayarkan%20sebesar%20Rp.%20"+total_biaya+".%20Silahkan%20konfirmasi%20ke%20kami%20jika%20akan%20mengambil%20Device.%20Terimakasih.";  
      window.open(url, '_blank'); 
    }    
    else if (pagi == false && siang == false && sore == false && malam == true )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Selamat%20malam%20*"+fix_nama+"*,%20Device%20anda%20sudah%20jadi,%20total%20biaya%20yang%20harus%20anda%20bayarkan%20sebesar%20Rp.%20"+total_biaya+".%20Silahkan%20konfirmasi%20ke%20kami%20jika%20akan%20mengambil%20Device.%20Terimakasih.";
      window.open(url, '_blank');
    }    
    else if (pagi == false && siang == false && sore == false && malam == false )
    {
      let url = "https://wa.me/"+no_WA+"?text=*SERVICE%20UNNES*%20-%20Hallo%20*"+fix_nama+"*,%20Device%20anda%20sudah%20jadi,%20total%20biaya%20yang%20harus%20anda%20bayarkan%20sebesar%20Rp.%20"+total_biaya+".%20Silahkan%20konfirmasi%20ke%20kami%20jika%20akan%20mengambil%20Device.%20Terimakasih.";  
      window.open(url, '_blank');
    }
    

  }


}