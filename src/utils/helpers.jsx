import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function getLiveCountdown(endTime) {
    const now = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(now);

    if (diff <= 0) return "Auction ended";

    const dur = dayjs.duration(diff);
    const minutes = dur.minutes();
    const seconds = dur.seconds();

    if (dur.asHours() < 1) {
        return `${minutes}m ${seconds}s left`;
    } else {
        const days = dur.days();
        const hours = dur.hours();
        return `${days}d ${hours}h ${minutes}m left`;
    }
}

export function getRedirectPathByRole(user) {
    if (!user || !user.admin) return "/";

    if (user.admin === true) {
        return "/admin";
    } else {
        return "/";
    }
}
