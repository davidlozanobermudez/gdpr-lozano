/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { ContactoSubscripcionDeleteDialogComponent } from 'app/entities/contacto-subscripcion/contacto-subscripcion-delete-dialog.component';
import { ContactoSubscripcionService } from 'app/entities/contacto-subscripcion/contacto-subscripcion.service';

describe('Component Tests', () => {
    describe('ContactoSubscripcion Management Delete Component', () => {
        let comp: ContactoSubscripcionDeleteDialogComponent;
        let fixture: ComponentFixture<ContactoSubscripcionDeleteDialogComponent>;
        let service: ContactoSubscripcionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [ContactoSubscripcionDeleteDialogComponent]
            })
                .overrideTemplate(ContactoSubscripcionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactoSubscripcionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoSubscripcionService);
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
