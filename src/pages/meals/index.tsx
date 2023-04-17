import { type NextPage } from "next";
import Head from "next/head";

const Meals: NextPage = () => {
    return (
        <>
            <Head>
                <title>Meals</title>
            </Head>
            <main className="h-full">
                <div className="mx-auto mt-2 px-4 rounded overflow-hidden shadow-lg">
                    <div className="px-2 py-4">
                        <h1 className="font-bold text-xl mb-2">Meals</h1>
                    </div>
                    <h2>Aujourd&apos;hui</h2>
                    <h3>Petit déjeuner</h3>

                    <h3>Déjeuner</h3>
                    <h3>Dîner</h3>
                </div>
            </main>
        </>
    );
};

export default Meals;