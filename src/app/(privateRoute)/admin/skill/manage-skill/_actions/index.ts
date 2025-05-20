/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/getValidToken";
import { TSkillInput } from "@/types";

export const deleteSkill = async (id: string) => {
  try {
    const token = await getValidToken();

    if (!token)
      return { success: false, message: 'Authentication token not found' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error);
  }
};



export const editSkill = async (id: string, skillData: TSkillInput): Promise<any> => {
  const token = await getValidToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(skillData), // ✅ Send as JSON
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Skill update failed");
  }

  return data;
};



/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllSkills = async (
  page?: string,
  limit: string = '12',
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  try {
    const token = await getValidToken();
    if (!token) {
      return { success: false, message: "Authentication token not found" };
    }

    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    if (query?.searchTerm) {
      params.append('searchTerm', query.searchTerm.toString());
    }

    // Add any other query params similarly...

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['SKILL'],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || 'Unknown error' };
  }
};


// getSingleIdeaDetails
export const getSingleSkillDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['SKILL'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
