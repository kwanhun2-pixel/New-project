export const getPagination = (page?: string, limit?: string) => {
  const take = Math.min(parseInt(limit || '10', 10), 50);
  const skip = (parseInt(page || '1', 10) - 1) * take;
  return { take, skip };
};
