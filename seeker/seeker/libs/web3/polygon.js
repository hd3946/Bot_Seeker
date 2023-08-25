const Web3 = require("web3");

module.exports = (network) => {
    if (network === "Mumbai") {
        return new Web3("https://rpc-mumbai.matic.today").eth;
    }

    return new Web3("https://polygon-rpc.com").eth;
}
