export default class Logger {
    static info(message: string, data?:any) {
        data = !data && {};
        message = `[INFO] ${this.getTimestamp()} ${message}`;

        console.log(message, data);
    }

    static warn(message: string, data?:any) {
        data = !data && {};
        message = `[WARN] ${this.getTimestamp()} ${message}`;

        console.warn(message, data);
    }

    static error(message: string, data?:any) {
        data = !data && {};
        message = `[ERROR] ${this.getTimestamp()} ${message}`;

        console.error(message, data);
    }

    static debug(message: string, data?:any) {
        data = !data && {};
        message = `[DEGUB] ${this.getTimestamp()} ${message}`;

        console.log(message, data);
    }

    static getTimestamp(date?: Date) {
        date = !date && new Date();

        let year = date.getFullYear();
        let month = date.toLocaleString("en-us", { month: "short" });
        let day = date.getDate();

        let hours = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let mil = date.getMilliseconds();

        return `${year}-${month}-${day} ${hours}:${min}:${sec}:${mil}`;
    }
}