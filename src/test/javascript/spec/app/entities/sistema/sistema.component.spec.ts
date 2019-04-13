/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { SistemaComponent } from 'app/entities/sistema/sistema.component';
import { SistemaService } from 'app/entities/sistema/sistema.service';
import { Sistema } from 'app/shared/model/sistema.model';

describe('Component Tests', () => {
    describe('Sistema Management Component', () => {
        let comp: SistemaComponent;
        let fixture: ComponentFixture<SistemaComponent>;
        let service: SistemaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SistemaComponent],
                providers: []
            })
                .overrideTemplate(SistemaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SistemaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SistemaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Sistema(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sistemas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
