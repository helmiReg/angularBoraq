export interface Page<T> {
  content: T[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: {sorted: boolean, unsorted: boolean, empty: boolean};
  totalElements?: number;
  totalPages?: number
}
