module.exports = (chain, network) => {
    return Object.assign({
        __CHAIN__: chain,
        __NETWORK__: network,
    }, (() => {
        if (chain === "Ethereum") {
            return require("./web3/ethereum")(network);
        }
    
        if (chain === "Polygon") {
            return require("./web3/polygon")(network);
        }
    
        if (chain === "Binance") {
            return require("./web3/binance")(network);
        }
    
        if (chain === "Klaytn") {
            return require("./web3/klaytn")(network);
        }
    })());
}
