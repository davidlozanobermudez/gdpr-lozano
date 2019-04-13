import { element, by, ElementFinder } from 'protractor';

export class SistemaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-sistema div table .btn-danger'));
    title = element.all(by.css('jhi-sistema div h2#page-heading span')).first();

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

export class SistemaUpdatePage {
    pageTitle = element(by.id('jhi-sistema-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nombreInput = element(by.id('field_nombre'));
    operacionesSelect = element(by.id('field_operaciones'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNombreInput(nombre) {
        await this.nombreInput.sendKeys(nombre);
    }

    async getNombreInput() {
        return this.nombreInput.getAttribute('value');
    }

    async operacionesSelectLastOption() {
        await this.operacionesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async operacionesSelectOption(option) {
        await this.operacionesSelect.sendKeys(option);
    }

    getOperacionesSelect(): ElementFinder {
        return this.operacionesSelect;
    }

    async getOperacionesSelectedOption() {
        return this.operacionesSelect.element(by.css('option:checked')).getText();
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

export class SistemaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-sistema-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-sistema'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
