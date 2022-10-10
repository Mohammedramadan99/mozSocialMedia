import mongoose from "mongoose";
import "colors";
const dbConnect = async () => {
  try
  {
    await mongoose.connect(
      process.env.MONGODB_URL, //"mongodb+srv://Ecommerce:m1964118@cluster0.7n14b.mongodb.net/mozSocialMedia", //'mongodb://localhost:27017/mozSocialMedia'
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(
      `Db is Connected Successfully: ${process.env.MONGODB_URL}`.green.inverse
    );
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