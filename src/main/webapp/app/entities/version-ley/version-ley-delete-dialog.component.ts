import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersionLey } from 'app/shared/model/version-ley.model';
import { VersionLeyService } from './version-ley.service';

@Component({
    selector: 'jhi-version-ley-delete-dialog',
    templateUrl: './version-ley-delete-dialog.component.html'
})
export class VersionLeyDeleteDialogComponent {
    versionLey: IVersionLey;

    constructor(
        protected versionLeyService: VersionLeyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.versionLeyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'versionLeyListModification',
                content: 'Deleted an versionLey'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-ley-delete-popup',
    template: ''
})
export class VersionLeyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ versionLey }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VersionLeyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.versionLey = versionLey;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/version-ley', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/version-ley', { outlets: { popup: null } }]);
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
