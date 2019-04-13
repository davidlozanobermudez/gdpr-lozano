/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AceptaLeyComponentsPage, AceptaLeyDeleteDialog, AceptaLeyUpdatePage } from './acepta-ley.page-object';

const expect = chai.expect;

describe('AceptaLey e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let aceptaLeyUpdatePage: AceptaLeyUpdatePage;
    let aceptaLeyComponentsPage: AceptaLeyComponentsPage;
    let aceptaLeyDeleteDialog: AceptaLeyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AceptaLeys', async () => {
        await navBarPage.goToEntity('acepta-ley');
        aceptaLeyComponentsPage = new AceptaLeyComponentsPage();
        await browser.wait(ec.visibilityOf(aceptaLeyComponentsPage.title), 5000);
        expect(await aceptaLeyComponentsPage.getTitle()).to.eq('gdprLozanoApp.aceptaLey.home.title');
    });

    it('should load create AceptaLey page', async () => {
        await aceptaLeyComponentsPage.clickOnCreateButton();
        aceptaLeyUpdatePage = new AceptaLeyUpdatePage();
        expect(await aceptaLeyUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.aceptaLey.home.createOrEditLabel');
        await aceptaLeyUpdatePage.cancel();
    });

    it('should create and save AceptaLeys', async () => {
        const nbButtonsBeforeCreate = await aceptaLeyComponentsPage.countDeleteButtons();

        await aceptaLeyComponentsPage.clickOnCreateButton();
        await promise.all([
            aceptaLeyUpdatePage.setFechaEnvioInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            aceptaLeyUpdatePage.setFechaAceptacionInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            aceptaLeyUpdatePage.contactoSelectLastOption(),
            aceptaLeyUpdatePage.versionLeySelectLastOption()
        ]);
        const selectedEnviada = aceptaLeyUpdatePage.getEnviadaInput();
        if (await selectedEnviada.isSelected()) {
            await aceptaLeyUpdatePage.getEnviadaInput().click();
            expect(await aceptaLeyUpdatePage.getEnviadaInput().isSelected()).to.be.false;
        } else {
            await aceptaLeyUpdatePage.getEnviadaInput().click();
            expect(await aceptaLeyUpdatePage.getEnviadaInput().isSelected()).to.be.true;
        }
        expect(await aceptaLeyUpdatePage.getFechaEnvioInput()).to.contain('2001-01-01T02:30');
        const selectedAceptada = aceptaLeyUpdatePage.getAceptadaInput();
        if (await selectedAceptada.isSelected()) {
            await aceptaLeyUpdatePage.getAceptadaInput().click();
            expect(await aceptaLeyUpdatePage.getAceptadaInput().isSelected()).to.be.false;
        } else {
            await aceptaLeyUpdatePage.getAceptadaInput().click();
            expect(await aceptaLeyUpdatePage.getAceptadaInput().isSelected()).to.be.true;
        }
        expect(await aceptaLeyUpdatePage.getFechaAceptacionInput()).to.contain('2001-01-01T02:30');
        await aceptaLeyUpdatePage.save();
        expect(await aceptaLeyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await aceptaLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AceptaLey', async () => {
        const nbButtonsBeforeDelete = await aceptaLeyComponentsPage.countDeleteButtons();
        await aceptaLeyComponentsPage.clickOnLastDeleteButton();

        aceptaLeyDeleteDialog = new AceptaLeyDeleteDialog();
        expect(await aceptaLeyDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.aceptaLey.delete.question');
        await aceptaLeyDeleteDialog.clickOnConfirmButton();

        expect(await aceptaLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
