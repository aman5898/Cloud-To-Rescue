import { Component, OnInit, ViewChild } from "@angular/core";
import { FaceApiService } from "../services/face-api-service.service";
import * as _ from "lodash";
import { forkJoin } from "rxjs";
import { StorageService } from "../services/storage.service";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "app-face-tester",
  templateUrl: "./face-tester.component.html",
  styleUrls: ["./face-tester.component.css"]
})
export class FaceTesterComponent implements OnInit {
  loading = false;
  public detectedFaces: any;
  public identifiedPersons = [];
  public imageUrl: string;
  public multiplier: number;
  public personGroups = ["ms-hack"];
  public selectedFace: any;
  public selectedGroupId = "ms-hack";
  public selectedFiles: FileList;
  private detectedOnce=false;
  @ViewChild("mainImg", { static: false }) mainImg;

  constructor(
    private faceApi: FaceApiService,
    private storageService: StorageService,
    private toastr: ToasterService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.faceApi.getPersonGroups().subscribe(data => {
      this.personGroups = data;
      this.loading = false;
    });
  }

  upload() {
    this.toastr.pop("info", "Searching Face", "Please wait...");
    const file = this.selectedFiles.item(0);
    this.storageService.uploadFile(file).subscribe(response => {
      console.log(response);
      this.imageUrl = response;
      this.detect();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  detect() {
    this.loading = true;
    this.faceApi.detect(this.imageUrl).subscribe(data => {      
      if (data.length == 0) {
        this.loading = false;
        this.toastr.pop(
          "error",
          "No Face Found",
          "Please try another image..."
        );
      } else {
        this.detectedFaces = data;
        console.log("**detect results" + this.detectedFaces);
        this.loading = false;
        this.identify();
      }
    });    
  }

  faceClicked(face) {    
    this.selectedFace = face;
    if (this.selectedFace.identifiedPersonId) {
      let identifiedPerson = _.find(this.identifiedPersons, {
        personId: face.identifiedPersonId
      });
      this.selectedFace.name = identifiedPerson.name;
      if(this.detectedOnce==true){
        this.toastr.pop(
          "info",
          this.selectedFace.name,
          "Please scroll above to know more..."
        );
      }      
    }
  }

  identify() {
    
    let faceIds = _.map(this.detectedFaces, "faceId");
    this.loading = true;
    //NOTE: for Production app, max groups of 10
    this.faceApi
      .identify(this.selectedGroupId, faceIds)
      .subscribe(identifiedFaces => {        
        let obsList = [];        
        console.log(identifiedFaces);
        _.forEach(identifiedFaces, identifiedFace => {
          if (identifiedFace.candidates.length > 0) {
            this.detectedOnce=true;
            let detectedFace = _.find(this.detectedFaces, {
              faceId: identifiedFace.faceId
            });
            detectedFace.identifiedPerson = true;
            detectedFace.identifiedPersonId =
              identifiedFace.candidates[0].personId;
            detectedFace.identifiedPersonConfidence =
              identifiedFace.candidates[0].confidence;
            obsList.push(
              this.faceApi.getPerson(
                this.selectedGroupId,
                identifiedFace.candidates[0].personId
              )
            );
          } else {
            this.loading = false;
          }
        });

        // Call getPerson() for each identified face
        forkJoin(obsList).subscribe(results => {
          this.identifiedPersons = results;
          this.loading = false;
        });

        if(this.detectedOnce==true){
          this.toastr.pop(
            "success",
            "Face Found",
            "Click on the green box to know more"
          );
        }else{
          this.toastr.pop(
            "error",
            "No match found",
            "Please try another image..."
          );
        }
      });
  }

  imageLoaded($event) {
    this.selectedFace = null;
    this.detectedFaces = [];
    let img = this.mainImg.nativeElement;
    this.multiplier = img.clientWidth / img.naturalWidth;
  }
}
