'use strict';
const studentRouter = require('./student');

function router(app){
	app.use('/student',studentRouter);
}

module.exports = router;
