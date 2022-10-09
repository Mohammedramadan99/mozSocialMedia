import mongoose from "mongoose";
import "colors";
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ecommerce:m1964118@cluster0.7n14b.mongodb.net/mozSocialMedia", // "mongodb://localhost:27017/mozSocialMedia" , process.env.MONGODB_URL
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Db is Connected Successfully".green.inverse);
  } catch (error) {
    console.log(`Error ${error.message}`.red.inverse);
  }
};

export async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}
module.exports = dbConnect;
