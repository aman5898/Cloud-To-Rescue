import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FaceTesterComponent } from './face-tester/face-tester.component';
import { FaceGroupingComponent } from './face-grouping/face-grouping.component';
import { FindSimilarComponent } from './find-similar/find-similar.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'test-faces', component: FaceTesterComponent,pathMatch:'full',canActivate: [AuthenticationGuard]},
  { path: 'face-grouping', component: FaceGroupingComponent },
  { path: 'find-similar', component: FindSimilarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
