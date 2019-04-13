/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { AceptaLeyDeleteDialogComponent } from 'app/entities/acepta-ley/acepta-ley-delete-dialog.component';
import { AceptaLeyService } from 'app/entities/acepta-ley/acepta-ley.service';

describe('Component Tests', () => {
    describe('AceptaLey Management Delete Component', () => {
        let comp: AceptaLeyDeleteDialogComponent;
        let fixture: ComponentFixture<AceptaLeyDeleteDialogComponent>;
        let service: AceptaLeyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AceptaLeyDeleteDialogComponent]
            })
                .overrideTemplate(AceptaLeyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AceptaLeyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceptaLeyService);
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
