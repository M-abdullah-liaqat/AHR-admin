import mongoose from "mongoose"

async function ConnectDB() {
await mongoose.connect(`mongodb+srv://${process.env.DBusername}:${process.env.DBpassword}@ahrtraders.56kuu1m.mongodb.net/AHR`);
}

export default ConnectDB;
