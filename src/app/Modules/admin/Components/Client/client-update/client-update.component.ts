import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataServices } from '../../../DataServices/client-data-services.service';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../Models/Client';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit{
  clientFormGroup!: FormGroup;
  addressFormGroup!: FormGroup;
  clientId!: string;

  constructor(
    private fb: FormBuilder,
    private clientDataServices: ClientDataServices,
    private alertServices: AlertServices,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => (this.clientId = params['id'])); 

    this.clientFormGroup = this.fb.group({
      id: '',
      name: ['', Validators.required],
      phoneNumber1: null,
      phoneNumber2: null,
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      maritalStatus: null,
      sex: null,
      rg: null,
      dispatchingAgency: null,

      referenceName1: null,
      referenceName2: null,
      referenceName3: null,

      referencePhone1: null,
      referencePhone2: null,
      referencePhone3: null,
      
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
      clientId: '',
    });

    let response = await this.clientDataServices.getById(this.clientId);
    if (response.status != 200) this.alertServices.openAlertError();
    else {
      let client: Client = await response.json();
      this.addressFormGroup.setValue(client.address!);

      delete client.address;
      this.clientFormGroup.setValue(client);
    }
  }

  async update(): Promise<void> {
    let client: Client = this.clientFormGroup.value;
    client.address = this.addressFormGroup.value;

    let response = await this.clientDataServices.update(client);

    if (response.status != 200) this.alertServices.openAlertError();
    
    else {
      this.alertServices.openAlertUpdateSuccessfully();
      this.router.navigate(['/admin/clientes'], { relativeTo: this.route });
    }
  }
}
