const models = require('../models/index');
const { Op } = require("sequelize");
const {findAllBookings,createBooking,findBooking,findBookingsByDate,deleteBooking}=require("../services/booking.services")

const bookingController = {}

//CREAR RESERVA
bookingController.createBooking = async (req, res) => {
    try {
        // const data=req.body;
        console.log("empesemos")
        let resp=await createBooking(req.body,req.auth.id);
        console.log(resp);
        res.json(resp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//RECUPERAR TODAS LAS RESERVAS
bookingController.getAllBookings = async (req, res) => {
    try {
        let resp=await findAllBookings();
        res.json(resp);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}

//RECUPERAR UNA RESERVA

bookingController.getBookingsByUser = async (req, res) => {
    try {
        // console.log(req.auth);
        let resp=await findBooking(req.auth.id);
        res.send(resp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//MODIFICAR PLATO

bookingController.deleteBooking=async(req,res)=>{
    try{
        const data=req.body;
        let resp=await deleteBooking(data.name);
        res.json({ message: "Se ha elminado la reserva correctamente" })
    }catch(error){
        res.json({ message: "Ha ocurrido un error" })
    }
}

bookingController.getFreeTimes = async (req, res) => {
    const data=req.body;
    let times=["14:00","14:15","14:30","14:45","15:00","15:15","15:30"];
    let aviableTimes=new Array();
    let aviable=false;
    let resp=await findBookingsByDate(data.date);
    console.log("LENGTH:"+resp.length);
    if (resp.length==0) {
        aviableTimes=times;
    }
    else{
        for (let i=0; i<times.length; i++){
            for (let j = 0; j < resp.length; j++) {
                if (times[i]==resp[j].dataValues.time) {
                    aviable=false;
                }else{
                    aviable=true;
                }
            }
            if(aviable){
                aviableTimes.push(times[i]);
            }
    
        }
    }
    
    res.send(aviableTimes);
}

module.exports = bookingController;