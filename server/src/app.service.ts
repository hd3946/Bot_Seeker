import { Injectable } from '@nestjs/common';
import { Coins, LCDClient } from '@xpla/xpla.js';
import axios from 'axios';
import { Dec, Int } from '@xpla/xpla.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getTokenBalance(): Promise<any> {
    const data = await getXplaTokenBalance(
      'xpla199vw7724lzkwz6lf2hsx04lrxfkz09tg8dlp6r',
    );
    // console.log('DATA:', data);
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

async function getXplaTokenBalance(address2: string) {
  const gasPrices = await axios('https://cube-fcd.xpla.dev/v1/txs/gas_prices');
  const gasPricesCoins = new Coins(gasPrices.data);

  const lcd = new LCDClient({
    URL: Mainnet.url,
    chainID: Mainnet.chainID,
    gasPrices: gasPricesCoins,
    gasAdjustment: '1.5',
  });
  const myAddress = 'xpla1rtud563g983fspg00k4k27y5j82w8tcr0v4tvs';
  // const address_1 = 'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx';
  // const address_2 = 'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx';
  // const address_3 = 'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx';
  // const address_4 = 'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx';
  // const address_5 = 'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx';
  // const [balance_1] = await lcd.bank.balance(address_1);
  // const [balance_2] = await lcd.bank.balance(address_2);
  // const [balance_3] = await lcd.bank.balance(address_3);
  // const [balance_4] = await lcd.bank.balance(address_4);
  // const [balance_5] = await lcd.bank.balance(address_5);

  // const number = balance_1.toData()[0].amount;
  // const result =
  //   Math.round((parseFloat(number) / Math.pow(10, 18)) * 100) / 100;
  // console.log('result', result);
  const addresses = [
    'xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx',
    'xpla1vjsukqzxq7u8hjgrkz24u2asxyfddsx2s9cm5x',
    'xpla1vk7v6qvmxflnhggs6q2jzf8vhjyeansv579t2n',
    'xpla10fwn393zee43n2974ct9yz3nfq9qf0p3mdxjmp',
    'xpla1cc4cw53vp82slkvn7kku9xd4zjlykptehtzwzx',
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

  const tokenAddress =
    'xpla1r57m20afwdhkwy67520p8vzdchzecesmlmc8k8w2z7t3h9aevjvs35x4r5';
  const walletAddress = 'xpla1tllq2ej243um8l5wg620s8pupnh4zs4a8n62rj';
  const response = await lcd.wasm.contractQuery(tokenAddress, {
    balance: { address: walletAddress },
  });
  console.log('response:', response);

  return results;
}
