import * as httpRequests from './httpRequests';

export const getStudent = async (q) => {
    try{
        const res = await httpRequests.get(`student/${q}`)
        return res.response
    }catch (error){
        console.log(error)
    }
}

export const getAllStudent = async () => {
    try{
        const res = await httpRequests.get(`student/`)
        return res
    }catch (error){
        console.log(error)
    }
}

export const getStudentWithMSSV = async (mssv) => {
    try{
        const res = await httpRequests.get(`student/${mssv}`)
        return res
    }catch (error){
        console.log(error)
    }
}
