import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { FileUpload } from '../model/file-upload';
import { BlobService, UploadParams } from 'angular-azure-blob-service'

@Injectable()
export class AzureStorageService {

  private config = require('../../assets/config.json');

  AzureBlobConfig: UploadParams = {
    sas: this.config.azureblobconfiguration.sas,
    storageAccount: this.config.azureblobconfiguration.storageAccount,
    containerName: this.config.azureblobconfiguration.containerName
  };

  constructor(private blob: BlobService) {

  }

  // getFiles(): Observable<Array<FileUpload>> {
  //   var azure = require('azure-storage');
  //   var blobService = azure.createBlobService();
  //   var fs = require('fs');
  //   blobService.getBlobToStream('cftmwebcontainer', 'taskblob', fs.createWriteStream('output.txt'), function (error, result, response) {
  //     if (!error) {
  //       // blob retrieved
  //     }
  //   });
  //   return;
  // }

  uploadFile(file) {
    console.log(file+" aman");
    return Observable.create(observer => {
      var _This = this;
      if (file !== null) {
        // _This.isUploading = true;
        let uploadConfig = _This.AzureBlobConfig;
        const baseUrl = _This.blob.generateBlobUrl(uploadConfig, file.name);
        let config = {
          baseUrl: baseUrl,
          sasToken: uploadConfig.sas,
          blockSize: 1024 * 2000, // OPTIONAL, default value is 1024 * 32
          file: file,
          complete: () => {
            let response = {
              status: true,
              url: "https://" +
                _This.AzureBlobConfig.storageAccount +
                ".blob.core.windows.net/" +
                _This.AzureBlobConfig.containerName +
                "/" +
                file.name
            }
            observer.next(response);
            observer.complete();
          },
          error: () => {
            observer.next({ status: false });
            observer.complete();
          },
          progress: percent => {
            console.log(percent);
          }
        };
        this.blob.upload(config);
      }
    })
  }
}