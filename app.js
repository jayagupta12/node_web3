const express = require('express')
const bodyParser = require('body-parser')
var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');
const contract = require('./contract.json')

const app = express()
app.use(bodyParser.json())

app.listen(8080)


app.post('/register', (req, res) => {

    let password = req.body.password
    web3.eth.personal.newAccount(password)
        .then(value => res.send(value));
})
app.post('/storeValue', (req, res) => {
    let address = req.body.address
    let value = req.body.value
    let password = req.body.password


    web3.eth.personal.unlockAccount(address, password, 600)
        .then(console.log('Account unlocked!'));


    let contractInstance = new web3.eth.Contract(contract.abi, '0x6F9d5dF8012d438675192eCDCae479DfB8E17936', null)
    contractInstance.methods.set(value).send({ from: address })
        .on('transactionHash', function (hash) {
            console.log("transactionHash", hash)
        })
        .on('receipt', function (receipt) {
            console.log("receipt", receipt)
            web3.eth.personal.lockAccount(address).then(value => res.send(receipt))

        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log("confirmation", confirmationNumber)
        })
        .on('error', function (error, receipt) {
            console.log("error", error)
        })
})

app.post('/getStoredValue', (req, res) => {

    let address = req.body.address
    let password = req.body.password


    web3.eth.personal.unlockAccount(address, password, 600)
        .then(console.log('Account unlocked!'));

    let contractInstance = new web3.eth.Contract(contract.abi, '0x6F9d5dF8012d438675192eCDCae479DfB8E17936', null)
    contractInstance.methods.storedData().call({ from: address }).then(cValue => {
        web3.eth.personal.lockAccount(address).then(value => res.send(cValue))
    })

})

app.post('/deployContract',(req,res)=>{
 let address=req.body.address
 let password=req.body.password

 let abi = contract.abi
 let bytecode =contract.bytecode
 
 //Contract object and account info
 let deploy_contract = new web3.eth.Contract(abi);
 let account = address;
 
 
 // Function Parameter
 let payload = {
     data: bytecode
 }
 
 let parameter = {
     from: account,
     gas: web3.utils.toHex(800000),
     gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
 }

 web3.eth.personal.unlockAccount(address, password, 600)
 .then(console.log('Account unlocked!'));

// Function Call
deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
    console.log('Transaction Hash :', transactionHash);
}).on('confirmation', () => {}).then((newContractInstance) => {
    res.send( newContractInstance.options.address);
})
 
})