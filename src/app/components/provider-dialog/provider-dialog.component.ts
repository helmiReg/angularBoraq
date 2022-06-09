import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Provider} from "../../models/provider";
import {ProvidersService} from "../../services/providers.service";
import {SimpleDialogComponent} from "../../shared/simple-dialog/simple-dialog.component";

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['./provider-dialog.component.css']
})
export class ProviderDialogComponent implements OnInit {
  form: FormGroup;
  description =  `Ajout d'un fournisseur`;
  provider= {name : 'fournisseur A', solde : 0};
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) provider : Provider,
    private providersService: ProvidersService,
    private dialog: MatDialog){

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.provider.name, Validators.required],
      solde: [this.provider.solde, Validators.required],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
    if(this.form.getRawValue().name) {
      console.log('name= ', this.form.getRawValue().name);
      this.provider.name = this.form.getRawValue().name;
      this.provider.solde = this.form.getRawValue().solde;
      console.log('name= ', this.provider.name);
      console.log('valid= ', this.form.valid);
      this.providersService.create(this.provider).subscribe({
        next: (res) => {
          console.log(res);
          // @ts-ignore
          console.log('name= ');
          this.submitted = true;
          // @ts-ignore
          this.dialog.open(SimpleDialogComponent,{data: {description: 'le fourniseur '+ res.name + ' est créé avec Succés!'}});
        },
        error: (e) => console.error(e)
      });
    }
    console.log('valid= ', this.form.valid);
  }

  close() {
    this.dialogRef.close();
  }

}
