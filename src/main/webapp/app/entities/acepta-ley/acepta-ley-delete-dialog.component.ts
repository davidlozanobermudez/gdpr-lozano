import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAceptaLey } from 'app/shared/model/acepta-ley.model';
import { AceptaLeyService } from './acepta-ley.service';

@Component({
    selector: 'jhi-acepta-ley-delete-dialog',
    templateUrl: './acepta-ley-delete-dialog.component.html'
})
export class AceptaLeyDeleteDialogComponent {
    aceptaLey: IAceptaLey;

    constructor(
        protected aceptaLeyService: AceptaLeyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aceptaLeyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'aceptaLeyListModification',
                content: 'Deleted an aceptaLey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acepta-ley-delete-popup',
    template: ''
})
export class AceptaLeyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aceptaLey }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AceptaLeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.aceptaLey = aceptaLey;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/acepta-ley', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/acepta-ley', { outlets: { popup: null } }]);
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
