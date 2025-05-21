/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/getValidToken";

export const deleteMessage = async (id: string) => {
  try {
    const token = await getValidToken();

    if (!token)
      return { success: false, message: 'Authentication token not found' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error);
  }
};



export const editMessage = async (id: string, messageData: {viewed: boolean}): Promise<any> => {
  const token = await getValidToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(messageData), // ✅ Send as JSON
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Message update failed");
  }

  return data;
};

// Get singel message
export const getSingleMessageDetails = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      next: {
        tags: ['MESSAGE'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


