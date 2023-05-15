import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertServices } from 'src/app/Shared/alert-services.service';
import { CategoryDataServices } from '../../../DataServices/category-data-services.service';
import { Category } from '../../../Models/Category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  buttonSaveLabel = 'Cadastrar';
  form!: FormGroup;

  @Input() editingCategory!: Category;
  @Output() updateList = new EventEmitter<Event>();

  constructor(private fb: FormBuilder, private categoryDataServices: CategoryDataServices, private alertServices: AlertServices) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: "",
      name: ['', Validators.required],
      dateRegistration: "",
      dateUpdate: "",
    })
  }

  ngOnChanges(): void {
    if(typeof this.editingCategory  != 'undefined') {
      this.form.setValue(this.editingCategory);
      this.buttonSaveLabel = 'Atualizar';
    }
  }

  saveCategory(): void {
    this.buttonSaveLabel == 'Cadastrar' ? this.create() : this.update();
  }

  async create(): Promise<void> {
    let response = await this.categoryDataServices.create(this.form.value);

    if (response.status != 200) this.alertServices.openAlertError();
    
    else {
      this.alertServices.openAlertRegisteredSuccessfully();
      this.resetForm();
      this.updateList.emit();
    }
  }

  async update(): Promise<void> {
    let response = await this.categoryDataServices.update(this.form.value);

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
