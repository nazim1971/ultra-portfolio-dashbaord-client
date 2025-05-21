import { getValidToken } from "@/lib/getValidToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllMessage = async (
  page?: string,
  limit: string = '12',
 
): Promise<any> => {
  try {
    const token = await getValidToken();
    if (!token) {
      return { success: false, message: "Authentication token not found" };
    }

    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);


    // Add any other query params similarly...

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/message?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['MESSAGE'],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || 'Unknown error' };
  }
};



