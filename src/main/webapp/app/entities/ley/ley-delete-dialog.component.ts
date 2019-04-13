import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILey } from 'app/shared/model/ley.model';
import { LeyService } from './ley.service';

@Component({
    selector: 'jhi-ley-delete-dialog',
    templateUrl: './ley-delete-dialog.component.html'
})
export class LeyDeleteDialogComponent {
    ley: ILey;

    constructor(protected leyService: LeyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'leyListModification',
                content: 'Deleted an ley'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ley-delete-popup',
    template: ''
})
export class LeyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ley }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ley = ley;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ley', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ley', { outlets: { popup: null } }]);
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
