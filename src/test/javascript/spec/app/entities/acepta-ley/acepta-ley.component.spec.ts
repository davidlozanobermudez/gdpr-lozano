/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { AceptaLeyComponent } from 'app/entities/acepta-ley/acepta-ley.component';
import { AceptaLeyService } from 'app/entities/acepta-ley/acepta-ley.service';
import { AceptaLey } from 'app/shared/model/acepta-ley.model';

describe('Component Tests', () => {
    describe('AceptaLey Management Component', () => {
        let comp: AceptaLeyComponent;
        let fixture: ComponentFixture<AceptaLeyComponent>;
        let service: AceptaLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AceptaLeyComponent],
                providers: []
            })
                .overrideTemplate(AceptaLeyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AceptaLeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceptaLeyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AceptaLey(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.aceptaLeys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
