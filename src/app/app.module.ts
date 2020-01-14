import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddtaskPage } from '../pages/addtask/addtask';
//////////////////////////////////
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule} from 'angularfire2'; 
import { FIREBASE_CREDENTIALS } from './credentials';
import { LoadingProvider } from '../providers/loading/loading';
import { DbFirebaseProvider } from '../providers/db-firebase/db-firebase';
import { ArsipkonsumenPage } from '../pages/arsipkonsumen/arsipkonsumen';
import { NgPipesModule } from 'ngx-pipes';
import { SearchPipe } from '../pipes/search/search';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { InvoicePage } from '../pages/invoice/invoice';
import { File } from '@ionic-native/file';
import { ScrollHideDirective } from '../directives/directives-scroll-hide/directives-scroll-hide';
import { FileOpener } from '@ionic-native/file-opener';
import { Network } from '@ionic-native/network';
import { RekappembayaranPage } from '../pages/rekappembayaran/rekappembayaran';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { BookingPage } from '../pages/booking/booking';
import { PricelistPage } from '../pages/pricelist/pricelist';
import { ChartsModule } from 'ng2-charts-x';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddtaskPage,
    ArsipkonsumenPage,
    RekappembayaranPage,
    PricelistPage,
    SearchPipe,
    InvoicePage,
    ScrollHideDirective,
    BookingPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFirestoreModule,
    NgPipesModule,
    BrMaskerModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddtaskPage,
    ArsipkonsumenPage,
    InvoicePage,
    RekappembayaranPage,
    PricelistPage,
    BookingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    DbFirebaseProvider,
    File,
    FileOpener,
    Network,
    // Push,
    Firebase,
    FcmProvider

    
  ]
})
export class AppModule {}
