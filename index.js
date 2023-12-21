import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import configuration from '../build/contracts/Auction.json';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:7545'
);

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const accountEl = document.getElementById('account');

const enterAuction = async () => {
    let a = web3.utils.toWei("1", "ether");
    const accounts = await web3.eth.requestAccounts();
    const bid = await contract.methods.placeBid().send({
        from: accounts[1],
        value: a,
    });
    console.log(bid);
}
const finalizeAuction = async () => {
    const accounts = await web3.eth.requestAccounts();
    const bid = await contract.methods.finalizeAuction().send({
        from: account
    });
    console.log(bid);
}
const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    accountEl.innerText = account;
}
window.enterAuction = enterAuction;
window.finalizeAuction = finalizeAuction;
main();