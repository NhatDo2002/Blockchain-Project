/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const manageStudent = require('./manageStudent');

module.exports.AssetTransfer = manageStudent;
module.exports.contracts = [manageStudent];
