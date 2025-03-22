import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    db.on("error", (error) => {
      console.log("Error connecting to MongoDB", error);
    });
  } catch (error) {
    console.log(error);
  }
}
