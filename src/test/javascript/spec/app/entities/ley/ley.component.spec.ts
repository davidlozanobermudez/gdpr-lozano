/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { LeyComponent } from 'app/entities/ley/ley.component';
import { LeyService } from 'app/entities/ley/ley.service';
import { Ley } from 'app/shared/model/ley.model';

describe('Component Tests', () => {
    describe('Ley Management Component', () => {
        let comp: LeyComponent;
        let fixture: ComponentFixture<LeyComponent>;
        let service: LeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [LeyComponent],
                providers: []
            })
                .overrideTemplate(LeyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ley(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.leys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
