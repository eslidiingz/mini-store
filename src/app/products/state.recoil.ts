import { iProduct } from "@/models/products";
import { atom } from "recoil";

export const PRODUCT_SELECTED_STATE = atom({
  key: "PRODUCT_SELECTED_STATE",
  default: {} as iProduct
})

export const PRODUCT_IS_RESET_STATE = atom({
  key: "PRODUCT_IS_RESET_STATE",
  default: false
})