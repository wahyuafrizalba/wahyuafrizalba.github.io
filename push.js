let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAE7Z1tSWtwY3VdW6gioauuF8iqx-66MUxwjzYIJDJpxNELQBvsa5wTIAdS6zu2BtB761Knjyf5U9r3GhPOC5Kk",
   "privateKey": "-2gsHLOIGIxZwU1wXDo4tI12L01eVYS-CU3tv1B9EUI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eHxrRXaZl1g:APA91bFFht30fbuP6mLvZvB2sqbqNzN0C0RDpJkOHsJkSZXxNDdJvjaNkeLYNVTAWYRZ2AyXOWVyP6S1sXv_GToErWWbnNOCIUj1kBKaNakSFS-DVLQ-zCdp1OEZoG_FjxnYlE6jXFA3",
   "keys": {
       "p256dh": " BE++KJMFMO+JS4KYIn7Az9wwhglRiCVMWk4S+BMCFHGMz8A+gUEixOt+Aq1bIhEk3RcQdDDgwnxUd/5RWwdNOcI=",
       "auth": "tKIa/RlilO1OkDjUkqqkeQ=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '396927876911',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);