import { expect, test } from "../../fixtures/baseFixture";
import { ElementName } from "../../pages/elementsPage";
import { FormPage } from "../../pages/formPage";
import { data, formData, updatedData } from "../../resources/testDataUI";


test.describe.parallel('Testing DemoQA website', async () => {
    test('TC01-A : Verify user can enter new data into the table', async ({ page, elementsPage, webTables }) => {
        await page.goto('/elements');
        await elementsPage.navigateToSection(ElementName.WebTables);
        let rowsBeforeAction: number = await webTables.getTotalNumOfRows();
        await webTables.addRow(data.firstName, data.lastName, data.userEmail, data.age, data.salary, data.department);
        let rowsAfterAction: number = await webTables.getTotalNumOfRows();
        expect(rowsAfterAction).toEqual(rowsBeforeAction + 1);
    })


    test('TC01-A: Verify user can edit the row in a table', async ({ page, elementsPage, webTables }) => {
        await page.goto('/elements');
        await elementsPage.navigateToSection(ElementName.WebTables);
        const rowToUpdate = await webTables.getRowNumByName('Alden');
        await webTables.editRow(rowToUpdate, updatedData.firstName, updatedData.lastName);
        expect(await webTables.getFieldValue(rowToUpdate, "First Name")).toEqual(updatedData.firstName);
        expect(await webTables.getFieldValue(rowToUpdate, "Last Name")).toEqual(updatedData.lastName);
    })


    test('TC02 - Verify broken image', async ({ page, brokenPage }) => {
        await page.goto('/broken');
        const isBroken = await brokenPage.isImageBroken();
        // The expectation is that the image should be broken
        expect(isBroken).toBeTruthy();
    })


    test('TC03 - Verify user can submit the form', async ({ page }) => {
        const formPage = new FormPage(page);
        await page.goto('/automation-practice-form');
        await formPage.fillForm(formData);
        let actualMsg: string;
        actualMsg = await formPage.getSuccessMsg().innerText();
        expect(actualMsg).toEqual('Thanks for submitting the form');
    })
    

    test('TC04 - Verify the progress bar', async ({ page, progressBarPage }) => {
        await page.goto('/progress-bar');
        await progressBarPage.startProgressBar();
        await progressBarPage.waitForProgressBarCompletion();
        const progressBarText = await page.locator('#progressBar .progress-bar').innerText();
        expect(progressBarText).toEqual('100%');
    })


    test('TC05 - Verify the tooltip', async ({ page, toolTipsPage }) => {
        await page.goto('/tool-tips');
        await toolTipsPage.hoverOnButton();
        expect(await toolTipsPage.getToolTipText()).toEqual('You hovered over the Button');
    })


    test('TC06 - Verify user can drag and drop', async ({ page, droppablePage }) => {
        await page.goto('/droppable');
        await droppablePage.dragElementToDroppable();
        expect(await droppablePage.getDroppableElementText()).toEqual('Dropped!');
    })
});