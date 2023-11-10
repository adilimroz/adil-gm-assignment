import { test as base } from "@playwright/test";
import { BrokenPage } from "../pages/brokenPage";
import { DroppablePage } from "../pages/droppablePage";
import { ElementsPage } from "../pages/elementsPage";
import { FormPage } from "../pages/formPage";
import { ProgressBarPage } from "../pages/progressBarPage";
import { ToolTipsPage } from "../pages/toolTipsPage";
import { WebTables } from "../pages/webTables";
import { APIHelpers } from "../apiUtility/utils"

type MyFixtures = {
    brokenPage: BrokenPage;
    elementsPage: ElementsPage;
    webTables: WebTables;
    formPage: FormPage;
    progressBarPage: ProgressBarPage;
    toolTipsPage: ToolTipsPage;
    droppablePage: DroppablePage;
    apiHelpers: APIHelpers;
}

export const test = base.extend<MyFixtures>({
    brokenPage: ({ page }, use) => use(new BrokenPage(page)),
    elementsPage: ({ page }, use) => use(new ElementsPage(page)),
    webTables: ({ page }, use) => use(new WebTables(page)),
    formPage: ({ page }, use) => use(new FormPage(page)),
    progressBarPage: ({ page }, use) => use(new ProgressBarPage(page)),
    toolTipsPage: ({ page }, use) => use(new ToolTipsPage(page)),
    droppablePage: ({ page }, use) => use(new DroppablePage(page)),
    apiHelpers: ({ request, baseURL }, use) => use(new APIHelpers(request, baseURL)),
})

export { expect } from "@playwright/test";
