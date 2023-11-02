export interface IToastItem {
  type?: "success" | "info" | "warn" | "error";
  title?: string;
  message?: string;
  id?: number;
}
