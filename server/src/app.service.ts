import { Injectable } from '@nestjs/common';
import { Coins, LCDClient } from '@xpla/xpla.js';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getTokenBalance(): Promise<any> {
    const data = await getXplaTokenBalance();
    return data;
  }

  async getTokenBalance2(): Promise<any> {
    const data = await getXplaTokenBalance2();
    return data;
  }
}

const Mainnet = {
  url: 'https://dimension-lcd.xpla.dev',
  chainID: 'dimension_37-1',
};

const dev = {
  url: 'https://cube-fcd.xpla.dev',
  chainID: 'cube_47-5',
};

const covertBalances = (el) => {
  return Math.round((parseFloat(el) / Math.pow(10, 6)) * 100) / 100;
};

const covertBalancesXpla = (el) => {
  return Math.round((parseFloat(el) / Math.pow(10, 18)) * 100) / 100;
};

async function getXplaTokenBalance() {
  const gasPrices = await axios('https://cube-fcd.xpla.dev/v1/txs/gas_prices');
  const gasPricesCoins = new Coins(gasPrices.data);

  const lcd = new LCDClient({
    URL: Mainnet.url,
    chainID: Mainnet.chainID,
    gasPrices: gasPricesCoins,
    gasAdjustment: '1.5',
  });
  const addresses = [
    'xpla18a8yfa7hw0y5h0lfdcrddh98tzawv3yz8cqhkl4f50wqe2u4m33smrdu93',
    'xpla1cdty03fzqzqpkvf4zpmpl9rnlffjeey7fa5n47',
    'xpla1g8hkzkgfa3uq0cg9d6h99jk5nlg92lwx2jme2l',
    'xpla12xxryljjxarwgycjejf7ssrupaj78nmq8kccz6',
    'xpla1c8yt309fq0shhfpvpf9yrz75nz95wkwcqs0us06d739vdcc4f6fsftqhkg',
  ];

  const balances = await Promise.all(
    addresses.map(async (address) => {
      const [balance] = await lcd.bank.balance(address);
      if (balance.toData()[0] === undefined) {
        return { walletAddress: address, balances: 0 };
      } else {
        return {
          walletAddress: address,
          balances: covertBalancesXpla(balance.toData()[0].amount),
        };
      }
    }),
  );

  return balances;
}

async function getXplaTokenBalance2() {
  const gasPrices = await axios('https://cube-fcd.xpla.dev/v1/txs/gas_prices');
  const gasPricesCoins = new Coins(gasPrices.data);
  const tokens = [
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress:
        'xpla18a8yfa7hw0y5h0lfdcrddh98tzawv3yz8cqhkl4f50wqe2u4m33smrdu93',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1cdty03fzqzqpkvf4zpmpl9rnlffjeey7fa5n47',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1g8hkzkgfa3uq0cg9d6h99jk5nlg92lwx2jme2l',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla12xxryljjxarwgycjejf7ssrupaj78nmq8kccz6',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress:
        'xpla1c8yt309fq0shhfpvpf9yrz75nz95wkwcqs0us06d739vdcc4f6fsftqhkg',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1q4xns7eu3z8u3acj4nd8za3nz3xvz7wcm73cp0',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1u8kz9gdkepcdtugf0pn0dy8c2zkadpnzq5rsj8',
    },
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1up07dctjqud4fns75cnpejr4frmjtddzsmwgcktlyxd4zekhwecqtcfwjd',
      walletAddress: 'xpla1m7e4yy2kr8y9efdg36y2hsu5etyucj222ywy6j',
    },
  ];

  const lcd = new LCDClient({
    URL: Mainnet.url,
    chainID: Mainnet.chainID,
    gasPrices: gasPricesCoins,
    gasAdjustment: '1.5',
  });

  const balances = await Promise.all(
    tokens.map(async ({ tokenAddress, walletAddress }) => {
      const response = await lcd.wasm.contractQuery(tokenAddress, {
        balance: { address: walletAddress },
      });
      if (response['balance'] === undefined) {
        return { walletAddress, balances: 0 };
      } else {
        return { walletAddress, balances: covertBalances(response['balance']) };
      }
    }),
  );

  return balances;
}
