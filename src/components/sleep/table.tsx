import TableRow from "@/interfaces/sleep/tablerow";
import { api } from "@/utils/api";

interface TableProps {
    data: Array<TableRow>;
    limit: number;
}

export default function Table({data, limit}: TableProps) {
    const upsertSleep = api.sleep.upsert.useMutation({
        onSuccess: () => {
            console.log('Successfuly added sleep time');
        }
    });

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, date: Date) => {
        const timeValues = e.target.value.split(':');
        let hours: number;
        let minutes: number;
        if (timeValues && timeValues.length == 2)
        {
            hours = parseInt(timeValues[0] || '0');
            minutes = parseInt(timeValues[1] || '0');
            const time = new Date(date);
    
            time.setHours(hours, minutes, 0, 0);

            // console.log(e.target.title + time);
    
            upsertSleep.mutate({
                date: date,
                [e.target.title]: time
            });
        }
    };

    return (
    <table className="table-auto w-full">
        <thead>
            <tr className="text-left">
                <th>Réveil</th>
                <th>Lever</th>
                <th>Coucher</th>
                <th>Endormi</th>
            </tr>
        </thead>
        <tbody>
            {data.slice(0, limit).map((day) => (
                <>
                    <tr>
                        <td colSpan={4}>{day.date.toLocaleDateString()}</td>
                    </tr>
                    <tr key={day.date.getTime()}>
                        <td>
                            <input
                                type="time"
                                title="wakeUpTime"
                                style={{width: 80}}
                                defaultValue={day.wakeTime}
                                onChange={(e) => handleTimeChange(e, day.date)}
                            />
                            <i className="fa fa-face-smile" />
                        </td>
                        <td>
                            <input
                                type="time"
                                title="getUpTime"
                                style={{width: 80}}
                                defaultValue={day.getUpTime}
                                onChange={(e) => handleTimeChange(e, day.date)}
                            />
                        </td>
                        <td>
                            <input
                                type="time"
                                title="bedTime"
                                style={{width: 80}}
                                defaultValue={day.bedTime}
                                onChange={(e) => handleTimeChange(e, day.date)}
                            />
                        </td>
                        <td>
                            <input
                                type="time"
                                title="sleepTime"
                                style={{width: 80}}
                                defaultValue={day.sleepTime}
                                onChange={(e) => handleTimeChange(e, day.date)}
                            />
                        </td>
                    </tr>
                </>
            ))}
        </tbody>
        </table>
    );
}