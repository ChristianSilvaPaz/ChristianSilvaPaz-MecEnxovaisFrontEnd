import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import ApiSettings from 'src/app/Shared/ApiSettings';
import { CategoryCreate } from '../Models/Category/CategoryCreate';
import { CategoryResponse } from '../Models/Category/CategoryResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataServices {
  constructor(private settings: ApiSettings) {}

  async get(): Promise<Response> {
    return await fetch(`${environment.urlAPI}Category`, this.settings.get());
  }

  async create(category: CategoryCreate): Promise<Response> {
    return await fetch(`${environment.urlAPI}Category`, this.settings.post(category));
  }

  async update(category: CategoryResponse): Promise<Response> {
    return await fetch(`${environment.urlAPI}Category/${category.id}`, this.settings.put(category));
  }

  async delete(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}Category/${id}`, this.settings.delete());
  }
}
