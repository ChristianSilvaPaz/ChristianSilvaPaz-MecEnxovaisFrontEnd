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

  async create(CLient: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}CLient`, this.settings.post(CLient));
  }

  async update(CLient: Client): Promise<Response> {
    return await fetch(`${environment.urlAPI}CLient/${CLient.id}`, this.settings.put(CLient));
  }

  async delete(id: string): Promise<Response> {
    return await fetch(`${environment.urlAPI}CLient/${id}`, this.settings.delete());
  }
}