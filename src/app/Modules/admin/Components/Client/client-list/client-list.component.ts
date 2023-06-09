import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../Models/Client';
import { ClientDataServices } from '../../../DataServices/client-data-services.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AlertServices } from 'src/app/Shared/alert-services.service';

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

  constructor(private clientDataServices: ClientDataServices, private alertServices: AlertServices) {}

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
  
  delete(client: Client): void {
    Swal.fire({
      title: 'Você tem certeza disso?',
      text: 'Excluir o cliente: ' + client.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E90FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.clientDataServices.delete(client.id);

        if (response.status != 204) this.alertServices.openAlertError()
        
        else {
          this.alertServices.openAlertDeletedSuccessfully();
          this.updateList();
        }
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
