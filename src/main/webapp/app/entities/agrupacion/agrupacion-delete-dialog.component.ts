import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { AgrupacionService } from './agrupacion.service';

@Component({
    selector: 'jhi-agrupacion-delete-dialog',
    templateUrl: './agrupacion-delete-dialog.component.html'
})
export class AgrupacionDeleteDialogComponent {
    agrupacion: IAgrupacion;

    constructor(
        protected agrupacionService: AgrupacionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agrupacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agrupacionListModification',
                content: 'Deleted an agrupacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agrupacion-delete-popup',
    template: ''
})
export class AgrupacionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agrupacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgrupacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.agrupacion = agrupacion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/agrupacion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/agrupacion', { outlets: { popup: null } }]);
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
