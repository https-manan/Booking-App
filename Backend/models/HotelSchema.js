import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        max:5,
        min:0
    },
    rooms:{
        type:[String], //its also an array as its gonna include roomIdS
        required:true
    },
    cheapestPrice:{
        type:Number, //Here we gonna lisst the cheapest room and all 
        required:true
    },
    featured:{
        type:Boolean,
        default:false,
    },
});

export default mongoose.model('hotelModel',hotelSchema);
