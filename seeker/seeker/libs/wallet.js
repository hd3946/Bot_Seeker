module.exports = (web3) => {
    return {
        add: (keyring) => {
            return web3.accounts.wallet.add(keyring);
        }    
    }
}
