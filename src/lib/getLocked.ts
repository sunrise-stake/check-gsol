import {getClient} from "@/lib/getClient";
import {Balance} from "@sunrisestake/client";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export const getLocked = async (address: string):Promise<number> => {
    const client = await getClient(address);
    const details = await client.details();
    return (details.lockDetails?.amountLocked?.toNumber() || 0) / LAMPORTS_PER_SOL;
}