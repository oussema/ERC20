const Web3= require('web3');
const {abi,bytecode}=require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    '947d0458f84e82e67f85a7cd725ccfacdcb57e11a868864db2ab41556391f5c1',
    'https://rinkeby.infura.io/v3/14ea7e91103e495c981ce73e342108db'
  );
  const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: '0x'+bytecode,arguments:["khawla","KHW",1,100000] })
      .send({  from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);
  };
  deploy();

