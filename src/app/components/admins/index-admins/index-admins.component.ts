import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;
@Component({
  selector: 'app-index-admins',
  templateUrl: './index-admins.component.html',
  styleUrls: ['./index-admins.component.css']
})
export class IndexAdminsComponent implements OnInit {

  public admins: Array<any> = [];
  public admins_const: Array<any> = [];
  public token = localStorage.getItem('token');
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  public cliente: any;
  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this._adminService.listar_admins_tienda(this.token).subscribe(
      response => {
        console.log(response);
        this.admins_const = response.data;
        this.admins = this.admins_const;
      }
    );
  }

  filtrar_cliente() {
    if (this.filtro) {
      var term = new RegExp(this.filtro.toString().trim(), 'i');
      this.admins = this.admins_const.filter(item => term.test(item.nombres) || term.test(item.apellidos) || term.test(item.email) || term.test(item.dni) || term.test(item.telefono) || term.test(item._id));
    } else {
      this.admins = this.admins_const;
    }
  }
  eliminar(id: any) {
    this._adminService.eliminar_admin_seleccionado(id, this.token).subscribe({
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
        this._adminService.listar_admins_tienda(this.token).subscribe(
          response => {
            console.log(response);
            this.admins_const = response.data;
            this.admins = this.admins_const;
          }
        );
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
