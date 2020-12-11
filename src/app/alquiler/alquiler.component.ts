import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Bicicleta } from './bicicleta';
import { AlquilerService } from 'app/services/alquier-service';
import { Alquiler } from './alquiler';

@Component({
    selector: 'alquiler',
    templateUrl: './alquiler.component.html',
    styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit {

    bicicletas: Array<Bicicleta>;
    alquilerDesactivado: boolean;
    constructor(public dialog: MatDialog, private alquilerService: AlquilerService) {
        this.alquilerDesactivado = true;
    }

    ngOnInit() {
        this.alquilerService.getBicicletas().subscribe(bicis => {
            if (!bicis.length) {
                return [];
            }
            this.bicicletas = bicis;
        });
    }

    openDialog(bicicleta: Bicicleta): void {
        let alquiler: Alquiler;
        alquiler = {bicycle_id:bicicleta.id, user_id: 1};
        this.alquilerDesactivado = false;
        this.alquilerService.postAlquiler(alquiler).then((res) => {
            alquiler.id  = res;
        });
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '500px',
            data: { mensaje: `Alquiler Activo desde : ${new Date().toLocaleString()}`, accion: 'Terminar' }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.alquilerDesactivado = true;
            this.alquilerService.putAlquiler(alquiler).then((response) => {
                let valorCobro = response.total_value;
                let totalTiempo = response.total_minutes;
                const dialogRefCobro = this.dialog.open(ModalComponent, {
                    width: '500px',
                    data: { mensaje: `El tiempo de alquiler fue de ${totalTiempo} minutos. Debe pagar un total de : $${valorCobro}`, accion: 'Pagar' }
                });
            });

        });
    }

}
