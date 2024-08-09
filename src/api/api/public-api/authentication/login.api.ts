import { TBodyApiType } from "../../../models/api.body.model";

export const userLoginApi = async ({
  userEmailAddress,
  userPassword,
  verifyToken,
}: TBodyApiType) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_LOCAL_API_URL}user/login?token=${verifyToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmailAddress, userPassword }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
