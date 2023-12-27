const studentRouter = require('./student')
const loginRouter = require('./login')

function router(app){
  app.use('/student',studentRouter)
  app.use('/login', loginRouter)
}

module.exports = router;
