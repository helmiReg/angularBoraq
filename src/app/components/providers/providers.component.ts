import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProvidersService} from "../../services/providers.service";
import {Provider} from "../../models/provider";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProviderDialogComponent} from "../provider-dialog/provider-dialog.component";

@Component({
  selector: 'app-suppliers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit, AfterViewInit, OnChanges {
  dataSource: any;
  displayedColumns= ["name", "solde", "actions"];
  pageSizeOptions= [5, 10, 15, 20];
  totalElements?: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sortDirection: string;
  sortActive: string;
  @Input() input: string = '';
  params = { page: 0, size: 5,name: '', sortBy: 'solde', sortDirection: 'ASC'};

  constructor(private route: ActivatedRoute, private providersService: ProvidersService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.reload();
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(ProviderDialogComponent, dialogConfig);
  }
  onChangePaginate(event: PageEvent) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.params.page = event.pageIndex;
      this.params.size = event.pageSize;
      this.reload(this.input);

  }
  onKey(event: any) { // without type info
    this.input = event.target.value;
    this.paginator.pageIndex = 0;
    this.params.page = 0;
    this.params.name = this.input;
    this.reload(this.input);
  }
  reload(name?: string): void {

    if (!name || name==='') {
      this.providersService.getAll(this.params).subscribe((data) => {

        this.dataSource = data.content;
        this.totalElements = data.totalElements;

      });
    } else {
      this.providersService.getAll(this.params).subscribe((data) => {
        // @ts-ignore
        this.dataSource = data.content;
        // @ts-ignore
        this.totalElements = data.totalElements;
      });

    }
  }
  announceSortChange(sortState: Sort) {
    if(sortState.active) {
      // @ts-ignore
      this.params.sortBy = sortState.active.valueOf();
      this.sortDirection = sortState.direction.toUpperCase();
      // @ts-ignore
      this.params.sortDirection = this.sortDirection;
      this.sortActive = sortState.active;
      // @ts-ignore
      this.reload(this.input);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
