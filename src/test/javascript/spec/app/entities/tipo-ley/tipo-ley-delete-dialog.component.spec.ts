/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GdprLozanoTestModule } from '../../../test.module';
import { TipoLeyDeleteDialogComponent } from 'app/entities/tipo-ley/tipo-ley-delete-dialog.component';
import { TipoLeyService } from 'app/entities/tipo-ley/tipo-ley.service';

describe('Component Tests', () => {
    describe('TipoLey Management Delete Component', () => {
        let comp: TipoLeyDeleteDialogComponent;
        let fixture: ComponentFixture<TipoLeyDeleteDialogComponent>;
        let service: TipoLeyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TipoLeyDeleteDialogComponent]
            })
                .overrideTemplate(TipoLeyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoLeyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoLeyService);
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
