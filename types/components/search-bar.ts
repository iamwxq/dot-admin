import type { RecordType } from "./pro-table";

export interface SearchBarRef<T extends RecordType = any> {
  params: T;
  search: () => void;
  reset: () => void;
}
