import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return null;
    }
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      return data.id;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
