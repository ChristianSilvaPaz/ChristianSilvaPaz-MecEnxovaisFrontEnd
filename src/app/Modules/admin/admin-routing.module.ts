import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { CategoryListComponent } from './Components/Category/category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminComponent,
    children: [{ path: '', component: CategoryListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
