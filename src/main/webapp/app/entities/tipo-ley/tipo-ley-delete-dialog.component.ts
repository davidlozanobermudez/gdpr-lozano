import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoLey } from 'app/shared/model/tipo-ley.model';
import { TipoLeyService } from './tipo-ley.service';

@Component({
    selector: 'jhi-tipo-ley-delete-dialog',
    templateUrl: './tipo-ley-delete-dialog.component.html'
})
export class TipoLeyDeleteDialogComponent {
    tipoLey: ITipoLey;

    constructor(protected tipoLeyService: TipoLeyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoLeyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoLeyListModification',
                content: 'Deleted an tipoLey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-ley-delete-popup',
    template: ''
})
export class TipoLeyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoLey }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoLeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tipoLey = tipoLey;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tipo-ley', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tipo-ley', { outlets: { popup: null } }]);
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
