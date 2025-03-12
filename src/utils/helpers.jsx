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


export function updateUserFromResponse(data, setUser) {
    const rawUser = data?.data?.[0];

    if (!rawUser) {
        console.warn("No data found in response.");
        return;
    }

    // Check if user is nested under `f_user_id` (bid case)
    const updatedUser = rawUser.f_user_id ? rawUser.f_user_id : rawUser;

    if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    } else {
        console.warn("Could not find a valid user object in response.");
    }
}