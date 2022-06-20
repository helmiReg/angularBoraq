import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Provider} from "../../models/provider";
import {ProvidersService} from "../../services/providers.service";
import {MatSnackBar} from '@angular/material/snack-bar';
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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar){

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      solde: ['', Validators.required],
    });
    this.form.patchValue(this.provider);
  }

  save() {
    this.dialogRef.close(this.form.value);
    if(this.form.getRawValue().name) {
      this.provider.name = this.form.getRawValue().name;
      this.provider.solde = this.form.getRawValue().solde;
      this.providersService.create(this.provider).subscribe({
        next: (res) => {
          this.submitted = true;
          // @ts-ignore
          //this.dialog.open(SimpleDialogComponent,{data: {description: `le fourniseur ${res.name} est créé avec Succés!`}});
          this._snackBar.open(`le fourniseur ${res.name} est créé avec Succés!`, null, {duration: 3000});
        },
        error: (e) => {

          if(e.error.errors) {
            e.error.errors.forEach((err: string) =>
            {
              // @ts-ignore
              this._snackBar.open(err, null, {duration: 3000});
            })
          }
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
