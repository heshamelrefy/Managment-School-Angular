import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { PublishComponent } from './publish/publish.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:NewsFeedComponent},
  {path:'newsFeed',component:NewsFeedComponent},
  {path:'publish',component:PublishComponent},
  {path:'register',component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
