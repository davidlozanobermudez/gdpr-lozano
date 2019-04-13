/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrazaPeticionComponentsPage, TrazaPeticionDeleteDialog, TrazaPeticionUpdatePage } from './traza-peticion.page-object';

const expect = chai.expect;

describe('TrazaPeticion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let trazaPeticionUpdatePage: TrazaPeticionUpdatePage;
    let trazaPeticionComponentsPage: TrazaPeticionComponentsPage;
    let trazaPeticionDeleteDialog: TrazaPeticionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TrazaPeticions', async () => {
        await navBarPage.goToEntity('traza-peticion');
        trazaPeticionComponentsPage = new TrazaPeticionComponentsPage();
        await browser.wait(ec.visibilityOf(trazaPeticionComponentsPage.title), 5000);
        expect(await trazaPeticionComponentsPage.getTitle()).to.eq('gdprLozanoApp.trazaPeticion.home.title');
    });

    it('should load create TrazaPeticion page', async () => {
        await trazaPeticionComponentsPage.clickOnCreateButton();
        trazaPeticionUpdatePage = new TrazaPeticionUpdatePage();
        expect(await trazaPeticionUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.trazaPeticion.home.createOrEditLabel');
        await trazaPeticionUpdatePage.cancel();
    });

    it('should create and save TrazaPeticions', async () => {
        const nbButtonsBeforeCreate = await trazaPeticionComponentsPage.countDeleteButtons();

        await trazaPeticionComponentsPage.clickOnCreateButton();
        await promise.all([
            trazaPeticionUpdatePage.tipoNotificacionSelectLastOption(),
            trazaPeticionUpdatePage.nombreOperacionSelectLastOption(),
            trazaPeticionUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            trazaPeticionUpdatePage.setObservacionesInput('observaciones'),
            trazaPeticionUpdatePage.contactoSelectLastOption()
        ]);
        expect(await trazaPeticionUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30');
        expect(await trazaPeticionUpdatePage.getObservacionesInput()).to.eq('observaciones');
        await trazaPeticionUpdatePage.save();
        expect(await trazaPeticionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await trazaPeticionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TrazaPeticion', async () => {
        const nbButtonsBeforeDelete = await trazaPeticionComponentsPage.countDeleteButtons();
        await trazaPeticionComponentsPage.clickOnLastDeleteButton();

        trazaPeticionDeleteDialog = new TrazaPeticionDeleteDialog();
        expect(await trazaPeticionDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.trazaPeticion.delete.question');
        await trazaPeticionDeleteDialog.clickOnConfirmButton();

        expect(await trazaPeticionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
