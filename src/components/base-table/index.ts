import { createUseTable } from "v3-usehook";
import ST from "./ST.vue";
import type { DataTableColumn, DataTableProps } from "naive-ui";

export const useST = createUseTable<DataTableColumn, DataTableProps>({
  component: ST,
  req: {
    reName: {
      index: "current"
    }
  },
  res: {
    reName: {
      list: "items"
    }
  }
});
