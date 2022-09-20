import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from './../news.service';
import { AuthService } from './../auth.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  configCK = {
    ckfinder: {
      uploadUrl: "http://127.0.0.1:8000/api/email-document/upload"
    }
    // ,
    // headers: {
    //   "X-CSRF-TOKEN": "CSRF-Token",
    //   Authorization: "Bearer <JSON Web Token>"
    // }
    // extraPlugins: [this.MyCustomUploadAdapterPlugin],
  };
  userInfo:any;
  filePath:any;
  config:any;
  // publishForm:any;

  constructor(private _newsServices:NewsService,private authService:AuthService) { }
  allFile:any[]=[]
  gradess:any[]=[]
  classes:any[]=[]
  gallery:any[]=[]
    publishForm= new FormGroup({
      division : new FormControl('defualt',[Validators.required]),
      grade : new FormControl('defualt',[Validators.required]),
      class : new FormControl('defualt',[Validators.required]),
      subject : new FormControl('',[Validators.required]),
      file : new FormControl('',[Validators.required]),
      paragraph : new FormControl('',[Validators.required]),
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
  // get file path
  selectedImg($event:any){
    this.filePath = $event.target.files
    this.gallery=$event.target.files
    console.log($event.target.files[0]);
    
  }
   onSubmit()
   {
      let userFeed={
        division:{
          division_id:this.division?.value,
          divisionName:this.division?.value =='defualt' ? 'All':this.division?.value =='1'? 'British ':'American'
          
        },
        grade:{
          grade_id:this.grade?.value,
          gradeName:this.grade?.value == 'defualt' ? 'All':'grade '+this.grade?.value,
        },
        class:{
          class_id:this.class?.value,
          className:this.class?.value == 'defualt' ? 'All':'class '+this.grade?.value+'/'+this.class?.value,
        },
        title:this.subject?.value,
        publishDate: new Date().toDateString(),
        body:this.paragraph?.value,
        userInfo:this.userInfo,
        active:1
      }
      console.log(userFeed);
      this._newsServices.addNewFeed(userFeed,this.filePath)
      this.publishForm.reset()
      this.publishForm.controls.division.setValue('defualt')
      this.publishForm.controls.grade.setValue('defualt')
      this.publishForm.controls.class.setValue('defualt')
   }
  ngOnInit(): void {
    this.authService.currentUserInfo.subscribe((userData)=>{
      console.log(userData);
      // this.publish()
      this.userInfo=userData
    })
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
     this.classes= this._newsServices.getClasses(grade);
    }
    else{
      this.classes=[]
      
      this.publishForm.controls.class.setValue('defualt')
    }
    console.log(grade);
    
  }
}
