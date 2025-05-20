import { getValidToken } from "@/lib/getValidToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllProjects = async (
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
      `${process.env.NEXT_PUBLIC_BASE_API}/project?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['PROJECT'],
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
export const getSingleProjectDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['PROJECT'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
