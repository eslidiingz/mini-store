import { iProduct } from "@/models/products";
import { atom } from "recoil";

export const SALE_PRODUCT_SELECTED_STATE = atom({
  key: "SALE_PRODUCT_SELECTED_STATE",
  default: {} as iProduct
})