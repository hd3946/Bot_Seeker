const Web3 = require("web3");

module.exports = (network) => {
    return new Web3("https://us-central1-kmint-gateway.cloudfunctions.net/services/infura/node/" + network.replace("X-", "").toLowerCase()).eth;
}
