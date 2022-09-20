import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable , BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserInfo=new BehaviorSubject<any>(null)

  constructor(private schoolAuth:AngularFireAuth, private router:Router, private schoolDb:AngularFirestore) {
    this.currentUserInfo.next(JSON.parse(localStorage.getItem('schoolloggedInInfo')||'{}')?JSON.parse(localStorage.getItem('schoolloggedInInfo')||'{}'):{});
  }

   

    // register
    register(userInfo:any){
      this.schoolAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then((userCredential)=>{
        let user = userCredential.user;
       
        let ref = this.schoolDb.collection("/schoolUsers").doc(user?.uid)
        ref.set({...userInfo, userId:user?.uid, dateJoined: new Date().toDateString()})
        this.currentUserInfo.next({...userInfo, userId:user?.uid, dateJoined: new Date().toDateString()})
        localStorage.setItem("schoolloggedInInfo", JSON.stringify(this.currentUserInfo.getValue()))
        this.router.navigate(["/newsFeed"]);
        
      },err=>{
        console.log(err.message)
       

      })
    }

   

    // getUserInfo(userKey:any, isAdmin:boolean){
    //   if(isAdmin){
    //     let ref = this.schoolDb.collection("/mrTailorAdmins").doc(userKey)
    //     return ref.snapshotChanges()
    //   }
    //   else{
    //     let ref = this.schoolDb.collection("/mrTailorClients").doc(userKey)
    //     return ref.snapshotChanges()
    //   }
    // }
}
