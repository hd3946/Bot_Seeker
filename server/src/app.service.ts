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

async function getXplaTokenBalance() {
  const gasPrices = await axios('https://cube-fcd.xpla.dev/v1/txs/gas_prices');
  const gasPricesCoins = new Coins(gasPrices.data);

  const lcd = new LCDClient({
    URL: Mainnet.url,
    chainID: Mainnet.chainID,
    gasPrices: gasPricesCoins,
    gasAdjustment: '1.5',
  });
  const myAddress = 'xpla1rtud563g983fspg00k4k27y5j82w8tcr0v4tvs';

  const addresses = [
    'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx',
    'xpla1asvgm5x6dm2k2m59pu6t750l0eqswddh8pjulqwe3kvk25tz9g4q640zex',
    'xpla1vk7v6qvmxflnhggs6q2jzf8vhjyeansv579t2n',
    'xpla1qxfrqlf8tpz532w0t5gz76ud4qg398xrr29r65',
    'xpla124tapgv8wsn5t3rv2cvywh4ckkmj6mc6fkya005qjmshnzewwm9qavng3e',
  ];

  const balances = await Promise.all(
    addresses.map(async (address) => {
      const [balance] = await lcd.bank.balance(address);
      if (balance.toData()[0] === undefined) {
        return '0';
      } else {
        return balance.toData()[0].amount;
      }
    }),
  );

  const results = balances.map((balance) => {
    const result =
      Math.round((parseFloat(balance) / Math.pow(10, 18)) * 100) / 100;
    return result;
  });

  const tokens = [
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1kq4cdqvdsz5a3sznh2nn4sah6z44gdj0wf5xc3',
    },
    {
      tokenName: 'CTXT',
      tokenAddress:
        'xpla1r57m20afwdhkwy67520p8vzdchzecesmlmc8k8w2z7t3h9aevjvs35x4r5',
      walletAddress: 'xpla1tllq2ej243um8l5wg620s8pupnh4zs4a8n62rj',
    },
    {
      tokenName: 'LCT',
      tokenAddress:
        'xpla1ddstvl38skwpm284gfaqukn3e8c4mlf26mssy5hppeq6ar2nnw0sr8vh6m',
      walletAddress: 'xpla1g8hkzkgfa3uq0cg9d6h99jk5nlg92lwx2jme2l',
    },
    {
      tokenName: 'CST',
      tokenAddress:
        'xpla1hdnu502uecmddk9w48kxvekgp43mjdpr3mza9kj2tfvjpgef5grszl8rur',
      walletAddress: 'xpla12svc9dd4wjz4elm6jfpm0u75q3saf46ruq6gzq',
    },
  ];

  for (const { tokenAddress, walletAddress } of tokens) {
    const response = await lcd.wasm.contractQuery(tokenAddress, {
      balance: { address: walletAddress },
    });
    console.log(
      `Token: ${tokenAddress}, Wallet: ${walletAddress}, Balance: ${response['balance']}`,
    );
  }

  return results;
}

async function getXplaTokenBalance2() {
  const gasPrices = await axios('https://cube-fcd.xpla.dev/v1/txs/gas_prices');
  const gasPricesCoins = new Coins(gasPrices.data);
  const tokens = [
    {
      tokenName: 'ELX',
      tokenAddress:
        'xpla1hz3svgdhmv67lsqlduu0tcnd3f75c0xr0mu48l6ywuwlz43zssjqc0z2h4',
      walletAddress: 'xpla1kq4cdqvdsz5a3sznh2nn4sah6z44gdj0wf5xc3',
    },
    {
      tokenName: 'CTXT',
      tokenAddress:
        'xpla1r57m20afwdhkwy67520p8vzdchzecesmlmc8k8w2z7t3h9aevjvs35x4r5',
      walletAddress: 'xpla1tllq2ej243um8l5wg620s8pupnh4zs4a8n62rj',
    },
    {
      tokenName: 'LCT',
      tokenAddress:
        'xpla1ddstvl38skwpm284gfaqukn3e8c4mlf26mssy5hppeq6ar2nnw0sr8vh6m',
      walletAddress: 'xpla1g8hkzkgfa3uq0cg9d6h99jk5nlg92lwx2jme2l',
    },
    {
      tokenName: 'CST',
      tokenAddress:
        'xpla1hdnu502uecmddk9w48kxvekgp43mjdpr3mza9kj2tfvjpgef5grszl8rur',
      walletAddress: 'xpla12svc9dd4wjz4elm6jfpm0u75q3saf46ruq6gzq',
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
        return '0';
      } else {
        return response['balance'];
      }
    }),
  );

  const results = balances.map((balance) => {
    const result =
      Math.round((parseFloat(balance) / Math.pow(10, 6)) * 100) / 100;
    return result;
  });
  return results;
}
