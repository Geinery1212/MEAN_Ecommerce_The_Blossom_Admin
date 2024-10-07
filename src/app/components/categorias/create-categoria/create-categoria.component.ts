import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit {
  public page_title = 'Registro de una nueva categoría';
  public id = '';
  public categoria: any = {};
  public token = localStorage.getItem('token');
  public load_btn = false;
  public load_data = true;
  public btn_title = 'Crear';

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.load_btn = true;
      let data = {
        titulo: this.categoria.titulo.trim()
      }
      this._adminService.registro_categoria_admin(data, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
            this.load_btn = false;
            this._router.navigate(['/categorias/create']);
          } else {
            iziToast.show({
              title: 'EXITO',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: response.message
            });
            this.load_btn = false;
            this._router.navigate(['/categorias']);
          }
        },
        error => {
          console.log(error);
          this.load_btn = false;
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}
