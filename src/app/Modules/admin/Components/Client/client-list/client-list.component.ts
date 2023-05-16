import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../Models/Client';
import { ClientDataServices } from '../../../DataServices/client-data-services.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phoneNumber1', 'dateRegistration', 'dateUpdate', 'actions'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientDataServices: ClientDataServices) {}

  ngOnInit(): void {
    this.updateList();
  }

  async updateList(): Promise<void> {
    let response = await this.clientDataServices.get();

    if( response.status != 200) this.dataSource = new MatTableDataSource<Client>();

    let list = await response.json();
    list.reverse();

    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  delete(client: Client): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
