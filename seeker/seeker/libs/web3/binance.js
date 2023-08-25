const Web3 = require("web3");

module.exports = (network) => {
    if (network === "Testnet") {
        return new Web3("https://data-seed-prebsc-1-s1.binance.org:8545").eth;
    }

    return new Web3("https://bsc-dataseed.binance.org").eth;
}
