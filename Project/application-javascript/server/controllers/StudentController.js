const path = require('path');
const { Gateway, Wallets, FileSystemWallet } = require('fabric-network');

const { buildCCPOrg1, buildWallet } = require('../../../test-application/javascript/AppUtil');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

//const mspOrg1 = 'Org1MSP';
const currentFolderPath = __dirname;
const walletPath = path.join(currentFolderPath, '../utils/wallet');
const org1UserId = 'motnguoimoi';

class StudentController{
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
        
            console.log('\n--> Evaluate Transaction: GetAllStudent, function returns all the current students on the ledger');
            let result = await contract.evaluateTransaction('GetAllStudents');
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

    async createStudent(req, res, next) {
      if(!req.body) {return res.status(500);}
      const { mssv: MSSV, name: HOVATEN, gender: GIOITINH, faculty: KHOA, dob: NAMSINH, gpa: GPA } = req.body;
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
  
        console.log(`\n--> Evaluate Transaction: UpdateAsset, function returns the specific asset with the studentId ${req.body.mssv}`);
        await contract.submitTransaction('CreateAsset', `${MSSV}`, `${HOVATEN}`, `${GIOITINH}`, `${KHOA}`, `${NAMSINH}`, `${GPA}`);
        console.log('*** Successfully submitted transaction to create student');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
  
        console.log(`\n--> Evaluate Transaction: ReadAsset, function returns the specific asset with the studentId ${MSSV}`);
        let newValue = await contract.evaluateTransaction('ReadAsset', `${MSSV}`);
        console.log(`*** Result: ${prettyJSONString(newValue.toString())}`);
        res.status(200).json({
          createdStudent: prettyJSONString(newValue.toString())
        });
  
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }

    async updateStudentInformation(req, res, next)  {
      if(!req.body) {return res.status(500);}
      const { mssv: MSSV, name: HOVATEN, gender: GIOITINH, faculty: KHOA, dob: NAMSINH, gpa: GPA } = req.body;
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
  
        console.log(`\n--> Evaluate Transaction: UpdateAsset, function returns the specific asset with the studentId ${req.body.mssv}`);
        await contract.submitTransaction('UpdateAsset', `${MSSV}`, `${HOVATEN}`, `${GIOITINH}`, `${KHOA}`, `${NAMSINH}`, `${GPA}`);
        console.log('*** Successfully submitted transaction to update student');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
  
        console.log(`\n--> Evaluate Transaction: ReadAsset, function returns the specific asset with the studentId ${MSSV}`);
        let newValue = await contract.evaluateTransaction('ReadAsset', `${MSSV}`);
        console.log(`*** Result: ${prettyJSONString(newValue.toString())}`);
        res.status(200).json({
          newValue: prettyJSONString(newValue.toString())
        });
  
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }

    async deleteStudentInfomation(req, res, next){
      if(!req.body) {return res.status(500);}
      console.log(req.body)
      const { MSSV } = req.body
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
  
        console.log(`\n--> Evaluate Transaction: DeleteAsset, function returns the specific asset with the studentId ${req.body.MSSV}`);
        await contract.submitTransaction('DeleteAsset', `${MSSV}`);
        console.log('*** Successfully submitted transaction to update student');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
        res.status(200).json({response:{
            code: 0,
            message: "Đã xóa thành công"
          }
        });
  
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }
  
    async insertStudentMark(req, res, next) {
      if(!req.body) {return res.status(500);}
      const { MSSV, TENMONHOC, QT1, QT2, GIUAKY, CUOIKY } = req.body;
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
  
        console.log(`\n--> Evaluate Transaction: UpdateAsset, function returns the specific asset with the studentId ${req.body.mssv}`);
        await contract.submitTransaction('AddMarks', `${MSSV}`, `${TENMONHOC}`, `${QT1}`, `${QT2}`, `${GIUAKY}`, `${CUOIKY}`);
        console.log('*** Successfully submitted transaction to insert student\'s marks');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
        console.log(`\n--> Evaluate Transaction: ReadAsset, function returns the specific asset with the studentId ${MSSV}`);
        let newValue = await contract.evaluateTransaction('ReadAsset', `${MSSV}`);
        console.log(`*** Result: ${prettyJSONString(newValue.toString())}`);
        res.status(200).json({
          newValue: prettyJSONString(newValue.toString())
        });
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }
  
    async updateStudentMark(req, res, next) {
      if(!req.body) {return res.status(500);}
      const { MSSV, TENMONHOC, QT1, QT2, GIUAKY, CUOIKY } = req.body;
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
  
        console.log(`\n--> Evaluate Transaction: UpdateAsset, function returns the specific asset with the studentId ${req.body.mssv}`);
        await contract.submitTransaction('UpdateMarks', `${MSSV}`, `${TENMONHOC}`, `${QT1}`, `${QT2}`, `${GIUAKY}`, `${CUOIKY}`);
        console.log('*** Successfully submitted transaction to update student\'s marks');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
        console.log(`\n--> Evaluate Transaction: ReadAsset, function returns the specific asset with the studentId ${MSSV}`);
        let newValue = await contract.evaluateTransaction('ReadAsset', `${MSSV}`);
        console.log(`*** Result: ${prettyJSONString(newValue.toString())}`);
        res.status(200).json({
          newValue: prettyJSONString(newValue.toString())
        });
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }
  
    async deleteStudentMark(req, res, next) {
      if(!req.body) {return res.status(500);}
      const { MSSV, TENMONHOC } = req.body;

      console.log(req.body, MSSV, TENMONHOC)
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
  
        console.log(`\n--> Evaluate Transaction: UpdateAsset, function returns the specific asset with the studentId ${req.body.mssv}`);
        await contract.submitTransaction('DeleteMarks', `${MSSV}`, `${TENMONHOC}`);
        console.log('*** Successfully submitted transaction to delete student\'s marks');
        console.log('*** Waiting for transaction commit');
        console.log('*** Transaction committed successfully');
        console.log(`\n--> Evaluate Transaction: ReadAsset, function returns the specific asset with the studentId ${MSSV}`);
        let newValue = await contract.evaluateTransaction('ReadAsset', `${MSSV}`);
        console.log(`*** Result: ${prettyJSONString(newValue.toString())}`);
        res.status(200).json({
          newValue: prettyJSONString(newValue.toString())
        });
      }catch(err){
        console.log(err);
        process.exit(1);
      }finally{
        gateway.disconnect();
      }
    }
}

module.exports = new StudentController