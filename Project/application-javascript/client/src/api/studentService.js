import * as httpRequests from './httpRequests';

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

export const editStudent = async (student) => {
    try{
        const res = await httpRequests.put('student/information', {
            mssv: student.MSSV,
            name: student.HOVATEN,
            gender: student.GIOITINH,
            faculty: student.KHOA,
            dob: student.NAMSINH,
            gpa: student.GPA
        })
        return res.newValue
    }catch (err){
        console.log(err)
    }
}

export const deleteStudent = async (student) => {
    try{
        const res = await httpRequests.post('student/delete', {
            MSSV: student.MSSV
        })
        return res.response
    }catch (err){
        console.log(err)
    }
}