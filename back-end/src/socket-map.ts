export const userSocketMap = new Map<string, string>();

export const getSocketIdByUserId = (userId: string) => {
  return userSocketMap.get(userId);
};
