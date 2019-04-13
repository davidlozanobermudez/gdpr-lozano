import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

@Component({
    selector: 'jhi-contacto-subscripcion-detail',
    templateUrl: './contacto-subscripcion-detail.component.html'
})
export class ContactoSubscripcionDetailComponent implements OnInit {
    contactoSubscripcion: IContactoSubscripcion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactoSubscripcion }) => {
            this.contactoSubscripcion = contactoSubscripcion;
        });
    }

    previousState() {
        window.history.back();
    }
}
