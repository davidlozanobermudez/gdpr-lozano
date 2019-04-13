/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionIntDeleteDialogComponent } from 'app/entities/subscripcion-int/subscripcion-int-delete-dialog.component';
import { SubscripcionIntService } from 'app/entities/subscripcion-int/subscripcion-int.service';

describe('Component Tests', () => {
    describe('SubscripcionInt Management Delete Component', () => {
        let comp: SubscripcionIntDeleteDialogComponent;
        let fixture: ComponentFixture<SubscripcionIntDeleteDialogComponent>;
        let service: SubscripcionIntService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionIntDeleteDialogComponent]
            })
                .overrideTemplate(SubscripcionIntDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscripcionIntDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionIntService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
