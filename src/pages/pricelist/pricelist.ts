import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, Content, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Datakonsumen } from '../../models/datakonsumen';
import { LoadingProvider } from '../../providers/loading/loading';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-pricelist',
  templateUrl: 'pricelist.html',
})

export class PricelistPage {

  // datadetail: any;

  @ViewChild('pageTop') pageTop: Content;
  @ViewChild(Content) content: Content;


  @ViewChild('myInput') myInput: ElementRef;
  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }


  dataedits: { brand: any; type: any; pricelist: any; hd_capacity: string; led_size: string; keyboard_color: string; battery_oem_price: string; battery_original_price: string; };

  idpl: any;


  inputhardware: any;
  divstatus: string;
  taglist: string;
  dataisnull: boolean;

  datakonsumen: any;
  datakonsumeny: any;
  datakonsumenx: AngularFirestoreCollection<any>;


  segment: string;


  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 35 };
  headerScrollConfig2: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 51 };



  // ---------------------------------------------------------------------------------------------
  datainput = {} as Datakonsumen;
  dataedit = {} as Datakonsumen;
  datadetail = {} as Datakonsumen;
  // ---------------------------------------------------------------------------------------------


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) 
    {
        this.divstatus = "normal";

        // this.divstatus = "pricelist";

        this.taglist = "Keyboard";

        this.segment = "graph1";

        this.getdata();

        this.dataisnull = true;


        this.datainput.hardwaretype = "Keyboard";

        this.inputhardware = this.datainput.hardwaretype;

  
    }



  // =================================== ADD DATA  =============================================
    backtonormal()
    {
      this.divstatus = "normal";
      this.graph1();
    }
    addpricelist()
    {
      this.divstatus = "pricelist";
    }

    cekjenishardware($event)
    {
      console.log($event);
      this.inputhardware = $event;
    }

    save()
    {
        this.loadingCtrl.presentWithGif1(); //show loading
        console.log("tambah data konsumen baru ke firestore");

        var dk=this.datainput;

        var hardware = this.inputhardware;  

        var datenow=moment().format('D MMMM YYYY');

        /// adaptor, Hardisk
        if (hardware == 'Adaptor' )
        {
          var brand   = dk.brand  ;
          var type    = dk.type ;
          var price   = dk.pricelist;
          var capacity= "-";
          var size    = "-";
          var color   = "-";
          var oem     = "-";
          var ori     = "-";
        }

        else if (hardware == 'Hardisk' )
        {
          brand   = dk.brand  ;
          price   = dk.pricelist;
          capacity= dk.hd_capacity;
          size    = "-";
          color   = "-";
          type    = "-";
          oem     = "-";
          ori     = "-";
        }

        else if (hardware == 'LED' )
        {
          size    = dk.led_size;
          brand   = dk.brand  ;
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }

        else if (hardware == 'Keyboard' )
        {
          brand   = dk.brand  ;
          price   = dk.pricelist;
          color   = dk.keyboard_color;
          capacity= "-";
          size    = "-";
          type    = "-";
          oem     = "-";
          ori     = "-";
        }

        else if (hardware == 'Battery' )
        {
          brand   = dk.brand  ;
          type    = dk.type ;
          oem     = dk.battery_oem_price;
          ori     = dk.battery_original_price;
          capacity= "-";
          price   = "-";
          size    = "-";
          color   = "-";
        }

        else if (hardware == 'RAM' )
        {
          brand   = "-";
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          size    = "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }
        else if (hardware == 'Fan' )
        {
          brand   = "-";
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          size    = "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }
        else if (hardware == 'CDRoom' )
        {
          brand   = dk.brand  ;
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          size    = "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }
        else if (hardware == 'Flexible' )
        {
          brand   = "-";
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          size    = "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }
        else if (hardware == 'CMOSBattery' )
        {
          brand   = dk.brand  ;
          type    = dk.type ;
          price   = dk.pricelist;
          capacity= "-";
          size    = "-";
          color   = "-";
          oem     = "-";
          ori     = "-";
        }


      // -----------------------------------Random String---------------------------------------------
            var text = ""; 
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; 
            for (var i = 0; i < 5; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));   

            var id = text+"_"+hardware;

      // ---------------------------------------------------------------------------------------------
          // String id = this.firestore.doc("collection_name").collection.getId();
          this.firestore.doc(`price_list/${hardware}/list/${id}`).set({
            id_pl             :id,
            input_date        :datenow,
            brand             :brand,
            type              :type,
            hd_capacity       :capacity,
            pricelist         :price,
            led_size          :size,  
            keyboard_color    :color,
            battery_oem_price :oem,
            battery_original_price :ori


          }).then((snapshot)=> {
            this.divstatus = "normal";
            console.log("Sukses tambah data ",hardware);

            console.log(dk);

            this.loadingCtrl.dismiss();
            this.toastCtrl.create({
              message: `Sukses Tambah Data ${hardware}`,
              duration: 3000
          }).present();
          
        }).catch(e =>{
          console.log("gagal tambah data ",hardware," : ",e);

          this.loadingCtrl.dismiss();
          this.toastCtrl.create({
            message: `Gagal Tambah Data ${hardware}`,
            duration: 3000
        }).present();

        })      

    }


  // =================================== SHOW DATA  =============================================
    graph1()
    {
      this.segment = "graph1";
      this.getdata();
    }
    graph2()
    {
      this.segment = "graph2"
      this.getdata();
    }

    back()
    {
        this.navCtrl.push(HomePage); 
    }

    getdata()
    {
      var hardware = this.taglist;
      if (this.segment == "graph1" && hardware != "Battery")
      {


        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('pricelist', 'asc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });


      }
      else if (this.segment == "graph2" && hardware != "Battery")
      {

        
        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('pricelist', 'desc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });
      }
      else if (this.segment == "graph1" && hardware == "Battery")
      {


        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('battery_original_price', 'asc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });


      }
      else if (this.segment == "graph2" && hardware == "Battery")
      {

        
        this.datakonsumenx = this.firestore.collection<any>(`price_list/${hardware}/list/`,ref => ref.orderBy('battery_original_price', 'desc'));
        this.datakonsumeny=this.datakonsumenx.valueChanges();
        this.datakonsumeny.subscribe(jk=>{
            this.datakonsumen = jk;
            // console.table(jk);
            this.datanullornot();
            this.content.scrollToTop();
          });
      }


    }

    datanullornot()
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

    async filterlist() 
    {
        const alert = await this.alertCtrl.create({
          title: 'Price List Of',
          inputs: [
            {
              name: 'Keyboard',
              type: 'radio',
              label: 'Keyboard',
              value: 'Keyboard',
              checked: true
            },
            {
              name: 'LED',
              type: 'radio',
              label: 'LED',
              value: 'LED'
            },
            {
              name: 'Adaptor',
              type: 'radio',
              label: 'Adaptor',
              value: 'Adaptor'
            },
            {
              name: 'Hardisk',
              type: 'radio',
              label: 'Hardisk',
              value: 'Hardisk'
            },
            {
              name: 'Battery',
              type: 'radio',
              label: 'Battery',
              value: 'Battery'
            },
            {
              name: 'RAM',
              type: 'radio',
              label: 'RAM',
              value: 'RAM'
            },
            {
              name: 'Fan',
              type: 'radio',
              label: 'Fan',
              value: 'Fan'
            },
            {
              name: 'CDRoom',
              type: 'radio',
              label: 'CD Room',
              value: 'CDRoom'
            },
            {
              name: 'Flexible',
              type: 'radio',
              label: 'Flexible',
              value: 'Flexible'
            },
            {
              name: 'CMOSBattery',
              type: 'radio',
              label: 'CMOS Battery',
              value: 'CMOSBattery'
            },


          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: data => {
                console.log(data);

                this.taglist = data;
                this.getdata();

                this.inputhardware = data;
                
              }
            }
          ]
        });
    
        await alert.present();
    }

  // =================================== EDIT DATA  =============================================
     

     edit(x)
     {
        var dk = x;
        this.divstatus = "modeeditdata";

        this.idpl = x.id_pl;

       /// adaptor, Hardisk
       if (this.inputhardware == 'Adaptor' )
       {
         this.dataedit.brand   = dk.brand  ;
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

       else if (this.inputhardware == 'Hardisk' )
       {
        this.dataedit.brand   = dk.brand  ;
        this.dataedit.pricelist   = dk.pricelist;
        this.dataedit.hd_capacity= dk.hd_capacity;
        this.dataedit.led_size    = "-";
        this.dataedit.keyboard_color   = "-";
        this.dataedit.type   = "-";
        this.dataedit.battery_oem_price     = "-";
        this.dataedit.battery_original_price     = "-";
       }

       else if (this.inputhardware == 'LED' )
       {
        this.dataedit.led_size    = dk.led_size;
        this.dataedit.brand   = dk.brand  ;
        this.dataedit.type    = dk.type ;
        this.dataedit.pricelist   = dk.pricelist;
        this.dataedit.hd_capacity= "-";
        this.dataedit.keyboard_color   = "-";
        this.dataedit.battery_oem_price     = "-";
        this.dataedit.battery_original_price      = "-";
       }

       else if (this.inputhardware == 'Keyboard' )
       {
        this.dataedit.brand   = dk.brand  ;
        this.dataedit.pricelist   = dk.pricelist;
        this.dataedit.keyboard_color   = dk.keyboard_color;
        this.dataedit.hd_capacity= "-";
        this.dataedit.led_size    = "-";
        this.dataedit.type    = "-";
        this.dataedit.battery_oem_price     = "-";
        this.dataedit.battery_original_price      = "-";
       }

       else if (this.inputhardware == 'Battery' )
       {
        this.dataedit.brand   = dk.brand  ;
        this.dataedit.type    = dk.type ;
        this.dataedit.battery_oem_price    = dk.battery_oem_price;
        this.dataedit.battery_original_price      = dk.battery_original_price;
        this.dataedit.hd_capacity= "-";
        this.dataedit.pricelist   = "-";
        this.dataedit.led_size    = "-";
        this.dataedit.keyboard_color   = "-";
       }

       else if (this.inputhardware == 'RAM' )
       {
         this.dataedit.brand   = "-";
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

       else if (this.inputhardware == 'Fan' )
       {
         this.dataedit.brand   = "-";
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

       else if (this.inputhardware == 'CDRoom' )
       {
         this.dataedit.brand   = dk.brand  ;
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

       else if (this.inputhardware == 'Flexible' )
       {
         this.dataedit.brand   = "-";
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

       else if (this.inputhardware == 'CMOSBattery' )
       {
         this.dataedit.brand   = dk.brand  ;
         this.dataedit.type    = dk.type ;
         this.dataedit.pricelist   = dk.pricelist;
         this.dataedit.hd_capacity= "-";
         this.dataedit.led_size    = "-";
         this.dataedit.keyboard_color   = "-";
         this.dataedit.battery_oem_price     = "-";
         this.dataedit.battery_original_price      = "-";   
       }

     }

     saveeditdata()
     {
      //  console.log(this.editdata);
      //  console.log(this.editdata.Brand);
      //  console.log(this.idpl);

       if (this.inputhardware == 'Adaptor' )
       {
         this.dataedits = {
            brand           : this.dataedit.brand,
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }

       else if (this.inputhardware == 'Hardisk' )
       {
        this.dataedits = {
            brand           : this.dataedit.brand  ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : this.dataedit.hd_capacity,
            led_size        : "-",
            keyboard_color  : "-",
            type            : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
        }
       }

       else if (this.inputhardware == 'LED' )
       {
        this.dataedits = {
            led_size        : this.dataedit.led_size,
            brand           : this.dataedit.brand ,
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
        }
       }

       else if (this.inputhardware == 'Keyboard' )
       {
        this.dataedits = {
            brand           : this.dataedit.brand  ,
            pricelist       : this.dataedit.pricelist,
            keyboard_color  : this.dataedit.keyboard_color,
            hd_capacity     : "-",
            led_size        : "-",
            type            : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
        }
       }

       else if (this.inputhardware == 'Battery' )
       {
        this.dataedits = {
            brand           : this.dataedit.brand  ,
            type            : this.dataedit.type ,
            battery_oem_price       : this.dataedit.battery_oem_price,
            battery_original_price  : this.dataedit.battery_original_price,
            hd_capacity     : "-",
            pricelist       : "-",
            led_size        : "-",
            keyboard_color  : "-",
        }
       }

       else if (this.inputhardware == 'RAM' )
       {
         this.dataedits = {
            brand           : "-",
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }

       else if (this.inputhardware == 'Fan' )
       {
         this.dataedits = {
            brand           : "-",
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }

       else if (this.inputhardware == 'CDRoom' )
       {
         this.dataedits = {
            brand           : this.dataedit.brand,
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }

       else if (this.inputhardware == 'Flexible' )
       {
         this.dataedits = {
            brand           : "-",
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }

       else if (this.inputhardware == 'CMOSBattery' )
       {
         this.dataedits = {
            brand           : this.dataedit.brand,
            type            : this.dataedit.type ,
            pricelist       : this.dataedit.pricelist,
            hd_capacity     : "-",
            led_size        : "-",
            keyboard_color  : "-",
            battery_oem_price       : "-",
            battery_original_price  : "-",
         }
       }


       this.firestore.doc(`price_list/${this.inputhardware}/list/${this.idpl}`).update(
          this.dataedits
          ).then((snapshot)=> {
              this.dataedits

            this.divstatus ="normal";
            // this.navCtrl.push(ArsipkonsumenPage);
            console.log("Sukses edit data");

            this.loadingCtrl.dismiss();
            this.toastCtrl.create({
              message: 'Sukses Edit Data',
              duration: 3000
          }).present();
          
        }).catch(e =>{
          console.log("gagal edit data : ",e);

          this.loadingCtrl.dismiss();
          this.toastCtrl.create({
            message: 'Gagal Edit Data',
            duration: 3000
        }).present();

        }) 

     }


  // =================================== DATAIL DATA  =============================================
     detaildata(x) 
     {

      // this.content.scrollToTop();
    
      this.datadetail= x;

      this.divstatus = 'modedetaildata';

     }
     
     closedetaildata()
     {
       this.divstatus = 'normal'
     }
  // =================================== DELETE DATA ==========================================

      delete(x)
      {
        this.idpl = x.id_pl;
        const alert: Alert = this.alertCtrl.create({
          message: 'Delete This Pricelist ?',
          buttons: [
            { text: 'No', role: 'cancel' },
            {
              text: 'Yes',
              handler: data => 
              {
                this.loadingCtrl.presentWithGif1(); //show loading
                this.firestore.doc(`price_list/${this.inputhardware}/list/${this.idpl}`).delete().then( _=>
                {                     
                  console.log("Sukses hapus data");
                  this.loadingCtrl.dismiss();
                  this.toastCtrl.create({
                    message: 'Data Berhasil Dihapus',
                    duration: 3000
                  }).present();

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



}
