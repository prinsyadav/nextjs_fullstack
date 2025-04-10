import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    connect();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return {
        status: 400,
        message: "User already exists",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("user saved", savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        data: savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
