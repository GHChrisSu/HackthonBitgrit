var Contract_ABI = [{
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "IPOwnersProductForQuery",
    "outputs": [{"name": "name", "type": "string"}, {"name": "price", "type": "uint256"}, {
        "name": "ISBN",
        "type": "bytes32"
    }, {"name": "owner", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "BuyersProductForQuery",
    "outputs": [{"name": "name", "type": "string"}, {"name": "price", "type": "uint256"}, {
        "name": "ISBN",
        "type": "bytes32"
    }, {"name": "owner", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "IPOwner", "type": "address"}, {"name": "ISBN", "type": "bytes32"}],
    "name": "buyIP",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_name", "type": "string"}, {"name": "_price", "type": "uint256"}],
    "name": "publishIP",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "IPOwner", "type": "address"}, {
        "indexed": false,
        "name": "name",
        "type": "string"
    }, {"indexed": false, "name": "ISBN", "type": "bytes32"}, {"indexed": false, "name": "price", "type": "uint256"}],
    "name": "NewIP",
    "type": "event"
}]
