interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

export type ApiResponse<T> = {
  message: string;
  status: string;
  data: T;
};

export interface PagingInterface {
  totalRow: number;
  totalPage: number;
  page: number;
  perPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  pages: number[];
}

export type ApiPaginationResponse<T> = {
  message: string;
  status: string;
  data: T;
  paging: PagingInterface;
};

export type DataArray<T> = T[];

export type DataObject<T> = T;

export interface ReplyBack {
  200:
    | ApiResponse<DataArray<Array<string | number | boolean> | Object>>
    | ApiResponse<DataObject<any>>
    | ApiPaginationResponse<DataArray<any>>
    | ApiPaginationResponse<DataObject<any>>;
  201:
    | ApiResponse<DataArray<Array<string | number | boolean> | Object>>
    | ApiResponse<DataObject<any>>
    | ApiPaginationResponse<DataArray<any>>
    | ApiPaginationResponse<DataObject<any>>;
}
