import { ethers } from 'ethers';

const network = (process.env.NODE_ENV === 'production') ? 'mainnet' : 'rinkeby';
// let network = (process.env.NODE_ENV === 'production') ?
//     { name: 'mainnet', ensAddress: '0x314159265dd8dbb310642f98f50c066173c1259b', chainId: 1 } :
//     { name: 'rinkeby', ensAddress: '0xe7410170f87102df0055eb195163a03b7f2bff4a', chainId: 4 };

const PROJECT_ID = process.env.INFURA_PUB_KEY;
const PROJECT_SECRET = process.env.INFURA_PRIV_KEY;

const PROVIDER = new ethers.providers.InfuraProvider(network, PROJECT_ID);
// const PROVIDER = new providers.InfuraProvider(network, {projectId: PROJECT_ID, projectSecret: PROJECT_SECRET});
// const PROVIDER = providers.getDefaultProvider(network, {'projectId': PROJECT_ID, 'projectSecret': PROJECT_SECRET});
// const PROVIDER = new ethers.providers.EtherscanProvider(network);

export function generateMnemonics() {
    return ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16)).split(' ');
}

export function loadWalletFromMnemonics(mnemonics) {
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string')
        throw new Error('invalid mnemonic');
    else if (mnemonics instanceof Array)
        mnemonics = mnemonics.join(' ');

    const wallet = ethers.Wallet.fromMnemonic(mnemonics).connect(PROVIDER);
    // wallet.provider = PROVIDER;
  //wallet.getBalance().then(result => console.log(ethers.utils.formatEther(result)));
    return wallet;
}

export function loadWalletFromPrivateKey(pk) {
    try {
        if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
        return new ethers.Wallet(pk, PROVIDER);
    } catch (e) {
        throw new Error('invalid private key');
    }
}

export function formatBalance(balance) {
    return ethers.utils.formatEther(balance);
}

export function reduceBigNumbers(items) {
    if (!(items instanceof Array)) throw new Error('The input is not an Array');
    return items.reduce((prev, next) => prev.add(next), ethers.BigNumber.from('0'));
}

export function calculateFee({ gasUsed, gasPrice }) {
    return gasUsed * Number(formatBalance(gasPrice));
}

export function estimateFee({ gasLimit, gasPrice }) {
    return ethers.BigNumber.from(String(gasLimit)).mul(String(gasPrice));
}