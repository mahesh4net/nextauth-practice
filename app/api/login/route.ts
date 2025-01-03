import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(req: Request) {


  try {
    const body = await req.json();


    const validateData = loginSchema.parse(body);
    const { email, password } = validateData;

    const user = true;
    
    if (!user) {
      return NextResponse.json({commonError: 'user does not exists with this details !'}, {status: 400})
    }

    return NextResponse.json({user: user}, {status: 201})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({validationError: error.flatten()}, {status: 400})
    } else{
      return NextResponse.json({commonError: 'unexpected error occured !'}, {status: 500})
    }
  }


}
