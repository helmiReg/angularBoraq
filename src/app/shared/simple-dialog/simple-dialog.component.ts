import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Provider} from "../../models/provider";

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit {
  name = '';
  description = '';
  constructor(private dialogRef: MatDialogRef<SimpleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.description = data.description;
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
