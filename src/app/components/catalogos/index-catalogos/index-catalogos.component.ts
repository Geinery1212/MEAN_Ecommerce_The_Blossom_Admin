import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

declare var iziToast: any;
declare var $: any;

@Component({
  selector: 'app-index-catalogos',
  templateUrl: './index-catalogos.component.html',
  styleUrls: ['./index-catalogos.component.css']
})
export class IndexCatalogosComponent implements OnInit {

  public catalogos: Array<any> = [];
  public categorias_const: Array<any> = [];
  public token = localStorage.getItem('token');
  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public load = false;
  constructor(
    private _adminService: AdminService
  ) { }


  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.load = true;
    this._adminService.obtener_catalogos(this.token).subscribe(
      response => {
        this.catalogos = response.data;
        console.log(this.catalogos);
      }
    );
  }

  filtrar_categorias() {

  }

  obtener_detalle_catalogo(){

  }

  eliminar(id: any) {
    this._adminService.eliminar_categoria_admin(id, this.token).subscribe(
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
        } else {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se eliminó correctamente la categoría.'
          });
        }
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').remove();
        console.log(response.data);
        this.init_data();

      },
      error => {
        console.log(error);

      }
    );

  }

}
