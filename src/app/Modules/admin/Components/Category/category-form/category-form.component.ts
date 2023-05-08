import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryResponse } from '../../../Models/Category/CategoryResponse';
import { CategoryServices } from '../../../Services/Category-Services';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  buttonSaveLabel = 'Cadastrar';
  form!: FormGroup;

  @Input() editingCategory!: CategoryResponse;
  @Output() updateList = new EventEmitter<Event>();

  constructor(private fb: FormBuilder, private categoryServices: CategoryServices) {}

  ngOnInit(): void {
    this.form = this.fb.group({name: ['', Validators.required]});
  }

  saveCategory(): void {
    this.buttonSaveLabel == 'Cadastrar' ? this.createCategory() : this.updateCategory();
  }

  async createCategory(): Promise<void> {
    let response = await this.categoryServices.create(this.form.controls['name'].value);

    //response.status != 200 ?
    //  this.sharedAlert.openAlertError() : this.sharedAlert.openAlertRegisteredSuccessfully();

    this.resetForm();
    this.updateList.emit();
  }

  async updateCategory(): Promise<void> {}

  resetForm(): void {
    this.buttonSaveLabel = 'Cadastrar';
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.setErrors(null);
    });
  }
}
