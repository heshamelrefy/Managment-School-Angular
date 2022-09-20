import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(feeds: any[],division:any,grade:any,classes:any ): any {
    if(division == 'defualt'&&grade=='defualt'&&classes=='defualt') {
      return feeds;
      }
      if(division !='defualt')  {
        feeds= feeds.filter(function(feed) {
          return feed.division.division_id==division
        })
     } 
    
     if(grade !='defualt')  {
      feeds= feeds.filter(function(feed) {
        return feed.grade.grade_id==grade
      })
   }
   if(classes !='defualt')  {
    feeds= feeds.filter(function(feed) {
      return feed.class.class_id==classes
    })
 }
  return feeds
  }
    
  
}
