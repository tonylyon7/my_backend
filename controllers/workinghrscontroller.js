import asyncHandler from "express-async-handler";
import WorkDays from "../models/working_hrs.js";
import User from "../models/user.js";

export const workers = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);
    const workingdays = await WorkDays.findOne({created_by: req.user.id})
    const {day, openingHour, closingHour} = req.body 

    const workExist = await WorkDays.findOne({created_by: req.user.id, "workDays.day": day})
    if (workExist){
        res.json({
            message: "Work day already exist with time"
        })
    }else {
        if(user && workingdays){
            if(workingdays.workDays.length > 7){
                res.json({
                    error: "Workdays cannot exceed seven days"
                })
            }
    
            const updateWork = await WorkDays.findByIdAndUpdate(workingdays._id, {
                $addToSet : {
                    workDays: [ 
                        {
                            day,
                            openingHour,
                            closingHour
                        }
                    ]
                }
            },({new: true, useAndModify: false}))
    
            if(updateWork){
                res.json({
                    status: "Ok",
                    message: "Work days have been updated",
                    data: workingdays
                })
            }
        }else {
            const newWork = await WorkDays.create({
                created_by: req.user.id,
                workDays: [
                    {
                        day,
                        openingHour,
                        closingHour
                    }
                ]
            })
            if(newWork){
                res.json({
                    status: "OK",
                    message: "Work has been created Successfully",
                    data: newWork
                })
            }else {
                res.json({error: "invalid data Provided"})
            }
        }
    }
})

export const Get_Simngle_Working_Hour = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingdays =  await WorkDays.findOne({created_by: req.user.id})
    
    if(user && workingdays){
        let singleWorkDay = workingdays.workDays.find( tony => tony._id == req.params.id)

        if(singleWorkDay){
            res.json({
                status: "OK",
                Message: "work day and time retrived",
                data: singleWorkDay
            })
        }else{
            res.json({
                Message: "Work day and time does not exist"
            })
        }
    }else{
        res.json({
            Message: "This user has not not created a work day"
        })
    }
})

export const update_single_day = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingdays =  await WorkDays.findOne({created_by: req.user.id})
    const {day, openingHour, closingHour} = req.body 

    if(user && workingdays){
        const SingleWorkDay = workingdays.workDays.find(lyon => lyon._id == req.params.id)

        if (SingleWorkDay){
            SingleWorkDay.day = day || SingleWorkDay.day
            SingleWorkDay.openingHour = openingHour || SingleWorkDay.openingHour
            SingleWorkDay.closingHour = closingHour || SingleWorkDay.closingHour
        }

        const savedworkedDays = await SingleWorkDay.save()
        if(savedworkedDays){
            res.json({
                Status: "OK",
                Message: "workday Updated Successfully",
                data: savedworkedDays
            })
        }else{
            res.json({
                message: "Something went Wrong"
            })
        }
    }else{
        res.json({
            error: "Working hour does not Exist"
        })
    }
})

export const Delete_Simngle_Working_Hour = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingdays =  await WorkDays.findOneAndDelete({created_by: req.user.id})
    
    if(user && workingdays){
        let singleWorkDay = workingdays.workDays.find( tony => tony._id == req.params.id)

        const updateWork = await WorkDays.findByIdAndUpdate(workingdays._id, {
            $pullAll : {
                workDays: [singleWorkDay]
            }
        }, ({new: true, useAndModify: false}))

        if(updateWork){
            res.json({
                status: "OK",
                Message: "work day and time deleted successfully",
                data: workingdays
            })
        }else{
            res.json({
                Message: "Work day and time does not exist"
            })
        }
    }else{
        res.json({
            Message: "This user has not not created a work day"
        })
    }
})