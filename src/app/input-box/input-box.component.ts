import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from '../services/storage.service';
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "app-input-box",
  templateUrl: "./input-box.component.html",
  styleUrls: ["./input-box.component.css"]
})
export class InputBoxComponent implements OnInit {
  public properties: InputModalProperties;
  public inputValue = "";
  public selectedFiles: FileList;

  constructor(
    public activeModal: NgbActiveModal,
    private storageService: StorageService,
    private toastr: ToasterService,
  ) {}

  ngOnInit() {}

  save() {
    this.activeModal.close(this.inputValue);
  }

  upload() {
     this.toastr.pop(
        "info",
        "Adding Face",
        "Please wait..."
      );
    const file = this.selectedFiles.item(0);
    this.storageService.uploadFile(file).subscribe(response => {
      console.log(response);
      this.activeModal.close(response);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}

export class InputModalProperties {
  title: string;
  message: string;
}
