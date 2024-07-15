import { Chrome } from "./class/chrome";


async function main() {
    const chrome = new Chrome();

    try {
        await chrome.launch();
        await chrome.click('div.title[role="button"]:has-text("AQ Customer")');
        await chrome.click('div.title[role="button"]:has-text("AQ Customer")');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {

    }
}

main();