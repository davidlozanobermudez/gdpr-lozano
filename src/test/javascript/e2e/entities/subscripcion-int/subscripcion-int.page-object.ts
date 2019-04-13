import { element, by, ElementFinder } from 'protractor';

export class SubscripcionIntComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-subscripcion-int div table .btn-danger'));
    title = element.all(by.css('jhi-subscripcion-int div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SubscripcionIntUpdatePage {
    pageTitle = element(by.id('jhi-subscripcion-int-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codLanguageInput = element(by.id('field_codLanguage'));
    nombreInput = element(by.id('field_nombre'));
    descripcionInput = element(by.id('field_descripcion'));
    subscripcionSelect = element(by.id('field_subscripcion'));
    languageSelect = element(by.id('field_language'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodLanguageInput(codLanguage) {
        await this.codLanguageInput.sendKeys(codLanguage);
    }

    async getCodLanguageInput() {
        return this.codLanguageInput.getAttribute('value');
    }

    async setNombreInput(nombre) {
        await this.nombreInput.sendKeys(nombre);
    }

    async getNombreInput() {
        return this.nombreInput.getAttribute('value');
    }

    async setDescripcionInput(descripcion) {
        await this.descripcionInput.sendKeys(descripcion);
    }

    async getDescripcionInput() {
        return this.descripcionInput.getAttribute('value');
    }

    async subscripcionSelectLastOption() {
        await this.subscripcionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async subscripcionSelectOption(option) {
        await this.subscripcionSelect.sendKeys(option);
    }

    getSubscripcionSelect(): ElementFinder {
        return this.subscripcionSelect;
    }

    async getSubscripcionSelectedOption() {
        return this.subscripcionSelect.element(by.css('option:checked')).getText();
    }

    async languageSelectLastOption() {
        await this.languageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async languageSelectOption(option) {
        await this.languageSelect.sendKeys(option);
    }

    getLanguageSelect(): ElementFinder {
        return this.languageSelect;
    }

    async getLanguageSelectedOption() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class SubscripcionIntDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-subscripcionInt-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-subscripcionInt'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
