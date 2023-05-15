import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import ApiSettings from 'src/app/Shared/ApiSettings';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductDataServices {
  constructor(private settings: ApiSettings) {}

  async get(): Promise<Response> {
    return await fetch(`${environment.urlAPI}Product`, this.settings.get());
  }

  async create(product: Product): Promise<Response> {
    return await fetch(`${environment.urlAPI}Product`, this.settings.post(product));
  }

  async update(product: Product): Promise<Response> {
    return await fetch(`${environment.urlAPI}Product/${product.id}`, this.settings.put(product));
  }

  async delete(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}Product/${id}`, this.settings.delete());
  }
}
