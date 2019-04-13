import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';
import { ContactoSubscripcionService } from './contacto-subscripcion.service';

@Component({
    selector: 'jhi-contacto-subscripcion-delete-dialog',
    templateUrl: './contacto-subscripcion-delete-dialog.component.html'
})
export class ContactoSubscripcionDeleteDialogComponent {
    contactoSubscripcion: IContactoSubscripcion;

    constructor(
        protected contactoSubscripcionService: ContactoSubscripcionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactoSubscripcionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactoSubscripcionListModification',
                content: 'Deleted an contactoSubscripcion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contacto-subscripcion-delete-popup',
    template: ''
})
export class ContactoSubscripcionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactoSubscripcion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactoSubscripcionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactoSubscripcion = contactoSubscripcion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contacto-subscripcion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/contacto-subscripcion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
