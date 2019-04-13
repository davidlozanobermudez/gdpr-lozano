/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AceptaLeyService } from 'app/entities/acepta-ley/acepta-ley.service';
import { IAceptaLey, AceptaLey } from 'app/shared/model/acepta-ley.model';

describe('Service Tests', () => {
    describe('AceptaLey Service', () => {
        let injector: TestBed;
        let service: AceptaLeyService;
        let httpMock: HttpTestingController;
        let elemDefault: IAceptaLey;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AceptaLeyService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new AceptaLey(0, false, currentDate, false, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaEnvio: currentDate.format(DATE_TIME_FORMAT),
                        fechaAceptacion: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AceptaLey', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        fechaEnvio: currentDate.format(DATE_TIME_FORMAT),
                        fechaAceptacion: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate,
                        fechaAceptacion: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new AceptaLey(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AceptaLey', async () => {
                const returnedFromService = Object.assign(
                    {
                        enviada: true,
                        fechaEnvio: currentDate.format(DATE_TIME_FORMAT),
                        aceptada: true,
                        fechaAceptacion: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate,
                        fechaAceptacion: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AceptaLey', async () => {
                const returnedFromService = Object.assign(
                    {
                        enviada: true,
                        fechaEnvio: currentDate.format(DATE_TIME_FORMAT),
                        aceptada: true,
                        fechaAceptacion: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEnvio: currentDate,
                        fechaAceptacion: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AceptaLey', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
