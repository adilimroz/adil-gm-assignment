import { Locator, Page } from "@playwright/test";

export class ToolTipsPage {
    private hoverBtn: Locator;
    private toolTip: Locator;

    constructor(public page: Page) {
        this.initializeLocators();
    }

    private initializeLocators() {
        this.hoverBtn = this.page.locator('#toolTipButton');
        this.toolTip = this.page.locator('.tooltip-inner');
    }

    async hoverOnButton(): Promise<void> {
        await this.hoverBtn.hover();
    }

    async getToolTipText(): Promise<string> {
        // The tooltip might take a moment to appear, so we will wait for it to be visible
        await this.toolTip.waitFor({ state: 'visible' });
        return await this.toolTip.innerText();
    }
}
