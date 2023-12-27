import * as httpRequests from './httpRequests';

export const updateMark = async (info) => {
    try{
        const res = await httpRequests.put("/student/mark", {
            MSSV: info.MSSV,
            TENMONHOC: info.TENMONHOC,
            QT1: info.QT1,
            QT2: info.QT2,
            GIUAKY: info.GIUAKY,
            CUOIKY: info.CUOIKY
        })
        return res.newValue
    }catch (err){
        console.log(err)
    }
}

export const deleteMark = async (info) => {
    try{
        const res = await httpRequests.post("/student/mark", {
            MSSV: info.MSSV,
            TENMONHOC: info.TENMONHOC
        })
        return res.newValue
    }catch (err){
        console.log(err)
    }
}