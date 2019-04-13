/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubscripcionComponentsPage, SubscripcionDeleteDialog, SubscripcionUpdatePage } from './subscripcion.page-object';

const expect = chai.expect;

describe('Subscripcion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let subscripcionUpdatePage: SubscripcionUpdatePage;
    let subscripcionComponentsPage: SubscripcionComponentsPage;
    let subscripcionDeleteDialog: SubscripcionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Subscripcions', async () => {
        await navBarPage.goToEntity('subscripcion');
        subscripcionComponentsPage = new SubscripcionComponentsPage();
        await browser.wait(ec.visibilityOf(subscripcionComponentsPage.title), 5000);
        expect(await subscripcionComponentsPage.getTitle()).to.eq('gdprLozanoApp.subscripcion.home.title');
    });

    it('should load create Subscripcion page', async () => {
        await subscripcionComponentsPage.clickOnCreateButton();
        subscripcionUpdatePage = new SubscripcionUpdatePage();
        expect(await subscripcionUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.subscripcion.home.createOrEditLabel');
        await subscripcionUpdatePage.cancel();
    });

    it('should create and save Subscripcions', async () => {
        const nbButtonsBeforeCreate = await subscripcionComponentsPage.countDeleteButtons();

        await subscripcionComponentsPage.clickOnCreateButton();
        await promise.all([subscripcionUpdatePage.setCodigoInput('codigo')]);
        expect(await subscripcionUpdatePage.getCodigoInput()).to.eq('codigo');
        await subscripcionUpdatePage.save();
        expect(await subscripcionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await subscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Subscripcion', async () => {
        const nbButtonsBeforeDelete = await subscripcionComponentsPage.countDeleteButtons();
        await subscripcionComponentsPage.clickOnLastDeleteButton();

        subscripcionDeleteDialog = new SubscripcionDeleteDialog();
        expect(await subscripcionDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.subscripcion.delete.question');
        await subscripcionDeleteDialog.clickOnConfirmButton();

        expect(await subscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
