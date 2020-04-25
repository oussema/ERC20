const path=require('path');
const fs= require('fs');
const solc=require('solc');

const tokenPath= path.resolve(__dirname,'Contracts','customToken.sol');

const source =fs.readFileSync(tokenPath,'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'customToken.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
//console.log(JSON.parse(solc.compile(JSON.stringify(input))));

const result= JSON.parse(solc.compile(JSON.stringify(input)));
//console.log(result.contracts['customToken.sol'].CustomToken.evm.bytecode.object);
module.exports = {
    abi:result.contracts['customToken.sol'].CustomToken.abi,
    bytecode: result.contracts['customToken.sol'].CustomToken.evm.bytecode.object
}