import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AzureStorageService } from './azure-storage.service';

@Injectable()
export class StorageService {
    private config= require('../../assets/config.json');
    
    constructor(private azureblob : AzureStorageService){
            console.log("configured storage",this.config.storageservice);
    }

 uploadFile(file){
    return Observable.create(Observer=>{
        if(this.config.storageservice=='azure'){
            this.azureblob.uploadFile(file).subscribe(response =>{
                if(response.status){
                    Observer.next(response.url)
                }else{
                    Observer.next('');
                }
                Observer.complete();
            })
        }
    })

 }


//  getFiles(): Observable<Array<FileUpload>> ;
}
