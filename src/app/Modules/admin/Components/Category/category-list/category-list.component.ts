import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import { CategoryDataServices } from '../../../DataServices/category-data-services.service';
import { Category } from '../../../Models/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateRegistration', 'dateUpdate', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  editingCategory!: Category;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryDataServices: CategoryDataServices, private alertServices: AlertServices) {}

  ngOnInit(): void {
    this.updateList();
  }
  
  async updateList(): Promise<void> {
    let response = await this.categoryDataServices.get();

    if(response.status != 200) this.dataSource = new MatTableDataSource<Category>();

    let list = await response.json();
    list.reverse();

    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateCategory(category: Category): void {
    this.editingCategory = category;
  }

  async deleteCategory(category: Category): Promise<void> {
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
        let response = await this.categoryDataServices.delete(category.id);

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
