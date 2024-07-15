import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { Logger } from '../utils/Logger';

export class Chrome {
    private browser: BrowserContext | null = null;
    private page: Page | null = null;
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    async launch(): Promise<void> {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext({
            httpCredentials: {
                username: 'quocthieu',
                password: 'lT1IM8EztJM49Lm1'
            }
        });

        const page = await context.newPage();
        await page.goto('https://dev.aqtech.vn:1443/tfs/aq/Edusoft.Net-CS/_queries?id=d593e99e-1e28-4681-9a0f-ce2cb48b222b&_a=query');
    }

    async navigate(url: string): Promise<void> {
        if (!this.page) {
            throw new Error('Browser not launched');
        }
        try {


            await this.page.goto(url);
            this.logger.log(`Navigated to ${url}`);
        } catch (error) {
            this.logger.error(`Failed to navigate to ${url}`, error);
            throw error;
        }
    }

    async click(selector: string): Promise<void> {
        await this.page?.locator(selector).click()
    }

    async input(selector: string, text: string): Promise<void> {
        if (!this.page) {
            throw new Error('Browser not launched');
        }
        try {
            await this.page.fill(selector, text);
            this.logger.log(`Entered text into element with selector: ${selector}`);
        } catch (error) {
            this.logger.error(`Failed to enter text into element with selector: ${selector}`, error);
            throw error;
        }
    }
    async screenshot(path: string): Promise<void> {
        if (!this.page) {
            throw new Error('Browser not launched');
        }
        try {
            await this.page.screenshot({ path });
            this.logger.log(`Screenshot saved to ${path}`);
        } catch (error) {
            this.logger.error(`Failed to take screenshot`, error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
            this.logger.log('Browser closed');
        }
    }
}