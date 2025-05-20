/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/getValidToken";
import { TSkillInput } from "@/types";

export const createSkill = async (skillData: TSkillInput): Promise<any> => {
  const token = await getValidToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(skillData), // ✅ Properly formatted
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Skill creation failed");
  }

  return data;
};
