const assert= require('assert');
const ganache=require('ganache-cli');
const Web3= require('web3');
const web3= new Web3(ganache.provider());

const {abi,bytecode}=require('../compile');

let CustomToken;
let accounts;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();

    CustomToken= await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments:["oussema","OUS",1,1000]})
    .send({from: accounts[0], gas: '1000000'})
})

describe('CustomToken Contract', ()=>{
    it('test deploy contract', ()=>{
        assert.ok(CustomToken.options.address);
    });

    it('test Constrauctor parameters', async()=>{
        const name= await CustomToken.methods.name().call({
            from: accounts[0]
        });
        const symbol=await CustomToken.methods.symbol().call({
            from: accounts[0]
        });
        const decimals=await CustomToken.methods.decimals().call({
            from: accounts[0]
        })
        const totalSupply= await CustomToken.methods.totalSupply().call({
            from: accounts[0]
        })
        assert.equal('oussema',name);
        assert.equal('OUS',symbol);
        assert.equal(1,decimals);
        assert.equal(1000,totalSupply);
    });

    it('test balanceOF function',async()=>{
        const balanceOf= await CustomToken.methods.balanceOf(accounts[0]).call({
            from: accounts[0]
        });
        assert.equal(1000,balanceOf);
    });

    it('test transfer function', async()=>{
        CustomToken.events.Transfer((err,event)=>{console.log(event)});

        await CustomToken.methods.transfer(accounts[1],100).send({
            from: accounts[0]
        });
        await CustomToken.methods.transfer(accounts[2],100).send({
            from: accounts[0]
        });

        const balanceOf1= await CustomToken.methods.balanceOf(accounts[1]).call({
            from: accounts[0]
        });
        const balanceOf2= await CustomToken.methods.balanceOf(accounts[2]).call({
            from: accounts[0]
        });
        assert.equal(100,balanceOf1);
        assert.equal(100,balanceOf2);
    })
})