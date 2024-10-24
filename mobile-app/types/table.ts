export type TTableResponse<T> = {
    items: T[];
    totalPages: number;
    limit: number;
    page: number;
  };
  