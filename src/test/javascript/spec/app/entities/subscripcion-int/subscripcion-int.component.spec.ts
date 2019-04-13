/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionIntComponent } from 'app/entities/subscripcion-int/subscripcion-int.component';
import { SubscripcionIntService } from 'app/entities/subscripcion-int/subscripcion-int.service';
import { SubscripcionInt } from 'app/shared/model/subscripcion-int.model';

describe('Component Tests', () => {
    describe('SubscripcionInt Management Component', () => {
        let comp: SubscripcionIntComponent;
        let fixture: ComponentFixture<SubscripcionIntComponent>;
        let service: SubscripcionIntService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionIntComponent],
                providers: []
            })
                .overrideTemplate(SubscripcionIntComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionIntComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionIntService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubscripcionInt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subscripcionInts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
