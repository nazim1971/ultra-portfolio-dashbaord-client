/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
// import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

// export const registerUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const loginUser = async (userData: FieldValues): Promise<any> => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//       method: 'POST',
//       body: JSON.stringify(userData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const result = await res.json();

//     if (result?.success) {
//       (await cookies()).set('accessToken', result?.data?.accessToken);
//       (await cookies()).set('refreshToken', result?.data?.refreshToken);
//     }

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const getCurrentUser = async (): Promise<any> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logOut = async (): Promise<void> => {
  (await cookies()).delete('accessToken');
  (await cookies()).delete('refreshToken');
};

export const getNewToken = async (refreshToken: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refreshToken`,
      {
        method: 'POST',
        headers: {
          Authorization: `${refreshToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};