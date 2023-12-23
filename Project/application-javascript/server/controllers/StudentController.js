const path = require('path');
const { Gateway, Wallets, FileSystemWallet } = require('fabric-network');

const { buildCCPOrg1, buildWallet } = require('../../../test-application/javascript/AppUtil');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

const mspOrg1 = 'Org1MSP';
const walletPath = '/home/nhatdo0511/Project/application-javascript/server/utils/wallet';
const org1UserId = 'motnguoimoi';

class StudentController{
    // [GET] /api/getAllStudent/:condition
    async getStudentWithCondition(req, res, next){
        if(!req.params.condition) return res.status(500)
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
        
            console.log('\n--> Evaluate Transaction: GetAssetsWithConditions, function returns all the current assets on the ledger have right condition');
                let result = await contract.evaluateTransaction('GetAssetsWithCondition',req.params.con);
                console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        
            res.status(200).json({response: result.toString()});;
        
          }catch(err){
            console.log(err)
            process.exit(1)
          }finally{
            gateway.disconnect();
        }
    }

    async getAllStudent(req, res, next){
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
        
            console.log('\n--> Evaluate Transaction: GetAssetsWithConditions, function returns all the current assets on the ledger have right condition');
            let result = await contract.evaluateTransaction('GetAllAssets');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        
            res.status(200).json({response: result.toString()});;
        
          }catch(err){
            console.log(err)
            process.exit(1)
          }finally{
            gateway.disconnect();
        }
    }

    async getStudentWithMSSV(req, res, next){
      if(!req.params.mssv) return res.status(500)
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
        
            console.log('\n--> Evaluate Transaction: GetAssetsWithConditions, function returns all the current assets on the ledger have right condition');
            let result = await contract.evaluateTransaction('ReadAsset',`${req.params.mssv}`);
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        
            res.status(200).json({response: result.toString()});;
        
          }catch(err){
            console.log(err)
            process.exit(1)
          }finally{
            gateway.disconnect();
        }
    }
}

module.exports = new StudentController