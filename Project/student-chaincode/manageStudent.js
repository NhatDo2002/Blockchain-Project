const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract, Context } = require('fabric-contract-api');

const dataset = require('./dataset')

class manageStudent extends Contract{


    async InitLedger(ctx) {
        const assets = dataset.assets;

        for (const asset of assets) {
            asset.docType = 'asset';
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
            NAMSINH: NAMSINH,
            GPA: GPA,
            MONHOC: []
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, MSSV) {
        const assetJSON = await ctx.stub.getState(MSSV); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${MSSV} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, MSSV, HOVATEN, GIOITINH, KHOA, NAMSINH, GPA) {
        const exists = await this.AssetExists(ctx, MSSV);
        if (!exists) {
            throw new Error(`The asset ${MSSV} does not exist`);
        }

        let studentNeedUpdate = JSON.parse(this.ReadAsset(MSSV));

        // overwriting original asset with new asset
        const updatedAsset = {
            MSSV: MSSV,
            HOVATEN: HOVATEN,
            GIOITINH: GIOITINH,
            KHOA: KHOA,
            NAMSINH: NAMSINH,
            GPA: GPA,
            MONHOC: studentNeedUpdate.MONHOC
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
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

    async GetAssetsWithCondition(ctx, contidion){
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
            if(record.KHOA === contidion){
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async UpdateSubject(ctx, MSSV,TENMONHOC, QT1, QT2, GIUAKY, CUOIKY){
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

        let studentNeedUpdate = JSON.parse(this.ReadAsset(MSSV));
        studentNeedUpdate.MONHOC.push(subject)
        return ctx.stub.putState(MSSV, Buffer.from(stringify(sortKeysRecursive(studentNeedUpdate))));
    }
}

module.exports = manageStudent