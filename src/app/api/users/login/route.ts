import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const userExists = await User.findOne({
      email,
    });
    if (!userExists) {
      return NextResponse.json({
        status: 400,
        message: "User does not exist",
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        message: "Invalid password",
      });
    }

    //create token data
    const tokenData = {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      status: 200,
      message: "Login successful",
      data: userExists,
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
