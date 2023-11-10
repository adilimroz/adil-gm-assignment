import { Locator, Page } from "@playwright/test";

export class BrokenPage {
    private readonly page: Page;
    private brokenImageLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brokenImageLocator = this.page.locator('[src="/images/Toolsqa_1.jpg"]');
    }

    /**
     * Checks if the broken image is loaded on the page.
     * @returns A promise that resolves to true if the image is not loaded, otherwise false.
     */
    async isImageBroken(): Promise<boolean> {
        // In Playwright, an image with an error will not have a 'naturalWidth'.
        // So, if 'naturalWidth' is 0, the image is considered not loaded or broken.
        const naturalWidth = await this.brokenImageLocator.evaluate(node => (node as HTMLImageElement).naturalWidth);
        return naturalWidth === 0;
    }
}
