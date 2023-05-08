import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryResponse } from '../../../Models/Category/CategoryResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryServices } from '../../../Services/Category-Services';

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

  constructor(private categoryServices: CategoryServices) {}

  ngOnInit(): void {
    this.updateList();
  }
  
  async updateList(): Promise<void> {
    this.dataSource = new MatTableDataSource(await this.categoryServices.get());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateCategory(category: CategoryResponse): void {}

  deleteCategory(category: CategoryResponse): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
