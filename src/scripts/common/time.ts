export default class Time {
    public static sleep(milsec: number) {
        return new Promise(resolve => {
            setTimeout(resolve, milsec);
        });
    }
}
