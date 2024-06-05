import {getClient} from "@/lib/getClient";
import {Balance} from "@sunrisestake/client";

export const getBalance = async (address: string):Promise<Balance> => {
    const client = await getClient(address);
    return client.balance();
}