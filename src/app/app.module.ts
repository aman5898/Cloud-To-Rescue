import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { FaceTesterComponent } from "./face-tester/face-tester.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FaceApiService } from "./services/face-api-service.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputBoxComponent } from "./input-box/input-box.component";
import { InputBoxService } from "./input-box/input-box.service";
import { NgxLoadingModule } from "ngx-loading";
import { ToasterModule } from "angular2-toaster";
import { FaceGroupingComponent } from "./face-grouping/face-grouping.component";
import { FindSimilarComponent } from "./find-similar/find-similar.component";
import { InputBoxPersonComponent } from "./input-box-person/input-box-person.component";

import { AzureStorageService } from "./services/azure-storage.service";
import { BlobModule } from "angular-azure-blob-service";
import { StorageService } from "./services/storage.service";

import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConfigurationComponent,
    FaceTesterComponent,
    InputBoxComponent,
    FaceGroupingComponent,
    FindSimilarComponent,
    InputBoxPersonComponent
  ],
  imports: [
    MsAdalAngular6Module.forRoot({
      tenant: '0aa055ee-c128-4530-b1ba-7769b321e640',
      clientId: 'e84501ef-94eb-4755-91f0-0e88cb21a197',
      redirectUri: `${window.location.origin}/report`,
      endpoints: { 
        api: "e84501ef-94eb-4755-91f0-0e88cb21a197"        
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule,
    NgbModule,
    ToasterModule.forRoot(),
    BlobModule.forRoot()
  ],
  providers: [
    FaceApiService,
    InputBoxService,
    AzureStorageService,
    StorageService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [InputBoxComponent, InputBoxPersonComponent]
})
export class AppModule {}
