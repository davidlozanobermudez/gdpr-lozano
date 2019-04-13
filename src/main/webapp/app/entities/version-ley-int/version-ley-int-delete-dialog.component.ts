import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { VersionLeyIntService } from './version-ley-int.service';

@Component({
    selector: 'jhi-version-ley-int-delete-dialog',
    templateUrl: './version-ley-int-delete-dialog.component.html'
})
export class VersionLeyIntDeleteDialogComponent {
    versionLeyInt: IVersionLeyInt;

    constructor(
        protected versionLeyIntService: VersionLeyIntService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.versionLeyIntService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'versionLeyIntListModification',
                content: 'Deleted an versionLeyInt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-ley-int-delete-popup',
    template: ''
})
export class VersionLeyIntDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ versionLeyInt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VersionLeyIntDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.versionLeyInt = versionLeyInt;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/version-ley-int', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/version-ley-int', { outlets: { popup: null } }]);
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
