var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');
//web3.eth.getBalance("0x7d665BcB4D3BAdB3Cd387Ca480f5AdbC0958EB39").then(value=>{console.log(value)})
const contract=require('./contract.json')
//0x7d665BcB4D3BAdB3Cd387Ca480f5AdbC0958EB39 
// web3.eth.personal.newAccount('!@superpassword')
// .then(console.log);
//0x6F9d5dF8012d438675192eCDCae479DfB8E17936 contrct adrdress


let abi = contract.abi
let bytecode =contract.bytecode

//Contract object and account info
let deploy_contract = new web3.eth.Contract(abi);
let account = '0xC4757D014eBD019d77d07a482Eeca85B4426Ba55';


// Function Parameter
let payload = {
    data: bytecode
}

let parameter = {
    from: account,
    gas: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
}

// Function Call
// deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
//     console.log('Transaction Hash :', transactionHash);
// }).on('confirmation', () => {}).then((newContractInstance) => {
//     console.log('Deployed Contract Address : ', newContractInstance.options.address);
// })

