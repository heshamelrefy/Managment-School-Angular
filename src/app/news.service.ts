import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private schoolStorage: AngularFireStorage, private router:Router, private schoolDb:AngularFirestore) { }

    // add new feed
    fileUrlP1:string = 'https://firebasestorage.googleapis.com/v0/b/school-4e452.appspot.com/o'
    fileUrlP2:string = '?alt=media&token=9adcb505-5bcc-4422-9419-c180079b99b8'
    addNewFeed(newFeed:any,paths:any[]=[]){
      let filesUrl:any=[]
      console.log(paths);
      
      Object.keys(paths).forEach((key:any)=>{
        const fileUrl = `/files${Math.random()}${paths[key]}`
        filesUrl.push(this.fileUrlP1+fileUrl+this.fileUrlP2)
        this.schoolStorage.upload(fileUrl,paths[key])
      })
     
      
        let feed ={
          ...newFeed,
          gallery:filesUrl,
         }
         feed.feedId =this.schoolDb.createId();
         let ref = this.schoolDb.collection("newsFeed").doc(feed.feedId)
         ref.set(feed)
  
      
      
    }
    showNewsFeeds():Observable<any>
    {
      return this.schoolDb.collection(`/newsFeed`, ref =>    ref.orderBy('publishDate')).snapshotChanges()
    }
    getGrades()
    {
        
        let arr=[]
        for (let i = 1; i <= 6; i++) {
          let obj={
            grade_id:i,
            gradeName:'grade '+i
          }
          arr.push(obj)
          
        }
        return arr;
      
    }
    getClasses(grade:any)
    {
        
        let arr=[]
        for (let i = 1; i <= 3; i++) {
          let obj={
            class_id:i,
            className:'class '+grade+'/'+i
          }
          arr.push(obj)
          
        }
        return arr;
      
    }
}
