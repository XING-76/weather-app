class DateUtils {
    static getHour(date: string) {
        const hour = new Date(date).getHours();

        return hour;
    }

    static getCurrentTime(date: string) {
        const currentTime = date.split(' ')[1];

        return currentTime;
    }

    static convertTo24Hour(time12Hour: string) {
        const timeParts = time12Hour.match(/(\d{2}):(\d{2}) (AM|PM)/);

        if (timeParts) {
            let hour = parseInt(timeParts[1]);
            const minute = timeParts[2];
            const period = timeParts[3];

            if (period === 'PM' && hour !== 12) {
                hour += 12;
            } else if (period === 'AM' && hour === 12) {
                hour = 0;
            }

            return `${hour.toString().padStart(2, '0')}:${minute}`;
        }

        return '';
    }

    static getWeekDay(day: string) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const date = new Date(day);

        const dayIndex = date.getDay();

        const now = new Date();

        const isToday = date.toDateString() === now.toDateString();

        let output = '';

        if (isToday) {
            output = 'Today';
        } else {
            output = daysOfWeek[dayIndex];
        }

        return output;
    }
}

export default DateUtils;
