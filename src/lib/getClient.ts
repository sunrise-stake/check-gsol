"use server";
import {SunriseStakeClient} from "@sunrisestake/client";
import {Connection, Keypair, PublicKey, Transaction, VersionedTransaction} from "@solana/web3.js";
import {AnchorProvider, Wallet} from "@coral-xyz/anchor";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

if (!process.env.RPC) throw new Error('RPC endpoint not provided');

const connection = new Connection(process.env.RPC);

class ReadOnlyWallet {
    constructor(readonly address: string) {}
    signTransaction = async <T extends Transaction | VersionedTransaction>(tx: T) => tx
    signAllTransactions = async <T extends Transaction | VersionedTransaction>(txs: T[]) => txs
    get publicKey() {return new PublicKey(this.address)}
}

export const getClient = (address: string):Promise<SunriseStakeClient> => {
    const readOnlyWallet = new ReadOnlyWallet(address);
    const provider = new AnchorProvider(connection, readOnlyWallet, {});
    return SunriseStakeClient.get(provider, WalletAdapterNetwork.Mainnet);
}