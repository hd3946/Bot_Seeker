const Caver = require("caver-js");
const caver = new Caver();
const BN = caver.utils.BN;

module.exports = {
    wei_to_ether: (number) => {
        return parseFloat(caver.utils.convertFromPeb(number, "KLAY"));
    },

    ether_to_wei: (number) => {
        return new BN(caver.utils.toPeb(number.toString(), "KLAY"));
    },

    value_to_number: (value) => {
        return new BN(parseInt(value));
    },

    power: (base, exponent) => {
        return new BN(base).pow(new BN(exponent));
    },

    is_same_address: (address1, address2) => {
        return address1.toLowerCase() === address2.toLowerCase();
    },
}
