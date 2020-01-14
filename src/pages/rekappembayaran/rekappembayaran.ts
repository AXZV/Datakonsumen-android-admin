import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { ScrollHideConfig } from '../../directives/directives-scroll-hide/directives-scroll-hide';
import { BaseChartDirective } from 'ng2-charts-x';



@IonicPage()
@Component({
  selector: 'page-rekappembayaran',
  templateUrl: 'rekappembayaran.html',
})
export class RekappembayaranPage {
    segment: string;
    datenowYY: string;
    datenowMM: string;
    averageincome: any;
    grandtotal: any;
    
    array_semester_1: any[];
    array_semester_2: any[];
    
    jan_array: any;
    feb_array: any;
    mar_array: any;
    apr_array: any;
    may_array: any;
    jun_array: any;
    jul_array: any;
    aug_array: any;
    sept_array: any;
    oct_array: any;
    nov_array: any;
    des_array: any;


    label1: any;
    label2: any;

    public myChart: Chart

  ////////////////////////////////////  #1  //////////////////////////////////////////

  filterdate = moment().format('YYYY');
  @ViewChild('timePicker')



  @ViewChild('lineCanvassemester1') lineCanvassemester1;
  lineChartsemester1: any;

  @ViewChild('lineCanvassemester2') lineCanvassemester2;
  lineChartsemester2: any;


    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;


