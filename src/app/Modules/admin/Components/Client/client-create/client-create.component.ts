import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {
clientFormGroup!: FormGroup;
addressFormGroup!: FormGroup;
  
constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      id: "",
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
      referencePhone3: ['', Validators.required],
      dateRegistration: Date,
      dateUpdate: Date
    });

    this.addressFormGroup = this.fb.group({
      id: "",
      publicPlace: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      pointReference: ['', Validators.required],
      dateRegistration: Date,
      dateUpdate: Date,
      clienteId: ""
    });
  }
}
