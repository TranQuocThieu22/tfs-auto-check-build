export class Logger {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }

    error(message: string, error: any): void {
        console.error(`[ERROR] ${message}`, error);
    }
}