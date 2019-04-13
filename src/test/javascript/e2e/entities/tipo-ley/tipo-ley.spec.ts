/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoLeyComponentsPage, TipoLeyDeleteDialog, TipoLeyUpdatePage } from './tipo-ley.page-object';

const expect = chai.expect;

describe('TipoLey e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tipoLeyUpdatePage: TipoLeyUpdatePage;
    let tipoLeyComponentsPage: TipoLeyComponentsPage;
    let tipoLeyDeleteDialog: TipoLeyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tipolies', async () => {
        await navBarPage.goToEntity('tipo-ley');
        tipoLeyComponentsPage = new TipoLeyComponentsPage();
        await browser.wait(ec.visibilityOf(tipoLeyComponentsPage.title), 5000);
        expect(await tipoLeyComponentsPage.getTitle()).to.eq('gdprLozanoApp.tipoLey.home.title');
    });

    it('should load create TipoLey page', async () => {
        await tipoLeyComponentsPage.clickOnCreateButton();
        tipoLeyUpdatePage = new TipoLeyUpdatePage();
        expect(await tipoLeyUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.tipoLey.home.createOrEditLabel');
        await tipoLeyUpdatePage.cancel();
    });

    it('should create and save Tipolies', async () => {
        const nbButtonsBeforeCreate = await tipoLeyComponentsPage.countDeleteButtons();

        await tipoLeyComponentsPage.clickOnCreateButton();
        await promise.all([tipoLeyUpdatePage.setDescripcionInput('descripcion')]);
        expect(await tipoLeyUpdatePage.getDescripcionInput()).to.eq('descripcion');
        await tipoLeyUpdatePage.save();
        expect(await tipoLeyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tipoLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TipoLey', async () => {
        const nbButtonsBeforeDelete = await tipoLeyComponentsPage.countDeleteButtons();
        await tipoLeyComponentsPage.clickOnLastDeleteButton();

        tipoLeyDeleteDialog = new TipoLeyDeleteDialog();
        expect(await tipoLeyDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.tipoLey.delete.question');
        await tipoLeyDeleteDialog.clickOnConfirmButton();

        expect(await tipoLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
