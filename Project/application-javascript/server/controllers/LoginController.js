const path = require('path');
const { Gateway, Wallets, FileSystemWallet } = require('fabric-network');

const { buildCCPOrg1, buildWallet } = require('../../../test-application/javascript/AppUtil');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const currentFolderPath = __dirname
const walletPath = path.join(currentFolderPath, '../utils/wallet');
const org1UserId = 'motnguoimoi';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

class LoginController{
    async getAllAccount(req, res, next){
        const ccp = buildCCPOrg1();

        const gateway = new Gateway();
        const wallet = await buildWallet(Wallets, walletPath);
        try{
          await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
          });
      
          const network = await gateway.getNetwork(channelName);
          const contract = network.getContract(chaincodeName);
          
          console.log(`\n--> Evaluate Transaction: Login, function returns result of login with the asset ${req.body.username} and ${req.body.password} stored in the world state with given id.`);
          let result = await contract.evaluateTransaction('GetAllAccount');
          let accounts = JSON.parse(result)
          console.log(accounts)
          return res.status(200).json({data: accounts})
        }catch(err){
          console.log(err)
          process.exit(1)
        }finally{
          gateway.disconnect();
        }
    }

    async accountLogin(req, res, next){
      if(!req.body) {return res.status(500);}
      const ccp = buildCCPOrg1();

      const gateway = new Gateway();
      const wallet = await buildWallet(Wallets, walletPath);
      try{
          await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
          });
      
          const network = await gateway.getNetwork(channelName);
          const contract = network.getContract(chaincodeName);
          
          console.log(`\n--> Evaluate Transaction: Login, function returns result of login with the asset ${req.body.username} and ${req.body.password} stored in the world state with given id.`);
          let result = await contract.evaluateTransaction('GetAllAccount');
          let accounts = JSON.parse(result)
          console.log(accounts)

          let count = 0

          if(!req.body.username || !req.body.password){
            return res.json({
              response: {
                code: 1,
                message: "Vui lòng nhập đầy đủ"},
            })
          }
          accounts.forEach(account => {
            if(account.USERNAME === req.body.username && account.PASSWORD === req.body.password){
              res.setHeader('Content-Type', 'application/json');
              return res.json({response:{
                code:0, 
                data: JSON.stringify(account)
              }});
            }else if(count == accounts.length - 1){
              return res.json({
                response: {
                  code: 1,
                  message: "Tài khoản không tồn tại"},
              })
            }

            count = count + 1
          });
        }catch(err){
          console.log(err)
          process.exit(1)
        }finally{
          gateway.disconnect();
        }
    }

    async createAccount(req, res, next){
      if(!req.body) {return res.status(500);}
      const { MSSV, HOVATEN } = req.body
      const password = "TDTU" + MSSV
      const ccp = buildCCPOrg1();

      const gateway = new Gateway();
      const wallet = await buildWallet(Wallets, walletPath);
      try{
        await gateway.connect(ccp, {
          wallet,
          identity: org1UserId,
          discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
    
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Submit Transaction: CreateAccount, function creates account asset on the ledger');
        const result = await contract.submitTransaction('CreateAccount', `${MSSV}`,`${password}`, `${HOVATEN}`);
        console.log('*** Result: committed');
        if (result !== '') {
          console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        }
        return res.status(200).json({response: result})
      }catch(err){
        console.log(err)
        process.exit(1)
      }finally{
        gateway.disconnect();
      }
    }
}

module.exports = new LoginController