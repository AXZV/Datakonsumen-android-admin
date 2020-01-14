import { Component } from '@angular/core';
import { Platform, ToastController, AlertController, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { HomePage } from '../pages/home/home';
import { Network } from '@ionic-native/network';
import { LoadingProvider } from '../providers/loading/loading';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
// import { AddtaskPage } from '../pages/addtask/addtask';
// import { ArsipkonsumenPage } from '../pages/arsipkonsumen/arsipkonsumen';
// import { PricelistPage } from '../pages/pricelist/pricelist';
import { HomePage } from '../pages/home/home';
// import { AddtaskPage } from '../pages/addtask/addtask';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  // rootPage:any = PricelistPage;
  // rootPage:any = BookingPage;
  // rootPage:any = ArsipkonsumenPage;
  // rootPage:any = AddtaskPage;
  // rootPage:any = RekappembayaranPage;
  // rootPage:any = GrafikbisnisPage;



  // ========================================================================================

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    private network: Network,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingProvider,
    fcm: FcmProvider) {


  // ================================ check connection ===================================

      let alertoffline = this.alertCtrl.create({

        message: 'Device is offline, Some function may not be work, Please check your connection :(',
        buttons: ['Dismiss'],
      });

      this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :(');
        alertoffline.present();

        this.loadingCtrl.dismiss();

        this.toastCtrl.create({
          message: 'Device is offline :(',
          duration: 3000
        }).present();
        
      });

      this.network.onConnect().subscribe(() => {
        console.log('network connected!');

        alertoffline.dismiss();

        this.toastCtrl.create({
          message: 'Device is online :)',
          duration: 3000
        }).present();
      });


  // ====================== exit button ===================================
  

      // platform.registerBackButtonAction(() => {
      //   if (this.counter == 0) {
      //     this.counter++;
      //     this.presentToast();
      //     setTimeout(() => { this.counter = 0 }, 3000)
      //   } else {
      //     platform.exitApp();
      //   }
      // }, 0);

  // =====================================================================================
      


    platform.ready().then(() => {

      // statusBar.styleDefault();
      splashScreen.hide();


       // Get a FCM token
       fcm.getToken()

       // Listen to incoming messages
       fcm.listenToNotifications().pipe(
         tap(msg => {
           // show a toast
           const toast = toastCtrl.create({
             message: msg.body,
             duration: 5000
           });
           toast.present();

           // show allert
           let alert = this.alertCtrl.create({
            title: 'New Customer Booking',
            message: msg.body,
            buttons: ['Dismiss']
          });
          alert.present();


         })
       )
       .subscribe()




    });



  } ////


  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: "Press again to exit",
  //     duration: 3000,
  //     position: "middle",
  //     cssClass: "toastexit",
  //   });
  //   toast.present();
  // }



}

