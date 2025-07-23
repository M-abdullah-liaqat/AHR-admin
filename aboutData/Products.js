import mongoose from 'mongoose';

const Scema= mongoose.Schema;
const ProductSch= new Scema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    ram:{
        type : Array,
        required: true
    },
    storage:{
        type : Array,
        required: true
    },
    images:{
        type: Array,
        required: true
    }
})

export default mongoose.models.Products || mongoose.model("Products", ProductSch)