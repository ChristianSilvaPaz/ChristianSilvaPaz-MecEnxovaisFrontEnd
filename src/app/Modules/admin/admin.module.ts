import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CategoryFormComponent } from './Components/Category/category-form/category-form.component';
import { CategoryListComponent } from './Components/Category/category-list/category-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';

import { ProductFormComponent } from './Components/Product/product-form/product-form.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ClientCreateComponent } from './Components/Client/client-create/client-create.component';

@NgModule({
  declarations: [
    MenuAdminComponent,
    CategoryFormComponent,
    CategoryListComponent,
    ProductFormComponent,
    ProductListComponent,
    ClientCreateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule,
  ]
})
export class AdminModule { }
