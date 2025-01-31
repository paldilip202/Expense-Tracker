export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null; // Return null if no user info is found
  try {
    const parsedData = JSON.parse(userInfo);
    return parsedData?.token || null;
  } catch (error) {
    console.error("Error parsing user info:", error);
    return null;
  }
};
