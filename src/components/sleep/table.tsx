import type TableRow from "@/interfaces/sleep/tablerow";
import { api } from "@/utils/api";
import { Switch } from "@material-tailwind/react";

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

            // console.log(e.target.name + time);
    
            upsertSleep.mutate({
                date: date,
                [e.target.name]: time
            });
        }
    };

    const handleTiredChange = (day: TableRow, tired: boolean) => {
        day.wakeType = !day.wakeType;

        upsertSleep.mutate({
            date: day.date,
            wakeUpTired: tired
        });
    }

    return (
        <div style={{overflowX: 'auto'}}>
            <table>
                <thead>
                    <tr className="text-gray-400 font-normal">
                        <th className="bg-gray-100" style={{position: 'sticky', left: 0}}></th>
                        {data.slice(0, limit).map((day) => (
                            <th
                                key={day.date.getTime()}
                                className="font-normal"
                            >
                                {day.date.toLocaleDateString().substring(0,5)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            className="py-2 px-2 bg-gray-100"
                            style={{
                                position: 'sticky',
                                left: 0,
                                fontWeight: 'bold'
                            }}
                        >
                            Réveil
                        </td>
                        {data.slice(0, limit).map((day) => (
                            <td
                                key={day.date.getTime()}
                                className="py-2 px-2"
                            >
                                <input
                                    className="appearance-none w-auto"
                                    type="time"
                                    name="wakeTime"
                                    defaultValue={day.wakeTime}
                                    onChange={(e) => handleTimeChange(e, day.date)}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className="py-2 px-2 bg-gray-100"
                            style={{
                                position: 'sticky',
                                left: 0,
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                zIndex: 1
                            }}
                        >
                            Fatigué
                        </td>
                        {data.slice(0, limit).map((day) => (
                            <td
                                key={day.date.getTime()}
                                className="py-2 px-2"
                            >
                                <Switch
                                    id={`switch-${day.date.toLocaleString().substring(0,10).replaceAll('/', '-')}`}
                                    color="blue"
                                    checked={day.wakeType}
                                    onChange={() => {handleTiredChange(day, !day.wakeType)}}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className="py-2 px-2 bg-gray-100"
                            style={{position: 'sticky', left: 0, fontWeight: 'bold'}}
                        >
                            Lever
                        </td>
                        {data.slice(0, limit).map((day) => (
                            <td
                                key={day.date.getTime()}
                                className="py-2 px-2"
                            >
                                <input
                                    className="appearance-none w-auto"
                                    type="time"
                                    name="getUpTime"
                                    defaultValue={day.getUpTime}
                                    onChange={(e) => handleTimeChange(e, day.date)}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-2 bg-gray-100" style={{position: 'sticky', left: 0, fontWeight: 'bold'}}>Coucher</td>
                        {data.slice(0, limit).map((day) => (
                            <td
                                key={day.date.getTime()}
                                className="py-2 px-2"
                            >
                                <input
                                    className={`appearance-none ${day.sleepTime === "" ? "w-full" : "w-auto"}`}
                                    type="time"
                                    name="bedTime"
                                    defaultValue={day.bedTime}
                                    onChange={(e) => handleTimeChange(e, day.date)}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-2 bg-gray-100" style={{position: 'sticky', left: 0, fontWeight: 'bold'}}>Endormi</td>
                        {data.slice(0, limit).map((day) => (
                            <td
                                key={day.date.getTime()}
                                className="py-2 px-2"
                            >
                                <input
                                    className={`appearance-none ${day.sleepTime === "" ? "w-full" : "w-auto"}`}
                                    type="time"
                                    name="sleepTime"
                                    defaultValue={day.sleepTime}
                                    onChange={(e) => handleTimeChange(e, day.date)}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}