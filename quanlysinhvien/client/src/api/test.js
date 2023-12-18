import * as httpRequests from './httpRequests';

export const getTest = async () => {
    try{
        const res = await httpRequests.get(`api/hello`)
        return res.data
    }catch (error){
        console.log(error)
    }
}
