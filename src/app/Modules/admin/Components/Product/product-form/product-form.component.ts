import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponse } from '../../../Models/Category/CategoryResponse';
import { CategoryServices } from '../../../Services/Category-Services';
import { ProductDataServices } from '../../../DataServices/product-data-services.service';
import { AlertServices } from 'src/app/Shared/alert-services.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories!: CategoryResponse[];
  buttonSaveLabel = 'Cadastrar';
  form!: FormGroup;
  value = 0;

  constructor(
    private fb: FormBuilder,
    private categoryServices: CategoryServices,
    private productDataServices: ProductDataServices,
    private altertServices: AlertServices,
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.categories = await this.categoryServices.get();
  }

  saveProduct(): void {
    this.buttonSaveLabel == 'Cadastrar' ? this.create() : this.update();
  }

  async create(): Promise<void> {
    let response = await this.productDataServices.create(this.form.value);

    response.status != 200 ? this.altertServices.openAlertError() : this.altertServices.openAlertRegisteredSuccessfully();
  }

  async update(): Promise<void> {}

  resetForm(): void {}
}
