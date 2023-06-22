import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { CategoryListComponent } from './Components/Category/category-list/category-list.component';
import { ProductListComponent } from './Components/Product/product-list/product-list.component';
import { ClientCreateComponent } from './Components/Client/client-create/client-create.component';
import { ClientListComponent } from './Components/Client/client-list/client-list.component';
import { SaleListComponent } from './Components/Sale/sale-list/sale-list.component';
import { ClientUpdateComponent } from './Components/Client/client-update/client-update.component';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminComponent,
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'categorias', component: CategoryListComponent },
      { path: 'produtos', component: ProductListComponent },
      { path: 'clientes', component: ClientListComponent},
      { path: 'clientes/cadastrar', component: ClientCreateComponent},
      { path: 'clientes/:id/atualizar', component: ClientUpdateComponent},
      { path: 'vendas', component: SaleListComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
