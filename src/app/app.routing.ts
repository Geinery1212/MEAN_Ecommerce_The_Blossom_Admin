import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { IndexClientesComponent } from "./components/clientes/index-clientes/index-clientes.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { EditProductoComponent } from "./components/productos/edit-producto/edit-producto.component";
import { VariedadesProductoComponent } from "./components/productos/variedades-producto/variedades-producto.component";
import { InventarioProductoComponent } from "./components/productos/inventario-producto/inventario-producto.component";
import { GaleriaProductoComponent } from "./components/productos/galeria-producto/galeria-producto.component";
import { AuthGuard } from "../app/guards/auth.guard";
import { IndexCuponComponent } from "./components/cupones/index-cupon/index-cupon.component";
import { CreateCuponComponent } from "./components/cupones/create-cupon/create-cupon.component";
import { EditCuponComponent } from "./components/cupones/edit-cupon/edit-cupon.component";
import { ConfigComponent } from "./components/config/config.component";
import { IndexVentasComponent } from "./components/ventas/index-ventas/index-ventas.component";
import { CreateVentasComponent } from "./components/ventas/create-ventas/create-ventas.component";
import { ShowVentasComponent } from "./components/ventas/show-ventas/show-ventas.component";
import { IndexAdminsComponent } from "./components/admins/index-admins/index-admins.component";
import { CreateAdminComponent } from "./components/admins/create-admin/create-admin.component";
import { EditAdminComponent } from "./components/admins/edit-admin/edit-admin.component";
import { ChangePassAdminComponent } from "./components/admins/change-pass-admin/change-pass-admin.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { IndexCategoriasComponent } from "./components/categorias/index-categorias/index-categorias.component";
import { CreateCategoriaComponent } from "./components/categorias/create-categoria/create-categoria.component";
import { EditCategoriaComponent } from "./components/categorias/edit-categoria/edit-categoria.component";
import { IndexCatalogosComponent } from "./components/catalogos/index-catalogos/index-catalogos.component";

const appRoute : Routes = [
    {path: '', redirectTo: 'login', pathMatch : 'full'},
    {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent},


    {path: 'clientes', component: IndexClientesComponent, canActivate:[AuthGuard]},
    {path: 'clientes/edit/:id', component: EditClienteComponent, canActivate:[AuthGuard]},
    {path: 'admins', component: IndexAdminsComponent, canActivate:[AuthGuard]},
    {path: 'admins/registro', component: CreateAdminComponent, canActivate:[AuthGuard]},
    {path: 'admins/edit/:id', component: EditAdminComponent, canActivate:[AuthGuard]},
    {path: 'admins/edit/pass/:id', component: ChangePassAdminComponent, canActivate:[AuthGuard]},

    {path: 'catalogos', component: IndexCatalogosComponent, canActivate:[AuthGuard]},

    {path: 'productos', component: IndexProductoComponent, canActivate:[AuthGuard]},
    {path: 'productos/create', component: CreateProductoComponent, canActivate:[AuthGuard]},
    {path: 'productos/edit/:id', component: EditProductoComponent, canActivate:[AuthGuard]},
    {path: 'productos/variedades/:id', component: VariedadesProductoComponent, canActivate:[AuthGuard]},
    {path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate:[AuthGuard]},
    {path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate:[AuthGuard]},

    {path: 'cupones', component: IndexCuponComponent, canActivate:[AuthGuard]},
    {path: 'cupones/create', component: CreateCuponComponent, canActivate:[AuthGuard]},
    {path: 'cupones/edit/:id', component: EditCuponComponent, canActivate:[AuthGuard]},

    {path: 'categorias', component: IndexCategoriasComponent, canActivate:[AuthGuard]},
    {path: 'categorias/create', component: CreateCategoriaComponent, canActivate:[AuthGuard]},
    {path: 'categorias/edit/:id', component: EditCategoriaComponent, canActivate:[AuthGuard]},

    {path: 'ventas', component: IndexVentasComponent, canActivate:[AuthGuard]},
    {path: 'ventas/create', component: CreateVentasComponent, canActivate:[AuthGuard]},
    {path: 'ventas/:id', component: ShowVentasComponent, canActivate:[AuthGuard]},

    {path: 'configuraciones', component: ConfigComponent, canActivate:[AuthGuard]},
    /* {path: '**', component: NotFoundComponent}, */
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> =  RouterModule.forRoot(appRoute);
