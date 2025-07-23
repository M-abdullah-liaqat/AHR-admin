import mongoose from "mongoose"

async function ConnectDB() {
await mongoose.connect(`mongodb+srv://${process.env.DBusername}:${process.env.DBpassword}@ahrtraders.56kuu1m.mongodb.net/?retryWrites=true&w=majority&appName=AHRTraders`);
}

export default ConnectDB;
