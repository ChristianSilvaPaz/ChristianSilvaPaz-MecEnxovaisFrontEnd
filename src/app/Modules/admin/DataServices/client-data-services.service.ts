import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import ApiSettings from 'src/app/Shared/ApiSettings';
import { Client } from '../Models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientDataServices {
  constructor(private settings: ApiSettings) {}

  async get(): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client`, this.settings.get());
  }

  async getById(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client/${id}`, this.settings.get());
  }

  async create(client: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client`, this.settings.post(client));
  }

  async update(client: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client/${client.id}`, this.settings.put(client));
  }

  async delete(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client/${id}`, this.settings.delete());
  }
}