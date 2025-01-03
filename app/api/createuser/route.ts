import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const createUserSchema = z.object({
  name: z.string().min(1, "username cannot be empty"),
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
    const validateData = createUserSchema.parse(body);
    const { email, password } = validateData;
    const UserExists = false;

    if (UserExists) {
      return NextResponse.json({ commonError: "User already exists with this email" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = "push in database";

    return NextResponse.json({ massage: 'success' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ validationError: error.flatten() }, { status: 400 });
    }
  }

  return NextResponse.json(
    { commonError: "An unexpected error occurred" },
    { status: 500 }
  );
}
