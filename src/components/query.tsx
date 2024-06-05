"use client";
import {FC} from "react";
import {PublicKey} from "@solana/web3.js";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const isAddress = (address: string) => {
    try {
        new PublicKey(address);
        return true;
    } catch {
        return false;
    }
}

export const Query:FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = (address: string) => {
        console.log("handleChange")
        if (!isAddress(address)) return;
        const params = new URLSearchParams(searchParams);
        if (address) {
            params.set('address', address);
        } else {
            params.delete('address');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <input
            type="search"
            placeholder="Lookup address..."
            className="pl-8 py-2 w-full sm:w-[300px] md:w-[200px] lg:w-[300px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}