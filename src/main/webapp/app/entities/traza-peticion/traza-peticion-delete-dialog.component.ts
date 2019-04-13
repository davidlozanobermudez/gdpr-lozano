import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';
import { TrazaPeticionService } from './traza-peticion.service';

@Component({
    selector: 'jhi-traza-peticion-delete-dialog',
    templateUrl: './traza-peticion-delete-dialog.component.html'
})
export class TrazaPeticionDeleteDialogComponent {
    trazaPeticion: ITrazaPeticion;

    constructor(
        protected trazaPeticionService: TrazaPeticionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trazaPeticionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trazaPeticionListModification',
                content: 'Deleted an trazaPeticion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-traza-peticion-delete-popup',
    template: ''
})
export class TrazaPeticionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trazaPeticion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrazaPeticionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.trazaPeticion = trazaPeticion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/traza-peticion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/traza-peticion', { outlets: { popup: null } }]);
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
