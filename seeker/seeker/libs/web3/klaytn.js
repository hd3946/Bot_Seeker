const Caver = require("caver-js");

module.exports = (network) => {
    return new Caver("https://us-central1-kmint-gateway.cloudfunctions.net/services/kas/node/" + network.replace("X-", "").toLowerCase()).klay;
}
