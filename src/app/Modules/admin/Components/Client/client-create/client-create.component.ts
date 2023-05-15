import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataServices } from '../../../DataServices/client-data-services.service';
import { Client } from '../../../Models/Client';
import { AlertServices } from 'src/app/Shared/alert-services.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {
  clientFormGroup!: FormGroup;
  addressFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientDataServices: ClientDataServices,
    private alertServices: AlertServices
  ) {}

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      id: '',
      name: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      phoneNumber2: Number,
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      sex: ['', Validators.required],
      rg: ['', Validators.required],
      dispatchingAgency: ['', Validators.required],
      referencePhone1: ['', Validators.required],
      referencePhone2: ['', Validators.required],
      referencePhone3: Number,
      dateRegistration: '',
      dateUpdate: '',
    });

    this.addressFormGroup = this.fb.group({
      id: '',
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      pointReference: ['', Validators.required],
      dateRegistration: '',
      dateUpdate: '',
      clienteId: '',
    });
  }

  async create(): Promise<void> {
    let client: Client = this.clientFormGroup.value;
    client.address = this.addressFormGroup.value;

    let response = await this.clientDataServices.create(client);

    if (response.status != 200) this.alertServices.openAlertError();
    
    else {
      this.alertServices.openAlertRegisteredSuccessfully();
    }
  }
}
