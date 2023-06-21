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

  async create(Client: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client`, this.settings.post(Client));
  }

  async update(Client: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}Client/${Client.id}`, this.settings.put(Client));
  }

  async delete(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}CLient/${id}`, this.settings.delete());
  }
}