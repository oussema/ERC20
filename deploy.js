const Web3= require('web3');
const {abi,bytecode}=require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    ' ',   // use your private key 
    ' '       // use your infura api
  );
  const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: '0x'+bytecode,arguments:["TokenName","Symbol",1,100000] }) //Edit arguments 
      .send({  from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);
  };
  deploy();

