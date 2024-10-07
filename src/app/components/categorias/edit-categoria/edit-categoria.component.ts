import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
@Component({
  selector: 'app-create-categoria',
  templateUrl: '../create-categoria/create-categoria.component.html',
})
export class EditCategoriaComponent implements OnInit {
  public page_title: any;
  public btn_title: any;
  public categoria: any = {}
  public token = localStorage.getItem('token');
  public load_btn = false;
  public id = '';
  public load_data = true;
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);

        this._adminService.obtener_categoria_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.categoria = undefined;
              this.load_data = false;
            } else {
              this.categoria = response.data;
              this.load_data = false;
              this.page_title = 'Estás actualizando a la categoría: ' + response.data.titulo
              this.btn_title = 'Actualizar';
            }

          }
        )
      }
    )
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.load_btn = true;
      let data = {
        titulo: this.categoria.titulo.trim()
      }
      this._adminService.actualizar_categoria_admin(this.id, data, this.token).subscribe(
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
            this._router.navigate(['/categorias']);
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
