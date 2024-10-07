import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  public page_title: string;
  public button_title: string;
  public spin_title: string;
  public contrasena_activa = true;
  public fecha_inicio_defecto: any = new Date();
  public admin: any = {
    estado_cuenta: true,
    fecha_inicio: this.convertir_fecha(this.fecha_inicio_defecto),
    fecha_fin: this.convertir_fecha(this.fecha_inicio_defecto, 5)
  };
  public token: any;
  public load_btn = false;
  // aqui lo colocamos a falso para que no pase eso al Registrar
  // dado que andamos reutilizando la vista
  public load_data = false;

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.page_title = 'Registrar administrador';
    this.button_title = 'Crear';
    this.spin_title = 'Creando...';
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {

  }
  convertir_fecha(fecha: any, aumentar: number = 0) {
    let date = fecha;
    let dia = new Date(date).getDate();
    let mes = new Date(date).getMonth() + 1;
    let anio = new Date(date).getFullYear();

    let dia_conv: any;
    let mes_conv: any;
    if (aumentar > 0) {
      dia += aumentar;
    }
    if (dia < 10) {
      dia_conv = '0' + dia;
    } else {
      dia_conv = dia;
    }
    if (mes < 10) {
      mes_conv = '0' + mes;
    } else {
      mes_conv = mes;
    }

    return (anio + '-' + mes_conv + '-' + dia_conv);
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      let fecha_actual = new Date();
      let fecha_actual_convertida = this.convertir_fecha(fecha_actual);

      if (this.admin.fecha_inicio < fecha_actual_convertida) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text.danger',
          position: 'topRight',
          message: 'La fecha de inicio no debe ser menor a la fecha actual'
        });
      }
      if (this.admin.fecha_fin < this.admin.fecha_inicio) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text.danger',
          position: 'topRight',
          message: 'La fecha de fin no debe ser menor a la fecha inicio'
        });
      }
      if (this.admin.fecha_inicio >= fecha_actual_convertida && this.admin.fecha_fin >= this.admin.fecha_inicio) {
        this.load_btn = true;
        console.log(this.admin);
        this.admin.email = this.admin.email.toLowerCase();
        this._adminService.registro_admin_tienda(this.admin, this.token).subscribe({
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
              this.load_btn = false;
            } else {
              iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                class: 'text.success',
                position: 'topRight',
                message: 'Se registro correctamente el nuevo administrador.'
              });
              this.admin = {
                nombres: '',
                apellidos: '',
                email: '',
                password: ''
              }
              this._router.navigate(['/admins']);
            }

          },
          error: (error) => {
            console.log(error);
          }
        });
      }

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text.danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }


  view_password(){
    let type = $('#password').attr('type');

    if(type == 'text'){
      $('#password').attr('type','password');

    }else if(type == 'password'){
      $('#password').attr('type','text');
    }
  }

}
