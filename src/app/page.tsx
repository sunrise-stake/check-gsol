import Image from "next/image";
import {Query} from "@/components/query";
import {BalanceView} from "@/components/balanceView";
import {Suspense} from "react";
import {Spinner} from "@/components/spinner";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-green-950 dark:via-green-700 lg:static lg:size-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://app.sunrisestake.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Sunrise Logo"
                            className="dark:invert"
                            width={200}
                            height={48}
                            priority
                        />
                    </a>
                </div>
                <div className="flex flex-row space-x-2 text-3xl items-center">
                    <Image src="/gSOL.png" alt="gSOL" width={48} height={48}/>
                    <p>Balance Checker</p>
                </div>
            </div>

            <div className="flex justify-center pt-24">
                <div
                    className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 border border-gray-200 rounded-lg shadow-lg p-10 flex flex-col items-center space-y-10 w-full">
                    <Suspense fallback={<Spinner />}>
                        <BalanceView/>
                        <Query/>
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
