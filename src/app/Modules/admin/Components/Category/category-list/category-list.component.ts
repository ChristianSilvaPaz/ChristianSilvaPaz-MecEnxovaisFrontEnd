import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryResponse } from '../../../Models/Category/CategoryResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryServices } from '../../../Services/Category-Services';
import Swal from 'sweetalert2';
import { AlertServices } from 'src/app/Shared/alert-services.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateRegistration', 'dateUpdate', 'actions'];
  dataSource = new MatTableDataSource<CategoryResponse>();
  editingCategory!: CategoryResponse;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryServices: CategoryServices, private alertServices: AlertServices) {}

  ngOnInit(): void {
    this.updateList();
  }
  
  async updateList(): Promise<void> {
    this.dataSource = new MatTableDataSource(await this.categoryServices.get());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateCategory(category: CategoryResponse): void {
    this.editingCategory = category;
  }

  async deleteCategory(category: CategoryResponse): Promise<void> {
    Swal.fire({
      title: 'Você tem certeza disso?',
      text: 'Excluir a categoria: ' + category.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E90FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.categoryServices.delete(category);

        response.status != 204 ? 
          this.alertServices.openAlertError() : this.alertServices.openAlertDeletedSuccessfully();
        
        this.updateList();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
