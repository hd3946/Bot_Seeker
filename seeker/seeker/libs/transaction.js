module.exports = (web3) => {
    return {
        send: (transaction) => {
            if (web3.__CHAIN__ === "Klaytn" && transaction["to"]) {
                transaction["type"] = 'SMART_CONTRACT_EXECUTION';
            }
        
            return Promise.all([
                transaction["gasPrice"] ? Promise.resolve() : web3.getGasPrice(),
                transaction["gas"] ? Promise.resolve() : web3.estimateGas(transaction)
            ])
                .then(function([ gasPrice, fee ]) {
                    console.log([ gasPrice, fee ])
                    return web3.sendTransaction(Object.assign(transaction, {
                        gasPrice: gasPrice || transaction["gasPrice"],
                        gas: fee ? fee * 2 : transaction["gas"]
                    }));
                });
        }    
    }
}
