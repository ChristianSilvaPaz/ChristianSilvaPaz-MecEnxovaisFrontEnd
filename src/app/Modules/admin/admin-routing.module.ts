import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { CategoryListComponent } from './Components/Category/category-list/category-list.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ClientCreateComponent } from './Components/Client/client-create/client-create.component';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminComponent,
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'categorias', component: CategoryListComponent },
      { path: 'produtos', component: ProductListComponent },
      { path: 'clientes/cadastrar', component: ClientCreateComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
