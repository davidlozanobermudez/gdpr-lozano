/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { AgrupacionDeleteDialogComponent } from 'app/entities/agrupacion/agrupacion-delete-dialog.component';
import { AgrupacionService } from 'app/entities/agrupacion/agrupacion.service';

describe('Component Tests', () => {
    describe('Agrupacion Management Delete Component', () => {
        let comp: AgrupacionDeleteDialogComponent;
        let fixture: ComponentFixture<AgrupacionDeleteDialogComponent>;
        let service: AgrupacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AgrupacionDeleteDialogComponent]
            })
                .overrideTemplate(AgrupacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgrupacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgrupacionService);
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
