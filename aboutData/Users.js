import mongoose from "mongoose";
 let schema= mongoose.Schema;
 const userSchema=new schema({
    email:{   
        type: String,
        required: true
    },
    username:{   
        type: String,
    },
    password:{   
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default to current date/time
      },
    updatedAt: {
        type: Date,
        default: Date.now // Sets default to current date/time
      },
    carts:{
        type: Array,
        default: []
      },
    orders:{
        type: Array,
        default: []
      }
 })


 export default mongoose.models.Users || mongoose.model("Users",userSchema )