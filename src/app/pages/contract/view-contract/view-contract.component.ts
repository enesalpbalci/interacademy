import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/models/contract.interface';
import { Payment } from 'src/app/models/payment.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { Subject } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private contractService:ContractService, private paymentService:PaymentService) { }

  contract:Contract
  allPayments:Payment[]=[]
  payments:Payment
  
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons: ['excel', 'pdf', 'print'],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy:true
    };
    this.activatedRoute.params.subscribe(params=>{
      this.contractService.getContractById(params["id"]).subscribe(data => {
        this.contract = data;
        this.paymentService.getPaymentClaimById(data.studentId).subscribe(data=>{
          this.payments= data
        })
      })
    })
  }

  // onFileChanged(e: any) {
  //   let files = e.target.files;
  //   if (files[0]) {
  //     // this.readAsByteArray(files[0]);
  //     this.readAsDataURL(files[0]);
  //   }
  // }

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

  // readAsDataURL(file: any) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   };
  // }

}
