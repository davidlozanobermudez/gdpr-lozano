/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { TrazaPeticionDeleteDialogComponent } from 'app/entities/traza-peticion/traza-peticion-delete-dialog.component';
import { TrazaPeticionService } from 'app/entities/traza-peticion/traza-peticion.service';

describe('Component Tests', () => {
    describe('TrazaPeticion Management Delete Component', () => {
        let comp: TrazaPeticionDeleteDialogComponent;
        let fixture: ComponentFixture<TrazaPeticionDeleteDialogComponent>;
        let service: TrazaPeticionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TrazaPeticionDeleteDialogComponent]
            })
                .overrideTemplate(TrazaPeticionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrazaPeticionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrazaPeticionService);
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
