import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataServices } from '../../../DataServices/client-data-services.service';
import { Client } from '../../../Models/Client';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private alertServices: AlertServices,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      id: '',
      name: ['', Validators.required],
      phoneNumber1: String,
      phoneNumber2: String,
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      maritalStatus: String,
      sex: String,
      rg: null,
      dispatchingAgency: null,

      referenceName1: null,
      referenceName2: null,
      referenceName3: null,

      referencePhone1: String,
      referencePhone2: String,
      referencePhone3: String,
      
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
      this.router.navigate(['/admin/clientes'], { relativeTo: this.route });
    }
  }
}
