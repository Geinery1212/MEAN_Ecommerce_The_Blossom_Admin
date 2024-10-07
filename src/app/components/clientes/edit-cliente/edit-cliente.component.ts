import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  public cliente: any = {};
  public contrasena_activa = true;
  public load_btn = false;
  public id: any;
  public token: any;
  public page_title: any;
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._adminService.obtener_cliente_seleccionado(this.id, this.token).subscribe({
          next: (response) => {
            if (response.data == undefined) {
              this.cliente = undefined;
              this.load_btn = false;
            } else {
              localStorage.setItem('id_pass', response.data.nombres + ' ' + response.data.apellidos);
              this.page_title = 'Actualizar cliente @' + response.data.nombres + ' ' + response.data.apellidos;
            }
          }
        });
      }
    );
  }
  actualizar(actualizarForm: any) {
    if (!actualizarForm.valid) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text.danger',
        position: 'topRight',
        message: 'Campos vacios'
      });
    } else if (this.cliente.password != this.cliente.password2) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text.danger',
        position: 'topRight',
        message: 'Las contraseñas nuevas no coinciden'
      });
    } else {
      this._adminService.cambiar_pass_cliente_seleccionado(this.id, this.cliente, this.token).subscribe({
        next: (response) => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#ff0000',
              color: '#fff',
              class: 'text.danger',
              position: 'topRight',
              message: response.message
            });
            this.cliente = {};
          } else {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#fff',
              class: 'text.success',
              position: 'topRight',
              message: 'Contraseña actualizada correctamente.'
            });
            this.cliente = {};
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }


  view_password(id_pass: any,) {
    let type = $(id_pass).attr('type');

    if (type == 'text') {
      $(id_pass).attr('type', 'password');

    } else if (type == 'password') {
      $(id_pass).attr('type', 'text');
    }
  }

}
