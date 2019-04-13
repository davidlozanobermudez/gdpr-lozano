/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubscripcionIntComponentsPage, SubscripcionIntDeleteDialog, SubscripcionIntUpdatePage } from './subscripcion-int.page-object';

const expect = chai.expect;

describe('SubscripcionInt e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let subscripcionIntUpdatePage: SubscripcionIntUpdatePage;
    let subscripcionIntComponentsPage: SubscripcionIntComponentsPage;
    let subscripcionIntDeleteDialog: SubscripcionIntDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SubscripcionInts', async () => {
        await navBarPage.goToEntity('subscripcion-int');
        subscripcionIntComponentsPage = new SubscripcionIntComponentsPage();
        await browser.wait(ec.visibilityOf(subscripcionIntComponentsPage.title), 5000);
        expect(await subscripcionIntComponentsPage.getTitle()).to.eq('gdprLozanoApp.subscripcionInt.home.title');
    });

    it('should load create SubscripcionInt page', async () => {
        await subscripcionIntComponentsPage.clickOnCreateButton();
        subscripcionIntUpdatePage = new SubscripcionIntUpdatePage();
        expect(await subscripcionIntUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.subscripcionInt.home.createOrEditLabel');
        await subscripcionIntUpdatePage.cancel();
    });

    it('should create and save SubscripcionInts', async () => {
        const nbButtonsBeforeCreate = await subscripcionIntComponentsPage.countDeleteButtons();

        await subscripcionIntComponentsPage.clickOnCreateButton();
        await promise.all([
            subscripcionIntUpdatePage.setCodLanguageInput('codLanguage'),
            subscripcionIntUpdatePage.setNombreInput('nombre'),
            subscripcionIntUpdatePage.setDescripcionInput('descripcion'),
            subscripcionIntUpdatePage.subscripcionSelectLastOption(),
            subscripcionIntUpdatePage.languageSelectLastOption()
        ]);
        expect(await subscripcionIntUpdatePage.getCodLanguageInput()).to.eq('codLanguage');
        expect(await subscripcionIntUpdatePage.getNombreInput()).to.eq('nombre');
        expect(await subscripcionIntUpdatePage.getDescripcionInput()).to.eq('descripcion');
        await subscripcionIntUpdatePage.save();
        expect(await subscripcionIntUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await subscripcionIntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SubscripcionInt', async () => {
        const nbButtonsBeforeDelete = await subscripcionIntComponentsPage.countDeleteButtons();
        await subscripcionIntComponentsPage.clickOnLastDeleteButton();

        subscripcionIntDeleteDialog = new SubscripcionIntDeleteDialog();
        expect(await subscripcionIntDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.subscripcionInt.delete.question');
        await subscripcionIntDeleteDialog.clickOnConfirmButton();

        expect(await subscripcionIntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
