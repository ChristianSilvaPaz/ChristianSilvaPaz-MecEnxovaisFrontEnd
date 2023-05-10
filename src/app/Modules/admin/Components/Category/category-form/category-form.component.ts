import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponse } from '../../../Models/Category/CategoryResponse';
import { CategoryServices } from '../../../Services/Category-Services';
import { AlertServices } from 'src/app/Shared/alert-services.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  buttonSaveLabel = 'Cadastrar';
  form!: FormGroup;

  @Input() editingCategory!: CategoryResponse;
  @Output() updateList = new EventEmitter<Event>();

  constructor(private fb: FormBuilder, private categoryServices: CategoryServices, private alertServices: AlertServices) {}

  ngOnInit(): void {
    this.form = this.fb.group({name: ['', Validators.required]});
  }

  ngOnChanges(): void {
    if(typeof this.editingCategory  != 'undefined')
      this.loadFormUpdateCategory(this.editingCategory); 
  }

  saveCategory(): void {
    this.buttonSaveLabel == 'Cadastrar' ? this.createCategory() : this.updateCategory();
  }

  async createCategory(): Promise<void> {
    let response = await this.categoryServices.create(this.form.controls['name'].value);

    response.status != 200 ?
      this.alertServices.openAlertError() : this.alertServices.openAlertRegisteredSuccessfully();

    this.resetForm();
    this.updateList.emit();
  }

  async updateCategory(): Promise<void> {
    this.editingCategory.name = this.form.controls['name'].value;

    let response = await this.categoryServices.update(this.editingCategory);

    response.status != 204 ?
      this.alertServices.openAlertError() : this.alertServices.openAlertUpdateSuccessfully();
  
    this.resetForm();
    this.updateList.emit();
  }

  loadFormUpdateCategory(category: CategoryResponse): void {
    this.form.setValue({ 
      name: category.name,
    });

    this.buttonSaveLabel = 'Atualizar';
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
