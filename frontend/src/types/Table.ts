export type TTableResponse<T> = {
  listResult: T[];
  totalPage: number;
  limit: number;
  page: number;
};
