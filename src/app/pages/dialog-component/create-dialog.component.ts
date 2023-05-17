import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-dialog.component.html',
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }
  form = new FormGroup({
    name: new FormControl(this.data?.product?.name || '', [Validators.required]) || '',
    description: new FormControl(this.data?.product?.description || '', [Validators.required]) || '',
    amount: new FormControl(this.data?.product?.amount || '', [Validators.required]) || '',
  });

  submit(){
    if(this.data?.type == 'edit'){
      return this.http.patch<any>(`${environment.apiUrl}/product-lists/${this.data?.product?.id}`,this.form.value).subscribe(
        (response) => {
          this.dialogRef.close(response);
        },
        (error) => {
          console.log(error,'error')
        }
      )
    }else{
      return this.http.post<any>(`${environment.apiUrl}/product-lists`,this.form.value).subscribe(
        (response) => {
          this.dialogRef.close(response);
        },
        (error) => {
          console.log(error,'error')
        }
      )
    } 
  }
}
