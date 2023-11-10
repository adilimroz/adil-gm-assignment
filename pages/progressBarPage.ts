import { Locator, Page } from "@playwright/test";

export class ProgressBarPage {
    private startStopBtn: Locator;
    private progressBar: Locator;

    constructor(public page: Page) {
        this.initializeLocators();
    }

    private initializeLocators(): void {
        this.startStopBtn = this.page.locator('#startStopButton');
        this.progressBar = this.page.locator('#progressBar .progress-bar');
    }

    async startProgressBar() {
        await this.startStopBtn.click();
    }

    async waitForProgressBarCompletion(): Promise<void> {
        await this.page.waitForFunction(
            (progressBarSelector) => {
                const progressBar = document.querySelector(progressBarSelector);
                return progressBar instanceof HTMLElement && progressBar.style.width === '100%';
            },
            '#progressBar .progress-bar'
        );
    }
}
