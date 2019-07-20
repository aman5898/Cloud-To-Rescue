import { Component, OnInit, ViewChild } from "@angular/core";
import { FaceApiService } from "../services/face-api-service.service";
import * as _ from "lodash";
import { forkJoin } from "rxjs";
import { StorageService } from "../services/storage.service";

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
  @ViewChild("mainImg",{ static: false }) mainImg;

  constructor(
    private faceApi: FaceApiService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.faceApi.getPersonGroups().subscribe(data => {
      this.personGroups = data;
      this.loading = false;
    });
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.storageService.uploadFile(file).subscribe(response => {
      console.log(response);
      this.imageUrl=response;
      this.detect();      
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  detect() {
    this.loading = true;
    this.faceApi.detect(this.imageUrl).subscribe(data => {
      this.detectedFaces = data;
      console.log("**detect results"+ this.detectedFaces);
      this.loading = false;
      this.identify();
    });

  }

  faceClicked(face) {
    this.selectedFace = face;
    if (this.selectedFace.identifiedPersonId) {
      let identifiedPerson = _.find(this.identifiedPersons, {
        personId: face.identifiedPersonId
      });
      this.selectedFace.name = identifiedPerson.name;
    }
  }

  identify() {
    let faceIds = _.map(this.detectedFaces, "faceId");
    this.loading = true;
    //NOTE: for Production app, max groups of 10
    this.faceApi
      .identify(this.selectedGroupId, faceIds)
      .subscribe(identifiedFaces => {
        console.log("IDentify results");
        console.log(identifiedFaces);
        let obsList = [];

        _.forEach(identifiedFaces, identifiedFace => {
          if (identifiedFace.candidates.length > 0) {
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
          }else{
            this.loading=false;
          }
        });

        // Call getPerson() for each identified face
        forkJoin(obsList).subscribe(results => {
          this.identifiedPersons = results;
          this.loading = false;
        });
      });
      
  }

  imageLoaded($event) {
    this.selectedFace = null;
    this.detectedFaces = [];
    let img = this.mainImg.nativeElement;
    this.multiplier = img.clientWidth / img.naturalWidth;
  }
}
