"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData, role: string) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Create the user in SQLite database
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });

    // 2. Await cookies and log them in
    const cookieStore = await cookies();
    cookieStore.set("userId", user.id);
    cookieStore.set("userRole", user.role);
    cookieStore.set("userName", user.name);

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Email already exists" };
  }
}

export async function loginUser(formData: FormData, role: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { success: false, error: "User not found. Please sign up." };
    }
    if (user.password !== password) {
      return { success: false, error: "Incorrect password." };
    }
    if (user.role !== role) {
      return { success: false, error: `Account exists, but not as a ${role}.` };
    }

    // Await cookies and set them
    const cookieStore = await cookies();
    cookieStore.set("userId", user.id);
    cookieStore.set("userRole", user.role);
    cookieStore.set("userName", user.name);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Something went wrong." };
  }
}