  datakonsumen: any;
  datakonsumeny: any;
  datakonsumenx: AngularFirestoreCollection<any>;
  

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 35 };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public loadingCtrl:LoadingProvider,
  ) {

        this.segment = 'graph1';

        if (this.lineChartsemester1) 
        {
            // this.lineChartsemester1.clear();
            console.log("Red");
            // this.lineChartsemester1.destroy(); 
            // this.lineChartsemester1.update();
        }

        
        
    }
    graph1()
    {
        this.filterdate = moment().format('YYYY');
        this.segment = 'graph1';
        this.ionViewDidLoad();
        
    }
    graph2()
    {
        this.filterdate = moment().format('YYYY');
        this.segment = 'graph2';
        this.ionViewDidLoad();      
    }
    graph3()
    {
        this.filterdate = moment().format('YYYY');
        this.segment = 'graph3';
        this.ionViewDidLoad();      
    }


    ionViewDidLoad() {
        ////////////////////////////////////  #2  //////////////////////////////////////////
        this.getdata();
        this.loadingCtrl.presentWithGif1(); //show loading
    }

    back()
    {
    this.navCtrl.push(HomePage); 
    }

    ////////////////////////////////////  #6  //////////////////////////////////////////
    updateMyDate($event) {

        var year: string = $event.year; //output number
        var years = year.toString(); // need to convert to string

        this.filterdate = years;

        this.getdata();

        // console.log(this.segment)

    }

    ////////////////////////////////////  #3  //////////////////////////////////////////
    ////////////////////////////////////  #7  //////////////////////////////////////////
    getdata()
    {
        if (this.segment == 'graph1')
        {  
            this.datakonsumenx = this.firestore.collection<any>('data_pembayaran_konsumen',ref => ref.where('datenowY', '==', this.filterdate));
            this.datakonsumeny=this.datakonsumenx.valueChanges();
            this.datakonsumeny.subscribe(jk=>{
                this.loadingCtrl.dismiss();//STOP loading
                this.datakonsumen = jk;
                this.checkdata();
                // console.table(this.datakonsumen)
            }, err =>{
                console.log(err);
                this.loadingCtrl.dismiss();//STOP loading
            });
        } 
        
        if (this.segment == 'graph2')
        {  
            this.datakonsumenx = this.firestore.collection<any>('data_pembayaran_konsumen',ref => ref.where('datenowY', '==', this.filterdate).where('third_party_total_payment', '>', ''));
            this.datakonsumeny=this.datakonsumenx.valueChanges();
            this.datakonsumeny.subscribe(jk=>{
                this.loadingCtrl.dismiss();//STOP loading
                this.datakonsumen = jk;
                this.checkdatasegment2();
                // console.table(this.datakonsumen)
            }, err =>{
                console.log(err);
                this.loadingCtrl.dismiss();//STOP loading
            });
        }
        
        if (this.segment == 'graph3')
        {  
            this.datakonsumenx = this.firestore.collection<any>('data_pembayaran_konsumen',ref => ref.where('datenowY', '==', this.filterdate));
            this.datakonsumeny=this.datakonsumenx.valueChanges();
            this.datakonsumeny.subscribe(jk=>{
                this.loadingCtrl.dismiss();//STOP loading
                this.datakonsumen = jk;
                this.checkdatasegment3();
                // console.table(this.datakonsumen)
            }, err =>{
                console.log(err);
                this.loadingCtrl.dismiss();//STOP loading
            });
        }

    }

    ////////////////////////////////////  #4  //////////////////////////////////////////
    ////////////////////////////////////  #8  //////////////////////////////////////////

    checkdata()
    {
        // this.loadingCtrl.dismiss();//STOP loading

        if (this.datakonsumen == null )
        {
            this.array_semester_1 = [0,0,0,0,0,0];
            this.array_semester_2 = [0,0,0,0,0,0];
            this.generategraph();
        }
        else if (this.datakonsumen != null)
        {
            var data = this.datakonsumen;

            ////////////////////////////////   January   /////////////////////////////////////

            var jan  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'January';
            });
            if (jan == null )
            {
                this.jan_array = 0;
            }
            else if (jan != null)
            {
                var jannonmoneyformat= jan.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var jannnumber = jannonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var jansumpay = jannnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jan_array = jansumpay;

            }

            ////////////////////////////////   February   /////////////////////////////////////

            var feb  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'February';
            });
            if (feb == null )
            {
                this.feb_array = 0;
            }
            else if (feb != null)
            {
                var febnonmoneyformat= feb.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var febnnumber = febnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var febsumpay = febnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.feb_array = febsumpay;

            }

            ////////////////////////////////   March   /////////////////////////////////////

            var mar = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'March';
            });
            if (mar == null )
            {
                this.mar_array = 0;
            }
            else if (mar != null)
            {
                var marnonmoneyformat= mar.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var marnnumber = marnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var marsumpay = marnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.mar_array = marsumpay;

            }
            
            ////////////////////////////////   April   /////////////////////////////////////

            var apr  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'April';
            });
            if (apr == null )
            {
                this.apr_array = 0;
            }
            else if (apr != null)
            {
                var aprnonmoneyformat= apr.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var aprnnumber = aprnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var aprsumpay = aprnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.apr_array = aprsumpay;

            }

            ////////////////////////////////   May   /////////////////////////////////////

            var may  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'May';
            });
            if (may == null )
            {
                this.may_array = 0;
            }
            else if (may != null)
            {
                var maynonmoneyformat= may.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var maynnumber = maynonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var maysumpay = maynnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.may_array = maysumpay;

            }

            ////////////////////////////////  June   /////////////////////////////////////

            var jun  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'June';
            });
            if (jun == null )
            {
                this.jun_array = 0;
            }
            else if (jun != null)
            {
                var junnonmoneyformat= jun.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var junnumber = junnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var junsumpay = junnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jun_array = junsumpay;

            }

            ////////////////////////////////  July   /////////////////////////////////////

            var jul  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'July';
            });
            if (jul == null )
            {
                this.jul_array = 0;
            }
            else if (jul != null)
            {
                var julnonmoneyformat= jul.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var julnumber = julnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var julsumpay = julnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jul_array = julsumpay;

            }

            ////////////////////////////////   August  /////////////////////////////////////

            var aug  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'August';
            });
            if (aug == null )
            {
                this.aug_array = 0;
            }
            else if (aug != null)
            {
                var augnonmoneyformat= aug.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var augnumber = augnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var augsumpay = augnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.aug_array = augsumpay;

            }
            ////////////////////////////////   September  /////////////////////////////////////

            var sept  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'September';
            });
            if (sept == null )
            {
                this.sept_array = 0;
            }
            else if (sept != null)
            {
                var septnonmoneyformat= sept.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var septnumber = septnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var septsumpay = septnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.sept_array = septsumpay;

            }

            ////////////////////////////////  October   /////////////////////////////////////

            var oct  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'October';
            });
            if (oct == null )
            {
                this.oct_array = 0;
            }
            else if (oct != null)
            {
                var octnonmoneyformat= oct.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var octnumber = octnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var octsumpay = octnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.oct_array = octsumpay;

            }

            ////////////////////////////////  November   /////////////////////////////////////

            var nov  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'November';
            });
            if (nov == null )
            {
                this.nov_array = 0;
            }
            else if (nov != null)
            {
                var novnonmoneyformat= nov.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var novnumber = novnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var novsumpay = novnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.nov_array = novsumpay;

            }

            ////////////////////////////////  December  /////////////////////////////////////

            var des  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'December';
            });
            if (des == null )
            {
                this.des_array = 0;
            }
            else if (des != null)
            {
                var desnonmoneyformat= des.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var desnumber = desnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var dessumpay = desnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.des_array = dessumpay;

            }

            
            this.array_semester_1= [this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array]
            this.array_semester_2= [this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array]


        ////////////////////////////////////////  GRAND TOTAL  //////////////////////////////////////

            var total= this.jan_array + this.feb_array + this.mar_array + this.apr_array + this.may_array + this.jun_array + this.jul_array + this.aug_array + this.sept_array + this.oct_array + this.nov_array + this.des_array;
            

             // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan = total;    
            var	number_string = bilangan.toString(),
            sisa 	= number_string.length % 3,
            totalpricerupiah 	= number_string.substr(0, sisa),
            ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
            var separator = sisa ? '.' : '';
            totalpricerupiah += separator + ribuan.join('.');
            }
            this.grandtotal=totalpricerupiah; /// total price rupiah final
            

        ////////////////////////////////////////  AVERAGE INCOME  //////////////////////////////////////

            /// arrray harus dibalik bulanya agar dapat di slice() dengan sempuran
            var array_month_rev= [

                this.des_array ,
                this.nov_array ,
                this.oct_array ,
                this.sept_array ,
                this.aug_array ,
                this.jul_array ,
                this.jun_array ,
                this.may_array ,
                this.apr_array ,
                this.mar_array ,
                this.feb_array ,
                this.jan_array ,
                       
            ]
            // console.table(array_month_rev);
            // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            /// mencari jumlah potongan yang harus dilakukan pada array_month_rev
            var datenowM=moment().format('MMMM');
            var datenowY=moment().format('YYYY');
            this.datenowMM=datenowM;
            this.datenowYY=datenowY;
            // console.log(this.filterdate)
            
            if ( datenowM == "January" && this.filterdate == datenowY)
            {
                var vv = 11;
                var vx = 1;
            }
            else if(datenowM == "February" && this.filterdate == datenowY)
            {
                vv = 10;  
                vx = 2 
            }
            else if(datenowM == "March" && this.filterdate == datenowY)
            {
                vv = 9; 
                vx = 3  
            }
            else if(datenowM == "April" && this.filterdate == datenowY)
            {
                vv = 8; 
                vx = 4  
            }
            else if(datenowM == "May" && this.filterdate == datenowY)
            {
                vv = 7;
                vx = 5   
            }
            else if(datenowM == "June" && this.filterdate == datenowY)
            {
                vv = 6;
                vx = 6   
            }
            else if(datenowM == "July" && this.filterdate == datenowY)
            {
                vv = 5;
                vx = 7   
            }
            else if(datenowM == "August" && this.filterdate == datenowY)
            {
                vv = 4;
                vx = 8   
            }
            else if(datenowM == "September" && this.filterdate == datenowY)
            {
                vv = 3;
                vx = 9   
            }
            else if(datenowM == "October" && this.filterdate == datenowY)
            {
                vv = 2;
                vx = 10   
            }
            else if(datenowM == "November" && this.filterdate == datenowY)
            {
                vv = 1;
                vx = 11   
            }
            else if(datenowM == "December" && this.filterdate == datenowY)
            {
                vv = 0;
                vx = 12   
            }
            else if(this.filterdate < datenowY)
            {
                vv = 0;
                vx = 12   
            }

            // motong array bersarkan bulan ini
            var slicemonth =array_month_rev.slice(vv);

            // jumlahkan value dalam array
            var sum = slicemonth.reduce(function(a, b) { return a + b; }, 0);

            // cari rata-rata
            var total_bagi_bulan = sum/vx;

            //membulatkan bilangan hasil penghitungan rata-rata
            var averageincome1 = Math.round(total_bagi_bulan); 

            // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan1 = averageincome1;    
            var	number_string1 = bilangan1.toString(),
            sisa1 	= number_string1.length % 3,
            totalpricerupiah1 	= number_string1.substr(0, sisa1),
            ribuan1 	= number_string1.substr(sisa1).match(/\d{3}/g);
            if (ribuan1) {
            var separator1 = sisa1 ? '.' : '';
            totalpricerupiah1 += separator1 + ribuan1.join('.');
            }
            this.averageincome=totalpricerupiah1; /// total price rupiah final

            


            // var maxincome = Math.max(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array);
            // console.log("max i",maxincome);

            // var minincome = Math.min(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array)
            // console.log("min i",minincome);
            
            
            this.generategraph();
            

        }
    }

    checkdatasegment2()
    {
        // this.loadingCtrl.dismiss();//STOP loading

        if (this.datakonsumen == null )
        {
            this.array_semester_1 = [0,0,0,0,0,0];
            this.array_semester_2 = [0,0,0,0,0,0];
            this.generategraph();
        }
        else if (this.datakonsumen != null)
        {
            var data = this.datakonsumen;

            ////////////////////////////////   January   /////////////////////////////////////

            var jan  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'January';
            });
            if (jan == null )
            {
                this.jan_array = 0;
            }
            else if (jan != null)
            {
                var jannonmoneyformat= jan.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var jannnumber = jannonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var jansumpay = jannnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jan_array = jansumpay;

            }

            ////////////////////////////////   February   /////////////////////////////////////

            var feb  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'February';
            });
            if (feb == null )
            {
                this.feb_array = 0;
            }
            else if (feb != null)
            {
                var febnonmoneyformat= feb.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var febnnumber = febnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var febsumpay = febnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.feb_array = febsumpay;

            }

            ////////////////////////////////   March   /////////////////////////////////////

            var mar = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'March';
            });
            if (mar == null )
            {
                this.mar_array = 0;
            }
            else if (mar != null)
            {
                var marnonmoneyformat= mar.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var marnnumber = marnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var marsumpay = marnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.mar_array = marsumpay;

            }
            
            ////////////////////////////////   April   /////////////////////////////////////

            var apr  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'April';
            });
            if (apr == null )
            {
                this.apr_array = 0;
            }
            else if (apr != null)
            {
                var aprnonmoneyformat= apr.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var aprnnumber = aprnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var aprsumpay = aprnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.apr_array = aprsumpay;

            }

            ////////////////////////////////   May   /////////////////////////////////////

            var may  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'May';
            });
            if (may == null )
            {
                this.may_array = 0;
            }
            else if (may != null)
            {
                var maynonmoneyformat= may.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var maynnumber = maynonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var maysumpay = maynnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.may_array = maysumpay;

            }

            ////////////////////////////////  June   /////////////////////////////////////

            var jun  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'June';
            });
            if (jun == null )
            {
                this.jun_array = 0;
            }
            else if (jun != null)
            {
                var junnonmoneyformat= jun.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var junnumber = junnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var junsumpay = junnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jun_array = junsumpay;

            }

            ////////////////////////////////  July   /////////////////////////////////////

            var jul  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'July';
            });
            if (jul == null )
            {
                this.jul_array = 0;
            }
            else if (jul != null)
            {
                var julnonmoneyformat= jul.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var julnumber = julnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var julsumpay = julnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jul_array = julsumpay;

            }

            ////////////////////////////////   August  /////////////////////////////////////

            var aug  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'August';
            });
            if (aug == null )
            {
                this.aug_array = 0;
            }
            else if (aug != null)
            {
                var augnonmoneyformat= aug.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var augnumber = augnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var augsumpay = augnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.aug_array = augsumpay;

            }
            ////////////////////////////////   September  /////////////////////////////////////

            var sept  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'September';
            });
            if (sept == null )
            {
                this.sept_array = 0;
            }
            else if (sept != null)
            {
                var septnonmoneyformat= sept.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var septnumber = septnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var septsumpay = septnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.sept_array = septsumpay;

            }

            ////////////////////////////////  October   /////////////////////////////////////

            var oct  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'October';
            });
            if (oct == null )
            {
                this.oct_array = 0;
            }
            else if (oct != null)
            {
                var octnonmoneyformat= oct.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var octnumber = octnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var octsumpay = octnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.oct_array = octsumpay;

            }

            ////////////////////////////////  November   /////////////////////////////////////

            var nov  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'November';
            });
            if (nov == null )
            {
                this.nov_array = 0;
            }
            else if (nov != null)
            {
                var novnonmoneyformat= nov.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.third_party_total_payment;
                var pay = x.split(".").join("");
                return pay;
                });

                var novnumber = novnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var novsumpay = novnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.nov_array = novsumpay;

            }

            ////////////////////////////////  December  /////////////////////////////////////

            var des  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'December';
            });
            if (des == null )
            {
                this.des_array = 0;
            }
            else if (des != null)
            {
                var desnonmoneyformat= des.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });

                var desnumber = desnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var dessumpay = desnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.des_array = dessumpay;

            }

            
            this.array_semester_1= [this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array]
            this.array_semester_2= [this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array]


        ////////////////////////////////////////  GRAND TOTAL  //////////////////////////////////////

            var total= this.jan_array + this.feb_array + this.mar_array + this.apr_array + this.may_array + this.jun_array + this.jul_array + this.aug_array + this.sept_array + this.oct_array + this.nov_array + this.des_array;
            

             // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan = total;    
            var	number_string = bilangan.toString(),
            sisa 	= number_string.length % 3,
            totalpricerupiah 	= number_string.substr(0, sisa),
            ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
            var separator = sisa ? '.' : '';
            totalpricerupiah += separator + ribuan.join('.');
            }
            this.grandtotal=totalpricerupiah; /// total price rupiah final
            

        ////////////////////////////////////////  AVERAGE INCOME  //////////////////////////////////////

            /// arrray harus dibalik bulanya agar dapat di slice() dengan sempuran
            var array_month_rev= [

                this.des_array ,
                this.nov_array ,
                this.oct_array ,
                this.sept_array ,
                this.aug_array ,
                this.jul_array ,
                this.jun_array ,
                this.may_array ,
                this.apr_array ,
                this.mar_array ,
                this.feb_array ,
                this.jan_array ,
                       
            ]
            // console.table(array_month_rev);
            // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            /// mencari jumlah potongan yang harus dilakukan pada array_month_rev
            var datenowM=moment().format('MMMM');
            var datenowY=moment().format('YYYY');
            this.datenowMM=datenowM;
            this.datenowYY=datenowY;
            // console.log(this.filterdate)
            
            if ( datenowM == "January" && this.filterdate == datenowY)
            {
                var vv = 11;
                var vx = 1;
            }
            else if(datenowM == "February" && this.filterdate == datenowY)
            {
                vv = 10;  
                vx = 2 
            }
            else if(datenowM == "March" && this.filterdate == datenowY)
            {
                vv = 9; 
                vx = 3  
            }
            else if(datenowM == "April" && this.filterdate == datenowY)
            {
                vv = 8; 
                vx = 4  
            }
            else if(datenowM == "May" && this.filterdate == datenowY)
            {
                vv = 7;
                vx = 5   
            }
            else if(datenowM == "June" && this.filterdate == datenowY)
            {
                vv = 6;
                vx = 6   
            }
            else if(datenowM == "July" && this.filterdate == datenowY)
            {
                vv = 5;
                vx = 7   
            }
            else if(datenowM == "August" && this.filterdate == datenowY)
            {
                vv = 4;
                vx = 8   
            }
            else if(datenowM == "September" && this.filterdate == datenowY)
            {
                vv = 3;
                vx = 9   
            }
            else if(datenowM == "October" && this.filterdate == datenowY)
            {
                vv = 2;
                vx = 10   
            }
            else if(datenowM == "November" && this.filterdate == datenowY)
            {
                vv = 1;
                vx = 11   
            }
            else if(datenowM == "December" && this.filterdate == datenowY)
            {
                vv = 0;
                vx = 12   
            }
            else if(this.filterdate < datenowY)
            {
                vv = 0;
                vx = 12   
            }

            // motong array bersarkan bulan ini
            var slicemonth =array_month_rev.slice(vv);

            // jumlahkan value dalam array
            var sum = slicemonth.reduce(function(a, b) { return a + b; }, 0);

            // cari rata-rata
            var total_bagi_bulan = sum/vx;

            //membulatkan bilangan hasil penghitungan rata-rata
            var averageincome1 = Math.round(total_bagi_bulan); 

            // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan1 = averageincome1;    
            var	number_string1 = bilangan1.toString(),
            sisa1 	= number_string1.length % 3,
            totalpricerupiah1 	= number_string1.substr(0, sisa1),
            ribuan1 	= number_string1.substr(sisa1).match(/\d{3}/g);
            if (ribuan1) {
            var separator1 = sisa1 ? '.' : '';
            totalpricerupiah1 += separator1 + ribuan1.join('.');
            }
            this.averageincome=totalpricerupiah1; /// total price rupiah final

            


            // var maxincome = Math.max(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array);
            // console.log("max i",maxincome);

            // var minincome = Math.min(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array)
            // console.log("min i",minincome);
            
            
            this.generategraph();
            

        }
    }

    checkdatasegment3()
    {
        // this.loadingCtrl.dismiss();//STOP loading
        // console.log(this.datakonsumen)
        if (this.datakonsumen == null )
        {
            this.array_semester_1 = [0,0,0,0,0,0];
            this.array_semester_2 = [0,0,0,0,0,0];
            this.generategraph();
        }
        else if (this.datakonsumen != null)
        {
            var data = this.datakonsumen;

            ////////////////////////////////   January   /////////////////////////////////////

            var jan  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'January';
            });
            if (jan == null )
            {
                this.jan_array = 0;
            }
            else if (jan != null)
            {
                var jannonmoneyformat= jan.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var jannonmoneyformat2= jan.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });


                var jannnumber = jannonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var jannnumber2 = jannonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var jansumpay = jannnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var jansumpay2 = jannnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jan_array = jansumpay-jansumpay2;


            }

            ////////////////////////////////   February   /////////////////////////////////////

            var feb  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'February';
            });
            if (feb == null )
            {
                this.feb_array = 0;
            }
            else if (feb != null)
            {
                var febnonmoneyformat= feb.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var febnonmoneyformat2= feb.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });


                var febnnumber = febnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var febnnumber2 = febnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var febsumpay = febnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var febsumpay2 = febnnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.feb_array = febsumpay-febsumpay2;

            }

            ////////////////////////////////   March   /////////////////////////////////////

            var mar = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'March';
            });
            if (mar == null )
            {
                this.mar_array = 0;
            }
            else if (mar != null)
            {
                var marnonmoneyformat= mar.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var marnonmoneyformat2= mar.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var marnnumber = marnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var marnnumber2 = marnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var marsumpay = marnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var marsumpay2 = marnnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.mar_array = marsumpay-marsumpay2;

            }
            
            ////////////////////////////////   April   /////////////////////////////////////

            var apr  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'April';
            });
            if (apr == null )
            {
                this.apr_array = 0;
            }
            else if (apr != null)
            {
                var aprnonmoneyformat= apr.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var aprnonmoneyformat2= apr.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var aprnnumber = aprnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var aprnnumber2 = aprnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var aprsumpay = aprnnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var aprsumpay2 = aprnnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.apr_array = aprsumpay-aprsumpay2;

            }

            ////////////////////////////////   May   /////////////////////////////////////

            var may  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'May';
            });
            if (may == null )
            {
                this.may_array = 0;
            }
            else if (may != null)
            {
                var maynonmoneyformat= may.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var maynonmoneyformat2= may.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var maynnumber = maynonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var maynnumber2 = maynonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var maysumpay = maynnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var maysumpay2 = maynnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.may_array = maysumpay-maysumpay2;

            }

            ////////////////////////////////  June   /////////////////////////////////////

            var jun  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'June';
            });
            if (jun == null )
            {
                this.jun_array = 0;
            }
            else if (jun != null)
            {
                var junnonmoneyformat= jun.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var junnonmoneyformat2= jun.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var junnumber = junnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var junnumber2 = junnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var junsumpay = junnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var junsumpay2 = junnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jun_array = junsumpay-junsumpay2;

            }

            ////////////////////////////////  July   /////////////////////////////////////

            var jul  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'July';
            });
            if (jul == null )
            {
                this.jul_array = 0;
            }
            else if (jul != null)
            {
                var julnonmoneyformat= jul.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var julnonmoneyformat2= jul.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var julnumber = julnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var julnumber2 = julnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var julsumpay = julnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var julsumpay2 = julnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.jul_array = julsumpay-julsumpay2;

            }

            ////////////////////////////////   August  /////////////////////////////////////

            var aug  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'August';
            });
            if (aug == null )
            {
                this.aug_array = 0;
            }
            else if (aug != null)
            {
                var augnonmoneyformat= aug.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var augnonmoneyformat2= aug.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var augnumber = augnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var augnumber2 = augnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var augsumpay = augnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var augsumpay2 = augnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.aug_array = augsumpay-augsumpay2;

            }
            ////////////////////////////////   September  /////////////////////////////////////

            var sept  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'September';
            });
            if (sept == null )
            {
                this.sept_array = 0;
            }
            else if (sept != null)
            {
                var septnonmoneyformat= sept.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var septnonmoneyformat2= sept.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var septnumber = septnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var septnumber2 = septnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var septsumpay = septnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var septsumpay2 = septnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.sept_array = septsumpay-septsumpay2;

            }

            ////////////////////////////////  October   /////////////////////////////////////

            var oct  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'October';
            });
            if (oct == null )
            {
                this.oct_array = 0;
            }
            else if (oct != null)
            {
                var octnonmoneyformat= oct.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var octnonmoneyformat2= oct.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var octnumber = octnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var octnumber2 = octnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var octsumpay = octnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var octsumpay2 = octnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.oct_array = octsumpay-octsumpay2;

            }

            ////////////////////////////////  November   /////////////////////////////////////

            var nov  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'November';
            });
            if (nov == null )
            {
                this.nov_array = 0;
            }
            else if (nov != null)
            {
                var novnonmoneyformat= nov.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var novnonmoneyformat2= nov.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var novnumber = novnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var novnumber2 = novnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var novsumpay = novnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var novsumpay2 = novnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.nov_array = novsumpay-novsumpay2;

            }

            ////////////////////////////////  December  /////////////////////////////////////

            var des  = data.filter(function(datax){ /// access array by month
                return datax.datenowM == 'December';
            });
            if (des == null )
            {
                this.des_array = 0;
            }
            else if (des != null)
            {
                var desnonmoneyformat= des.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalpembayaran;
                var pay = x.split(".").join("");
                return pay;
                });
                var desnonmoneyformat2= des.map(function (data) { /// remove "." => convert to non curruncy
                var x = data.totalcapital;
                var pay = x.split(".").join("");
                return pay;
                });

                var desnumber = desnonmoneyformat.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });
                var desnumber2 = desnonmoneyformat2.map(function (x) { /// conver string to number so it can sum 
                    return parseInt(x, 10); 
                });

                var dessumpay = desnumber.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);
                var dessumpay2 = desnumber2.reduce(function(a, b) { /// sum total object in array
                    return a + b; 
                }, 0);

                this.des_array = dessumpay-dessumpay2;

            }

            
            this.array_semester_1= [this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array]
            this.array_semester_2= [this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array]


        ////////////////////////////////////////  GRAND TOTAL  //////////////////////////////////////

            var total= this.jan_array + this.feb_array + this.mar_array + this.apr_array + this.may_array + this.jun_array + this.jul_array + this.aug_array + this.sept_array + this.oct_array + this.nov_array + this.des_array;
            

             // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan = total;    
            var	number_string = bilangan.toString(),
            sisa 	= number_string.length % 3,
            totalpricerupiah 	= number_string.substr(0, sisa),
            ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            if (ribuan) {
            var separator = sisa ? '.' : '';
            totalpricerupiah += separator + ribuan.join('.');
            }
            this.grandtotal=totalpricerupiah; /// total price rupiah final
            

        ////////////////////////////////////////  AVERAGE INCOME  //////////////////////////////////////

            /// arrray harus dibalik bulanya agar dapat di slice() dengan sempuran
            var array_month_rev= [

                this.des_array ,
                this.nov_array ,
                this.oct_array ,
                this.sept_array ,
                this.aug_array ,
                this.jul_array ,
                this.jun_array ,
                this.may_array ,
                this.apr_array ,
                this.mar_array ,
                this.feb_array ,
                this.jan_array ,
                       
            ]
            // console.table(array_month_rev);
            // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            /// mencari jumlah potongan yang harus dilakukan pada array_month_rev
            var datenowM=moment().format('MMMM');
            var datenowY=moment().format('YYYY');
            this.datenowMM=datenowM;
            this.datenowYY=datenowY;
            // console.log(this.filterdate)
            
            if ( datenowM == "January" && this.filterdate == datenowY)
            {
                var vv = 11;
                var vx = 1;
            }
            else if(datenowM == "February" && this.filterdate == datenowY)
            {
                vv = 10;  
                vx = 2 
            }
            else if(datenowM == "March" && this.filterdate == datenowY)
            {
                vv = 9; 
                vx = 3  
            }
            else if(datenowM == "April" && this.filterdate == datenowY)
            {
                vv = 8; 
                vx = 4  
            }
            else if(datenowM == "May" && this.filterdate == datenowY)
            {
                vv = 7;
                vx = 5   
            }
            else if(datenowM == "June" && this.filterdate == datenowY)
            {
                vv = 6;
                vx = 6   
            }
            else if(datenowM == "July" && this.filterdate == datenowY)
            {
                vv = 5;
                vx = 7   
            }
            else if(datenowM == "August" && this.filterdate == datenowY)
            {
                vv = 4;
                vx = 8   
            }
            else if(datenowM == "September" && this.filterdate == datenowY)
            {
                vv = 3;
                vx = 9   
            }
            else if(datenowM == "October" && this.filterdate == datenowY)
            {
                vv = 2;
                vx = 10   
            }
            else if(datenowM == "November" && this.filterdate == datenowY)
            {
                vv = 1;
                vx = 11   
            }
            else if(datenowM == "December" && this.filterdate == datenowY)
            {
                vv = 0;
                vx = 12   
            }
            else if(this.filterdate < datenowY)
            {
                vv = 0;
                vx = 12   
            }

            // motong array bersarkan bulan ini
            var slicemonth =array_month_rev.slice(vv);

            // jumlahkan value dalam array
            var sum = slicemonth.reduce(function(a, b) { return a + b; }, 0);

            // cari rata-rata
            var total_bagi_bulan = sum/vx;

            //membulatkan bilangan hasil penghitungan rata-rata
            var averageincome1 = Math.round(total_bagi_bulan); 

            // GET FINAL TOTAL ALL ITEM PRICE FORMAT TO RUPIAH CURRUNCY
            var bilangan1 = averageincome1;    
            var	number_string1 = bilangan1.toString(),
            sisa1 	= number_string1.length % 3,
            totalpricerupiah1 	= number_string1.substr(0, sisa1),
            ribuan1 	= number_string1.substr(sisa1).match(/\d{3}/g);
            if (ribuan1) {
            var separator1 = sisa1 ? '.' : '';
            totalpricerupiah1 += separator1 + ribuan1.join('.');
            }
            this.averageincome=totalpricerupiah1; /// total price rupiah final

            


            // var maxincome = Math.max(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array);
            // console.log("max i",maxincome);

            // var minincome = Math.min(this.jan_array , this.feb_array , this.mar_array , this.apr_array , this.may_array , this.jun_array , this.jul_array , this.aug_array , this.sept_array , this.oct_array , this.nov_array , this.des_array)
            // console.log("min i",minincome);
            
            
            this.generategraph();
            

        }
    }

    ////////////////////////////////////  #5  //////////////////////////////////////////
    ////////////////////////////////////  #9  //////////////////////////////////////////

    generategraph()
    {

        if(this.lineChartsemester1) this.lineChartsemester1.destroy(); 

        if (this.lineChartsemester2) this.lineChartsemester2.destroy();
        // =====================================================================================

            this.label1 = '1st Semester of '+this.filterdate;
            this.lineChartsemester1 = new Chart(this.lineCanvassemester1.nativeElement, {
            type: 'line',
            data: {
                labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun."],
                datasets: [
                    {
                        label: this.label1,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:  this.array_semester_1,
                        spanGaps: false,
                    }
                ]
            },
            options: {
                scales: {
                yAxes: [{
                    ticks: {
                    callback: function(value, index, values) {
                    //   return value.toLocaleString("id-ID",{style:"currency", currency:"IDR"});
                    return Number(value).toFixed(0).replace(/./g, function(c, i, a) {
                        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
                    });
                    }
                    }
                }]
                },
                
    
                tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return "Rp. " + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function(c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
                        });
                    }
                }
            },
    
    
            }

            

            

        });


        
        


        this.label2 = '2nd Semester of '+this.filterdate;
        
        this.lineChartsemester2 = new Chart(this.lineCanvassemester2.nativeElement, {

            // line, bar, 

        type: 'line',
        data: {
            labels: ["Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
            datasets: [
                {
                    label: this.label2,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.array_semester_2,
                    spanGaps: false,
                }
            ]
        },

        options: {
            scales: {
                yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                    //   return value.toLocaleString("id-ID",{style:"currency", currency:"IDR"});
                    return Number(value).toFixed(0).replace(/./g, function(c, i, a) {
                        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
                    });
                    }
                }
                }]
            },

            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return "Rp. " + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function(c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
                        });
                    }
                }
            },


            }

        });



     }




  


}
