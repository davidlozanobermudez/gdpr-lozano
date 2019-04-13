/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VersionLeyIntComponentsPage, VersionLeyIntDeleteDialog, VersionLeyIntUpdatePage } from './version-ley-int.page-object';

const expect = chai.expect;

describe('VersionLeyInt e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let versionLeyIntUpdatePage: VersionLeyIntUpdatePage;
    let versionLeyIntComponentsPage: VersionLeyIntComponentsPage;
    let versionLeyIntDeleteDialog: VersionLeyIntDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VersionLeyInts', async () => {
        await navBarPage.goToEntity('version-ley-int');
        versionLeyIntComponentsPage = new VersionLeyIntComponentsPage();
        await browser.wait(ec.visibilityOf(versionLeyIntComponentsPage.title), 5000);
        expect(await versionLeyIntComponentsPage.getTitle()).to.eq('gdprLozanoApp.versionLeyInt.home.title');
    });

    it('should load create VersionLeyInt page', async () => {
        await versionLeyIntComponentsPage.clickOnCreateButton();
        versionLeyIntUpdatePage = new VersionLeyIntUpdatePage();
        expect(await versionLeyIntUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.versionLeyInt.home.createOrEditLabel');
        await versionLeyIntUpdatePage.cancel();
    });

    it('should create and save VersionLeyInts', async () => {
        const nbButtonsBeforeCreate = await versionLeyIntComponentsPage.countDeleteButtons();

        await versionLeyIntComponentsPage.clickOnCreateButton();
        await promise.all([
            versionLeyIntUpdatePage.setCodLanguageInput('codLanguage'),
            versionLeyIntUpdatePage.setNombreInput('nombre'),
            versionLeyIntUpdatePage.setDescripcionInput('descripcion'),
            versionLeyIntUpdatePage.versionLeySelectLastOption(),
            versionLeyIntUpdatePage.languageSelectLastOption()
        ]);
        expect(await versionLeyIntUpdatePage.getCodLanguageInput()).to.eq('codLanguage');
        expect(await versionLeyIntUpdatePage.getNombreInput()).to.eq('nombre');
        expect(await versionLeyIntUpdatePage.getDescripcionInput()).to.eq('descripcion');
        await versionLeyIntUpdatePage.save();
        expect(await versionLeyIntUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await versionLeyIntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VersionLeyInt', async () => {
        const nbButtonsBeforeDelete = await versionLeyIntComponentsPage.countDeleteButtons();
        await versionLeyIntComponentsPage.clickOnLastDeleteButton();

        versionLeyIntDeleteDialog = new VersionLeyIntDeleteDialog();
        expect(await versionLeyIntDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.versionLeyInt.delete.question');
        await versionLeyIntDeleteDialog.clickOnConfirmButton();

        expect(await versionLeyIntComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
