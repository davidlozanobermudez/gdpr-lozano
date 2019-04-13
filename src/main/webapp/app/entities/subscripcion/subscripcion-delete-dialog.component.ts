import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { SubscripcionService } from './subscripcion.service';

@Component({
    selector: 'jhi-subscripcion-delete-dialog',
    templateUrl: './subscripcion-delete-dialog.component.html'
})
export class SubscripcionDeleteDialogComponent {
    subscripcion: ISubscripcion;

    constructor(
        protected subscripcionService: SubscripcionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscripcionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subscripcionListModification',
                content: 'Deleted an subscripcion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscripcion-delete-popup',
    template: ''
})
export class SubscripcionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubscripcionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subscripcion = subscripcion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/subscripcion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/subscripcion', { outlets: { popup: null } }]);
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
