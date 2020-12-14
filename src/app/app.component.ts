import { Component } from '@angular/core';
//import { firebase } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayToken : any;
  notify:any;
  currentMessage = new BehaviorSubject({});
  constructor(private angularFireMessaging: AngularFireMessaging,
    public http : HttpClient
    ) {
      this.angularFireMessaging.messages.subscribe(
        (_messaging: any) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
      this.receiveMessage();
    //private updates: SwUpdate,private push: SwPush,
    //updates.available.subscribe(_ => updates.activateUpdate().then(() => {
    //  console.log('reload for update');
   //   document.location.reload();
  //  }));
    
  //  push.messages.subscribe(msg => console.log('push message', msg));
    //push.notificationClicks.subscribe(click => console.log('notification click', click));
   // firebase.initializeApp(environment.firebase);
    //if (!firebase.apps.length) {
     // navigator.serviceWorker.register('ngsw-worker.js').then(swr => {firebase.messaging().useServiceWorker(swr)});
    //}
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload) => {
    console.log("new message received. ", payload);
    this.currentMessage.next(payload);
    })
    }

  
  permitToNotify() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
      console.log(token);
      },
      (err) => {
      console.error('Unable to get permission to notify.', err);
      }
      );
   // const key = 'BJ1AraotABsKXET7PyBBIKgJmZV6GwmO8oMy8MCzSFtFq-AXnjuEoFpSRb2pWiIbemGFNsvRjRWYaiOmzuX_ri0';
   // this.push.requestSubscription({serverPublicKey : key})
  //  .then(pushSubscription=>{
   //   console.log(pushSubscription.toJSON())
   //   this.push.messages.subscribe(msg => console.log('push message', msg));
  //  } )
  }

  
  sendMessage(){
    const headers = { 'Authorization': 'key=AAAADMv1-H0:APA91bFKHU0nJ0tvD745YAhP_OBhNA23WOaeF8s3NJOJ5ru6Z6hRTryl3XegtEmEurFFimlTnsUm33QibipRFgyThyHScfP6PKTBfxhlpgdbkOlmZp7nHchDZTrBAoGXmOI3MJFLMMhI',
     'Content-Type': 'application/json' };
     const body = {
      'notification' : {
        'title' :  'Test Notification',
        'body' : 'Subscribe to might ghost hack youtube channel'
      },
      'to' : 'fUvOnd_TnRWtfxM6SuwiGP:APA91bG6GIaoxFQ2Sxfkk4zOCz1jSkKs5TV3pTKZC95uDHxHkM97f6-AmMa4ozti8iJhng5H-ud89cnXoWfshQrpy4j6ymxgSdmsBTi6DuafhdOQe8JhmIcE7WTH-azKDKe-IOpCgIio'
      };
    this.http.post("https://fcm.googleapis.com/fcm/send",body,{ headers }).subscribe((res) =>{
      console.log("kk" +res);
      this.notify = new Notification('MyApp -' + 'Test Notification' ,{
        'body' : 'Subscribe to might ghost hack youtube channel',
        
      } )
    })
  }
}
