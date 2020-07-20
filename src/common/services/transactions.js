import { ethers } from 'ethers';
import { Transaction as TransactionUtils, Wallet as WalletUtils } from '@common/utils';

// const { Wallet, utils } = ethers;

export function sendTransaction(wallet, transaction) {
    if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
    if (!TransactionUtils.isValidTransaction(transaction)) throw new Error('Invalid transaction');
    return ethers.wallet.sendTransaction(transaction);
}

export function sendEther(wallet, destination, amount, options) {
    if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid wallet');
    if (typeof destination !== 'string') throw new Error('Invalid destination address');
    if (!(amount instanceof ethers.BigNumber)) amount = ethers.parseEther(amount);
    return ethers.wallet.send(destination, amount, options);
}