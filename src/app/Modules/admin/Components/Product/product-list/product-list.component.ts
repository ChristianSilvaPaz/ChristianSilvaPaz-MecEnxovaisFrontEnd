import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductDataServices } from '../../../DataServices/product-data-services.service';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import Swal from 'sweetalert2';
import { Product } from '../../../Models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'price', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  editingProduct!: Product;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productDataServices: ProductDataServices, private alertServices: AlertServices) {}

  ngOnInit(): void {
    this.updateList();
  }
  
  async updateList(): Promise<void> {
    let response = await this.productDataServices.get();

    if(response.status != 200) this.dataSource = new MatTableDataSource<Product>();

    let list = await response.json();
    list.reverse();

    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  update(product: Product): void {
    this.editingProduct = product;
  }

  delete(product: Product): void {
    Swal.fire({
      title: 'Você tem certeza disso?',
      text: 'Excluir o produto: ' + product.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E90FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.productDataServices.delete(product.id);

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
