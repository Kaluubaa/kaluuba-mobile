import { apiGet } from "./api";
import endpoints from "./endpoints";

export const getUserBalance = async () => {
  return apiGet<any>(endpoints.transactions.getBalance);
}