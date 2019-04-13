/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionDeleteDialogComponent } from 'app/entities/subscripcion/subscripcion-delete-dialog.component';
import { SubscripcionService } from 'app/entities/subscripcion/subscripcion.service';

describe('Component Tests', () => {
    describe('Subscripcion Management Delete Component', () => {
        let comp: SubscripcionDeleteDialogComponent;
        let fixture: ComponentFixture<SubscripcionDeleteDialogComponent>;
        let service: SubscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionDeleteDialogComponent]
            })
                .overrideTemplate(SubscripcionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscripcionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionService);
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
