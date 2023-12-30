'use client'

import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRecoilState } from "recoil"
import { PRODUCT_SELECTED_STATE } from "../state.recoil"
import { useRouter } from "next/navigation"

const AddNewProduct = () => {
  const [productSelected, setProductSelected] = useRecoilState(PRODUCT_SELECTED_STATE)

  return (
    <div>
      {productSelected?.id && (
        <a
          type="button"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => setProductSelected({})}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />Add new product
        </a>
      )}
    </div>
  )
}

export default AddNewProduct
