"use server";
import {FC} from "react";
import Image from "next/image";
import {getBalance} from "@/lib/getBalance";
import {getLocked} from "@/lib/getLocked";

const treeUrl = "https://api.sunrisestake.com/assets/tree/lores/TREE_01-03.png"

const Tree: FC<{ balance: number }> = ({ balance }) =>
    <Image
        width={100}
        height={100}
        src={treeUrl} alt="tree"
        className={(balance === 0 ? "grayscale" : "")}
    />

const shortAddress = (address: string) => address.slice(0, 6) + "..." + address.slice(-6)

const AddressLink: FC<{ address: string }> = ({ address }) => <a href={`https://solana.fm/address/${address}`}
                                                                 target="_blank">{shortAddress(address)}</a>

export const ShowBalance: FC<{ address :string }> = async ({ address }) => {
    let balance = 0;
    let lockedAmount = 0;
    try {
        balance = (await getBalance(address))?.gsolBalance.uiAmount ?? 0;
        lockedAmount = await getLocked(address);
    } catch {
        // ignore for now
    }

    const totalAmount = balance + lockedAmount;

    return <>
        <Tree balance={totalAmount}/>
        <h2 className="text-xl font-semibold text-gray-800 text-center"><AddressLink address={address}/></h2>
        <div className="grid grid-cols-2 gap-x-4 w-full">
            <p className="text-lg text-gray-700">gSOL:</p>
            <div className="flex items-center space-x-2 justify-end text-lg text-gray-700 text-right font-semibold">
                <span>{balance.toFixed(3)}</span>
                <Image src="/gSOL.png" alt="gSOL" width={16} height={16} />
            </div>
            <p className="text-lg text-gray-700">Locked gSOL:</p>
            <div className="flex items-center space-x-2 justify-end text-lg text-gray-700 text-right font-semibold">
                <span>{lockedAmount.toFixed(3)}</span>
                <Image src="/gSOL.png" alt="gSOL" width={16} height={16} />
            </div>
            <p className="text-lg text-gray-700">Total:</p>
            <div className="flex items-center space-x-2 justify-end text-lg text-gray-700 text-right font-semibold">
                <span>{totalAmount.toFixed(3)}</span>
                <Image src="/gSOL.png" alt="gSOL" width={16} height={16} />
            </div>
        </div>
    </>
}