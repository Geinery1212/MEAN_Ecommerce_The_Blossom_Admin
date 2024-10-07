import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;
@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit {

  public clientes: Array<any> = [];
  public clientes_const: Array<any> = [];
  public token = localStorage.getItem('token');
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this._adminService.listar_clientes_tienda(this.token).subscribe(
      response => {
        console.log(response);

        this.clientes_const = response.data;
        this.clientes = this.clientes_const;
      }
    );
  }

  filtrar_cliente() {
    if (this.filtro) {
      var term = new RegExp(this.filtro.toString().trim(), 'i');
      this.clientes = this.clientes_const.filter(item => term.test(item.nombres) || term.test(item.apellidos) || term.test(item.email) || term.test(item.dni) || term.test(item.telefono) || term.test(item._id));
    } else {
      this.clientes = this.clientes_const;
    }
  }

  eliminar(id: any) {
    this._adminService.eliminar_cliente_seleccionado(id, this.token).subscribe({
      next: (response) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#fff',
          class: 'text.success',
          position: 'topRight',
          message: 'Se elimino correctamente el administrador.'
        });
        // JQuery
        // Aquí cerramos el modal de bootstrap
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this._adminService.listar_clientes_tienda(this.token).subscribe(
          response => {
            console.log(response);

            this.clientes_const = response.data;
            this.clientes = this.clientes_const;
          }
        );
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
