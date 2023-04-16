import { type NextPage } from "next";
import Head from "next/head";

import { useState } from "react";
import { api } from "@/utils/api";

import React from "react";
import { Sleep as SleepModel } from "@prisma/client";

interface JSXDate {
    date: Date;
    wakeTime: string;
    getUpTime: string;
    bedTime: string;
    sleepTime: string;
}

const Sleep: NextPage = () => {
    const hello = api.sleep.getAll.useQuery();
    const data = hello.data;
    const upsertSleep = api.sleep.upsert.useMutation({
        onSuccess: () => {
            console.log('Successfuly added sleep time');
        }
    });
    const today = new Date();
    const sleepData: Array<JSXDate> = [];
    const [dataLimit,setDataLimit] = useState(10);
    const [view,setView] = useState(0);
    const [showRangeSelector,setShowRangeSelector] = useState(false);

    for (let i = 0; i < 30; i++)
    {
        const current = new Date(today);
        current.setDate(today.getDate() - i);
        current.setHours(0, 0, 0, 0);

        const dayData = data?.find((item: SleepModel) => item.date.getTime() == current.getTime());

        const curWakeTime = dayData?.wakeUpTime?.toLocaleString().substring(11,16) ?? "";
        const curBedTime = dayData?.bedTime?.toLocaleString().substring(11,16) ?? "";
        const curGetUpTime = dayData?.getUpTime?.toLocaleString().substring(11,16) ?? "";
        const curSleepTime = dayData?.sleepTime?.toLocaleString().substring(11,16) ?? "";

        sleepData[i] = {
            date: current,
            wakeTime: curWakeTime,
            getUpTime: curGetUpTime,
            bedTime: curBedTime,
            sleepTime: curSleepTime,
        };
    }

    const handleViewChange = () => {

    }

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'range')
        {
            setShowRangeSelector(true);
        }
        else
        {
            if (showRangeSelector === true)
                setShowRangeSelector(false);
            setDataLimit(parseInt(e.target.value));
        }
    };

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

            console.log(e.target.title + time);
    
            upsertSleep.mutate({
                date: date,
                [e.target.title]: time
            });
        }
    };

    return (
        <>
            <Head>
                <title>Sleep</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-full">
                <div className="mx-auto mt-2 px-2 rounded overflow-hidden shadow-lg">
                    <div className="px-2 py-4">
                        <h1 className="font-bold text-xl mb-2">Sommeil</h1>
                    </div>
                    <div className="mb-4 flex">
                        <select className="float-left" onChange={handleLimitChange}>
                            <option value="10">10 derniers jours</option>
                            <option value="20">20 derniers jours</option>
                            <option value="30">30 derniers jours</option>
                            <option value="range">Période personnalisée</option>
                        </select>
                        <div id="custom-range" className={showRangeSelector ? '' : 'hidden'}>
                            <label htmlFor="from_date">De</label>
                            <input id="from_date" type="date" value="2023-04-15" />
                            <label htmlFor="from_date">A</label>
                            <input id="from_date" type="date" value="2023-04-15" />
                        </div>
                        <span className="ml-auto"><a href="#">Graphique</a></span>
                    </div>
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
                            {sleepData.slice(0, dataLimit).map((day) => (
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
                </div>
            </main>
        </>
    );
};

export default Sleep;