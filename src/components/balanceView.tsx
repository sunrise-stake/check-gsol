"use client";
import {ShowBalance} from "@/components/showBalance";
import {FC, Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {Spinner} from "@/components/spinner";

export const BalanceView:FC  = () => {
    const searchParams = useSearchParams();
    const address = searchParams.get('address');

    if (!address) return <div>
        <p className="text-center">Enter an address to check the gSOL balance</p>
    </div>;

    return address && <Suspense fallback={<Spinner />}>
        <ShowBalance address={address}/>
    </Suspense>
}