import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule,NgbPaginationModule  } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from 'ngx-tinymce';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { VariedadesProductoComponent } from './components/productos/variedades-producto/variedades-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { EditCuponComponent } from './components/cupones/edit-cupon/edit-cupon.component';
import { ConfigComponent } from './components/config/config.component';
import { IndexVentasComponent } from './components/ventas/index-ventas/index-ventas.component';
import { ShowVentasComponent } from './components/ventas/show-ventas/show-ventas.component';
import { CreateVentasComponent } from './components/ventas/create-ventas/create-ventas.component';
import { IndexAdminsComponent } from './components/admins/index-admins/index-admins.component';
import { CreateAdminComponent } from './components/admins/create-admin/create-admin.component';
import { EditAdminComponent } from './components/admins/edit-admin/edit-admin.component';
import { ChangePassAdminComponent } from './components/admins/change-pass-admin/change-pass-admin.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexCategoriasComponent } from './components/categorias/index-categorias/index-categorias.component';
import { CreateCategoriaComponent } from './components/categorias/create-categoria/create-categoria.component';
import { EditCategoriaComponent } from './components/categorias/edit-categoria/edit-categoria.component';
import { IndexCatalogosComponent } from './components/catalogos/index-catalogos/index-catalogos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    TopnavComponent,
    IndexClientesComponent,
    IndexProductoComponent,
    CreateProductoComponent,
    EditProductoComponent,
    VariedadesProductoComponent,
    InventarioProductoComponent,
    GaleriaProductoComponent,
    IndexCuponComponent,
    CreateCuponComponent,
    EditCuponComponent,
    ConfigComponent,
    IndexVentasComponent,
    ShowVentasComponent,
    CreateVentasComponent,
    IndexAdminsComponent,
    CreateAdminComponent,
    EditAdminComponent,
    ChangePassAdminComponent,
    EditClienteComponent,
    IndexCategoriasComponent,
    CreateCategoriaComponent,
    EditCategoriaComponent,
    IndexCatalogosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
