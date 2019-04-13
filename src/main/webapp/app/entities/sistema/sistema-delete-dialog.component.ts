import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISistema } from 'app/shared/model/sistema.model';
import { SistemaService } from './sistema.service';

@Component({
    selector: 'jhi-sistema-delete-dialog',
    templateUrl: './sistema-delete-dialog.component.html'
})
export class SistemaDeleteDialogComponent {
    sistema: ISistema;

    constructor(protected sistemaService: SistemaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sistemaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sistemaListModification',
                content: 'Deleted an sistema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sistema-delete-popup',
    template: ''
})
export class SistemaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sistema }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SistemaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sistema = sistema;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/sistema', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/sistema', { outlets: { popup: null } }]);
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
