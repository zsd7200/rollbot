const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const WEEK_MS = 7 * DAY_MS;
const MONTH_MS = 30 * DAY_MS; // 30 days flat, no adjustment for 31 day months or otherwise
const YEAR_MS = 365 * DAY_MS; // 365 days, no adjustment for leap years

export const timeToJson = (time: number) => {
    return {
        day: Math.floor(time / DAY_MS),
        hour: Math.floor((time % DAY_MS) / HOUR_MS),
        minute: Math.floor((time % DAY_MS % HOUR_MS) / MINUTE_MS),
        second: Math.floor((time % DAY_MS % HOUR_MS % MINUTE_MS) / SECOND_MS),
        ms: time % DAY_MS % HOUR_MS % MINUTE_MS % SECOND_MS,
    };
};

export const dateDiff = (oldDate: Date, newDate: Date) => {
    const diffMs = newDate.getTime() - oldDate.getTime();
    return timeToJson(diffMs);
};

export const hourToMs = (hour: number) => {
    return hour * HOUR_MS;
};