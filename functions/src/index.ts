import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


exports.newSubscriberNotification = functions.firestore
    .document('data_booking_konsumen/{data_booking_konsumenId}')
    .onCreate(  async (snap,context) => {

    const data = snap.data();
        console.log("FCM",data);
    if (data)
    { 
        const deviceId : string = data.deviceId;
        const namakonsumen : string = data.nama_konsumen;
        // const subscriber : string = data.subscriberId;


    // Notification content
    const payload = {
        notification: {
            title: 'New Customer Booking',
            body: `${namakonsumen} baru saja membooking layanan Service Unnes`,
            icon: 'notification_icon'
        }
    }

    // ref to the parent document
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('deviceId', '==', deviceId)


    // get users tokens and send notifications

    const devices = await devicesRef.get()

    const tokens: string | string[] = []
    
    devices.forEach(result => {
        const token = result.data().token;

       tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

    }

    else
    {
        return null;
    }
});