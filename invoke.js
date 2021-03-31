var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');
const contract = require('./contract.json')

let contractInstance = new web3.eth.Contract(contract.abi, '0x6F9d5dF8012d438675192eCDCae479DfB8E17936', null)
contractInstance.methods.set(10).send({ from: '0xC4757D014eBD019d77d07a482Eeca85B4426Ba55' })
    .on('transactionHash', function (hash) {
        console.log("transactionHash", hash)  })
            .on('receipt', function (receipt) {
                console.log("receipt", receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log("confirmation", confirmationNumber)
            })
            .on('error', function (error, receipt) {
                console.log("error", error)
            })
  