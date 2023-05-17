import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Product } from '../../../models'
import { DialogComponent } from '../dialog-component/create-dialog.component'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {
  animal: string;
  name: string;
  displayedColumns: string[] = ['name', 'description', 'amount','actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    return this.http.get<any>(`${environment.apiUrl}/product-lists`).subscribe(
      (response) => {
        this.dataSource = response.results
      },
      (error) => {
        console.log(error,'error')
      }
    )
  }

  editProduct(product : any){
    this.openDialog(product,'edit')
  }

  deleteProduct(product : any,){
    return this.http.delete<any>(`${environment.apiUrl}/product-lists/${product.id}`).subscribe(
      () => {
        const index = this.dataSource.findIndex(item => item.id === product.id);
        let products = this.dataSource
        if (index !== -1) {
          products.splice(index, 1);
          this.dataSource = [...products]
        }
      },
      (error) => {
        console.log(error,'error')
      }
    )
  }

  openDialog(product? : Product,type : string = 'create'): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {product, type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.name && type !== 'edit'){
        this.dataSource = [... this.dataSource , result]
      }
      if(result?.name && type == 'edit'){
        const index = this.dataSource.findIndex(item => item.id === product?.id);
        let products = this.dataSource
        if (index !== -1) {
          products.splice(index, 1,result);
          this.dataSource = [...products]
        }
      }
    });
  }

}
