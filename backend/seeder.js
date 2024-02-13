import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import businesses from "./data/businesses.js";
import User from "./model/userModel.js";
import Business from "./model/businessModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Business.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleBusiness = businesses.map((business) => {
      return { ...business, user: adminUser };
    });

    await Business.insertMany(sampleBusiness);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Business.deleteMany();

    console.log('Data Destroyed!');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
};