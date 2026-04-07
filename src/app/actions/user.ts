"use server";

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Fetch the currently logged-in user's data
export async function getUserProfile() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  
  if (!userId) return null;
  
  return await prisma.user.findUnique({
    where: { id: userId }
  });
}

// Update the user's data
export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  
  if (!userId) return { success: false, error: "Not logged in" };

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name, address },
    });
    
    // Update the cookie so the sidebar name updates instantly
    cookieStore.set("userName", name);
    revalidatePath("/dashboard/user/settings"); // Refresh the page data
    
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}