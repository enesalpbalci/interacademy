import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/models/contract.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private contractService:ContractService) { }

  contract:Contract

  imageUrl:User

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.contractService.getContractById(params["id"]).subscribe(data => {
        this.contract = data;
      })
    })
  }

  onFileChanged(e: any) {
    let files = e.target.files;
    if (files[0]) {
      // this.readAsByteArray(files[0]);
      this.readAsDataURL(files[0]);
    }
  }

  // readAsByteArray(file: any) {
  //   var reader = new FileReader();
  //   var fileByteArray: number[] = [];
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = (evt) => {
  //     if (evt.target.readyState == FileReader.DONE) {
  //       this.imageUrl = evt.target.result as string;
  //       let arrayBuffer = evt.target.result as ArrayBuffer;
  //       let array = new Uint8Array(arrayBuffer);
  //       for (let i = 0; i < array.length; i++) {
  //         fileByteArray.push(array[i]);
  //       }
  //     }
  //   };
  // }

  readAsDataURL(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: any) => {
      this.imageUrl = event.target.result;
    };
  }

}
