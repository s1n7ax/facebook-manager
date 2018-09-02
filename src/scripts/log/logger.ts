export default class Logger {
    static info(message: string, data?:any) {
        data = !data && {};
        console.log(message, data);
    }

    static warn(message: string, data?:any) {
        data = !data && {};
        console.warn(message, data);
    }

    static error(error: Error, data?:any) {
        data = !data && {};
        console.error(error, data);
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