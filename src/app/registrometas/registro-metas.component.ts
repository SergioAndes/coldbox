import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { RegistroMetasService } from 'app/services/registro-metas.service';

@Component({
  selector: 'registro-metas',
  templateUrl: './registro-metas.component.html',
  styleUrls: ['./registro-metas.component.css']
})
export class RegistroMetasComponent implements OnInit {


  metasForm: FormGroup;

  constructor(public dialog: MatDialog, private registroMetasService: RegistroMetasService) { }

  ngOnInit() {
    this.metasForm = new FormGroup({
        km_recorridos: new FormControl(null, Validators.required),
        tiempo: new FormControl(null, Validators.required),
        velocidad_promedio: new FormControl(null, Validators.required),
        fecha: new FormControl(null, Validators.required),
        coordenadas_inicio: new FormControl(null),
        coordenadas_fin: new FormControl(null)
      });
  }

  registerRecord(){
      let meta = this.metasForm.value;
      //TODO post con metas
      this.registroMetasService.postMeta(meta);
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: { mensaje: 'Tu nueva meta deportiva ha sido guardada. Felicitaciones!', accion: 'Terminar' }
    });
  }

}
