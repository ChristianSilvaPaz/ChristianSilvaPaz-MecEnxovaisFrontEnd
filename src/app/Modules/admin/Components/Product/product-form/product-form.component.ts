import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDataServices } from '../../../DataServices/product-data-services.service';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import { CategoryDataServices } from '../../../DataServices/category-data-services.service';
import { Product } from '../../../Models/Product';
import { Category } from '../../../Models/Category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories!: Category[];
  buttonSaveLabel = 'Cadastrar';
  form!: FormGroup;
  value = 0;

  @Input() editingProduct!: Product;
  @Output() updateList = new EventEmitter<Event>();

  constructor(
    private fb: FormBuilder,
    private categoryDataServices: CategoryDataServices,
    private productDataServices: ProductDataServices,
    private alertServices: AlertServices
  ) {}
 
  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      id: "",
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      dateRegistration: "",
      dateUpdate: "",
      categoryId: ['', Validators.required],
    });

    let response = await this.categoryDataServices.get();

    if (response.status != 200) this.categories = new Array<Category>();
    
    else this.categories = await response.json();
  }

  ngOnChanges(): void {
    if (typeof this.editingProduct != 'undefined') {
      this.form.setValue(this.editingProduct);
      this.buttonSaveLabel = 'Atualizar';
    }
  }

  saveProduct(): void {
    this.buttonSaveLabel == 'Cadastrar' ? this.create() : this.update();
  }

  async create(): Promise<void> {
    let response = await this.productDataServices.create(this.form.value);

    if (response.status != 200) this.alertServices.openAlertError();
    
    else {
      this.alertServices.openAlertRegisteredSuccessfully();
      this.resetForm();
      this.updateList.emit();
    }
  }

  async update(): Promise<void> {
    let response = await this.productDataServices.update(this.form.value);

    if (response.status != 200) this.alertServices.openAlertError();
    
    else {
      this.alertServices.openAlertUpdateSuccessfully();
      this.resetForm();
      this.updateList.emit();
    }
  }

  resetForm(): void {
    this.buttonSaveLabel = 'Cadastrar';
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.setErrors(null);
    });
  }
}
