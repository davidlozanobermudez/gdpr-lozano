import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';
import { SubscripcionIntService } from './subscripcion-int.service';

@Component({
    selector: 'jhi-subscripcion-int-delete-dialog',
    templateUrl: './subscripcion-int-delete-dialog.component.html'
})
export class SubscripcionIntDeleteDialogComponent {
    subscripcionInt: ISubscripcionInt;

    constructor(
        protected subscripcionIntService: SubscripcionIntService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscripcionIntService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subscripcionIntListModification',
                content: 'Deleted an subscripcionInt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subscripcion-int-delete-popup',
    template: ''
})
export class SubscripcionIntDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subscripcionInt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubscripcionIntDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subscripcionInt = subscripcionInt;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/subscripcion-int', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/subscripcion-int', { outlets: { popup: null } }]);
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
