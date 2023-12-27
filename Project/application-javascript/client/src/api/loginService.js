import * as httpRequests from './httpRequests';

export const accountLogin = async (user) => {
    try{
        const res = await httpRequests.post(`login/account-login`, {
            username: user.username,
            password: user.password
        })
        return res.response
    }catch(error){
        console.log(error)
    }
}

export const getAllAccount = async () => {
    try{
        const res = await httpRequests.get('login/')
        return res.data
    }catch (err){
        console.log(err)
    }
}

export const createAccount = async (mssv) => {
    try{
        const res = await httpRequests.post('login/create', {
            MSSV: mssv
        })
        return res.response
    }catch (err){
        console.log(err)
    }
}