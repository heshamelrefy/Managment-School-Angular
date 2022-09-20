import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  cp: number = 1
  head:any
  data:any
  th:any[]=[['DIVISION','GRADE','CLASS','SUBJECT','USER','DATE']]
  allNewsFeed:any[]=[]
  allNewFeed:any[]=[]
  entrie:number=5
  selectedDivision:any='defualt'
  selectedgrade :any='defualt'
  selectedclasses :any='defualt'
  constructor(private _newsServices:NewsService) { }
  gradess:any[]=[]
  classess:any[]=[]
  gallery:any[]=[]
    publishForm= new FormGroup({
      division : new FormControl('defualt',[Validators.required]),
      grade : new FormControl('defualt',[Validators.required]),
      class : new FormControl('defualt',[Validators.required]),
  
    })
  
  
  get division(){
    return this.publishForm.get("division")
   }
   get grade(){
    return this.publishForm.get("grade")
   }
   get class(){
    return this.publishForm.get("class")
   }
  get subject(){
   return this.publishForm.get("subject")
  }
  get file(){
    
    return this.publishForm.get("file")
   }
   get paragraph(){
    return this.publishForm.get("paragraph")
   }

  
  ngOnInit(): void {
    this._newsServices.showNewsFeeds().subscribe((feeds)=>{
      this.allNewsFeed=[]
      this.allNewFeed=[]
      feeds.forEach((feed:any) => {
        this.allNewFeed.push(feed.payload.doc.data())
        this.allNewsFeed.push(this.allNewFeed)
      });
    })
  }

  reset()
  {
    this.publishForm.get('division')?.setValue('defualt')
    this.publishForm.get('grade')?.setValue('defualt')
    this.publishForm.get('class')?.setValue('defualt')
    this.selectedDivision='defualt'
    this.selectedgrade ='defualt'
    this.selectedclasses ='defualt'
  
  }
  filteration(division:any,grade:any,classes:any)
  {
    this.selectedDivision=division
    this.selectedgrade=grade
    this.selectedclasses=classes
  }
 
  
  checkDvivision(division:any){
    if (division !=="defualt") {
     this.gradess= this._newsServices.getGrades();
    }
    else{
      this.gradess=[]
      this.publishForm.controls.grade.setValue('defualt')
      this.publishForm.controls.class.setValue('defualt')
    }
    console.log(division);
    
  }

  
  checkGrades(grade:any){
    if (grade !=="defualt") {
     this.classess= this._newsServices.getClasses(grade);
    }
    else{
      this.classess=[]
      
      this.publishForm.controls.class.setValue('defualt')
    }
    console.log(grade);
    
  }

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.th,
      body: this.allNewsFeed,
      theme: 'plain',
      // didDrawCell: data => {
      //   console.log(data.column.index)
      // }
    })
    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('myteamdetail.pdf');
  }
}
