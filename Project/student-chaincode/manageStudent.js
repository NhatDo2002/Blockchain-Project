const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract, Context } = require('fabric-contract-api');

const dataset = require('./dataset')

class manageStudent extends Contract{


    async InitLedger(ctx) {
        const assets = dataset.assets;

        for (const asset of assets) {
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.MSSV, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, MSSV, HOVATEN, GIOITINH, KHOA, NAMSINH, GPA) {
        const exists = await this.AssetExists(ctx, MSSV);
        if (exists) {
            throw new Error(`The asset ${MSSV} already exists`);
        }

        const asset = {
            MSSV: MSSV,
            HOVATEN: HOVATEN,
            GIOITINH: GIOITINH,
            KHOA: KHOA,
            NAMSINH: parseInt(NAMSINH, 10),
            GPA: parseFloat(GPA),
            MONHOC: [],
            docType: 'student'
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, MSSV) {
        let studentAsBytes = await ctx.stub.getState(MSSV); // get the asset from chaincode state
        if (!studentAsBytes || studentAsBytes.toString().length <= 0) {
            throw new Error(`Asset student with id ${MSSV} does not exist`);
        }
        let student = JSON.parse(studentAsBytes.toString());
        return JSON.stringify(student);
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, MSSV, HOVATEN, GIOITINH, KHOA, NAMSINH, GPA) {
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        }

        // Retrieve the existing asset from the world state
        const assetString = await this.ReadAsset(ctx, MSSV);
        const existingAsset = JSON.parse(assetString);

        existingAsset.HOVATEN = HOVATEN;
        existingAsset.GIOITINH = GIOITINH;
        existingAsset.KHOA = KHOA;
        existingAsset.NAMSINH = parseInt(NAMSINH, 10);
        existingAsset.GPA = parseFloat(GPA);

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(existingAsset.MSSV, Buffer.from(stringify(sortKeysRecursive(existingAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, MSSV) {
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        }
        return ctx.stub.deleteState(MSSV);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, MSSV) {
        const assetJSON = await ctx.stub.getState(MSSV);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async GetAllStudents(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if(record.docType === "student"){
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async AddMarks(ctx, MSSV,TENMONHOC, QT1, QT2, GIUAKY, CUOIKY){
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        };

        let subject = {
            TENMONHOC: TENMONHOC,
            QT1: QT1,
            QT2: QT2,
            GIUAKY: GIUAKY,
            CUOIKY: CUOIKY
        };

        const assetString = await this.ReadAsset(ctx, MSSV);
        const existingAsset = JSON.parse(assetString);

        existingAsset.MONHOC.push(subject)
        await ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(existingAsset))));
        return JSON.stringify(existingAsset);
    }

    async UpdateMarks(ctx, MSSV,TENMONHOC, QT1, QT2, GIUAKY, CUOIKY){
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        };
        
        const assetString = await this.ReadAsset(ctx, MSSV);
        const existingAsset = JSON.parse(assetString);

        // Find the index of the object with the matching subjectname
        const index = existingAsset.MONHOC.findIndex(obj => obj.TENMONHOC === TENMONHOC);

        // If the object is found, update its properties
        if (index !== -1) {
            let subject = {
                TENMONHOC: TENMONHOC,
                QT1: QT1,
                QT2: QT2,
                GIUAKY: GIUAKY,
                CUOIKY: CUOIKY
            };
            existingAsset.MONHOC[index] = { ...subject };
        } else {
            throw new Error(`The asset ${TENMONHOC} does not exist`)
        }
        await ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(existingAsset))));
        return JSON.stringify(existingAsset);
    }

    async DeleteMarks(ctx, MSSV,TENMONHOC){
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        };
        
        const assetString = await this.ReadAsset(ctx, MSSV);
        const existingAsset = JSON.parse(assetString);

        const updatedList = existingAsset.MONHOC.filter(obj => obj.TENMONHOC !== TENMONHOC);

        // If the object is found, update its properties
        if (updatedList.length != existingAsset.MONHOC.length) {
            existingAsset.MONHOC = updatedList;
            await ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(existingAsset))));
            return JSON.stringify(existingAsset);    
        } else {
            throw new Error(`The asset ${TENMONHOC} does not exist`)
        }
    }

    async GetAllAccount(ctx){
        const allAccounts = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if(record.docType === 'account'){
                allAccounts.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allAccounts);
    }

    async CreateAccount(ctx, USERNAME, PASSWORD, HOVATEN){
        let ID = "Student" + USERNAME
        const exists = await this.AssetExists(ctx, ID);
        if (exists) {
            throw new Error(`The asset account ${ID} already exists`);
        }

        const asset = {
            ID: "Student" + USERNAME,
            USERNAME: USERNAME,
            PASSWORD: PASSWORD,
            HOVATEN: HOVATEN,
            docType: "account"
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }
}

module.exports = manageStudent