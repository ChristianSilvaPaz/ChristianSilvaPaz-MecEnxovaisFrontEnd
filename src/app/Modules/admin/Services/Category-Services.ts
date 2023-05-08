import { Injectable } from '@angular/core';
import { CategoryDataServices } from '../DataServices/category-data-services.service';
import { CategoryResponse } from '../Models/Category/CategoryResponse';
import { CategoryCreate } from '../Models/Category/CategoryCreate';

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  constructor(private categoryDataServices: CategoryDataServices) {}

  async get(): Promise<CategoryResponse[]> {
    let response = await this.categoryDataServices.get();

    if (response.status != 200) return new Array<CategoryResponse>();

    let list = await response.json();
    return list;
    /*return list.sort((a: { id: any; }, b: { id: any; }) => {
      if (a.id! < b.id!) return 1;
      else return -1;
    });*/
  }

  async create(name: string) {
    let category: CategoryCreate = { name: name };
    return await this.categoryDataServices.create(category);
  }
}
