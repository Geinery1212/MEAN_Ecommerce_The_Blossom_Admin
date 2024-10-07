import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-change-pass-admin',
  templateUrl: './change-pass-admin.component.html',
  styleUrls: ['./change-pass-admin.component.css']
})
export class ChangePassAdminComponent implements OnInit {
  public load_btn = false;
  public admin: any = {};
  public id: any;
  public token: any;
  public page_title: any;
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token');
    this.page_title = 'Actualizar contraseña de @'+localStorage.getItem('id_pass');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.admin = {
          _id: this.id
        }
      }
    );
  }
  registro(passForm: any) {
    if (!passForm.valid) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text.danger',
        position: 'topRight',
        message: 'Campos vacios'
      });
    } else if (this.admin.password1 != this.admin.password2) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text.danger',
        position: 'topRight',
        message: 'Las contraseñas nuevas no coinciden'
      });
    } else {
      if (this.admin.estado_pass) {
        let data = {
          password: '',
          password2: this.admin.password2
        }
        this._adminService.cambiar_pass_admin_seleccionado(this.id, data, this.token).subscribe({
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
              this.admin = {};
            } else {
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                class: 'text.success',
                position: 'topRight',
                message: 'Contraseña actualizada correctamente.'
              });
              this.admin = {};
            }
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        let data = {
          password: this.admin.password,
          password2: this.admin.password2
        }
        this._adminService.cambiar_pass_admin_seleccionado(this.id, data, this.token).subscribe({
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
              this.admin = {};
            } else {
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                class: 'text.success',
                position: 'topRight',
                message: 'Contraseña actualizada correctamente.'
              });
              this.admin = {};
            }
          },
          error: (error) => {
            console.log(error);
          }
        });
      }

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
