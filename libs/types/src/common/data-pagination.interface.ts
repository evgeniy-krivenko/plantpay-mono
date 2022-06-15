export interface IDataPagination<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  perPage: number;
  page: number;
  totalPages: number;
}
