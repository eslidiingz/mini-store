'use client'
import { iProduct } from '@/models/products'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { destroyProduct } from '../actions'
import { useRecoilState } from 'recoil'
import { PRODUCT_SELECTED_STATE } from '../state.recoil'
import Pagination from '@/components/Pagination'

type ProductTableProps = {
  products: {
    currentPage: number
    pages: number
    currentItems: number
    totalItems: number
    results: iProduct[] | any
  }
}

const ProductTable = ({ products }: ProductTableProps) => {
  const router = useRouter()
  const params: any = useSearchParams();
  const page = parseInt(params.get('page')) || 1

  const [_, setEdit] = useRecoilState(PRODUCT_SELECTED_STATE)
  const [paginate, setPaginate] = useState({
    currentPage: products.currentPage,
    pages: products.pages,
    currentItems: products.currentItems,
    totalItems: products.totalItems,
  })

  const deleteProduct = async (id: string | any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await destroyProduct(id)
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success',
          )
          router.refresh()
        } catch (error) {
          console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: ProductTable.tsx:49 ~ deleteProduct ~ error:", error)
        }
      }
    })
  }

  const nextPage = () => {
    if (page >= products.pages) return
    router.push(`/products?page=${page + 1}`)
  }

  const previousPage = () => {
    if (page <= 1) return
    router.push(`/products?page=${page - 1}`)
  }

  return (
    <section>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-2 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Name
            </th>
            <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-center">
              Price
            </th>
            <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-center">
              Cost
            </th>
            <th scope="col" className="p-2 text-left text-sm font-semibold text-gray-900">
              Catogory
            </th>
            <th scope="col" className="p-2 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="relative py-2 pl-3 pr-2 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products?.results?.map((product: iProduct) => (
            <tr key={product?.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap py-2 pr-2 text-sm sm:pl-0 md:pl-2">
                <div className="flex items-center">
                  <div className="h-11 w-11 flex-shrink-0">
                    <img className="h-11 w-11" src={product?.photo ?? `https://via.placeholder.com/44`} alt={product?.name} />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{product?.name}</div>
                    <div className="mt-1 text-gray-500">{product?.barcode}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap p-2 text-sm text-gray-500 text-center">
                <div className="text-gray-900">{product?.price}</div>
              </td>
              <td className="whitespace-nowrap p-2 text-sm text-gray-500 text-center">
                <div className="mt-1 text-gray-500">{product?.cost_price}</div>
              </td>
              <td className="whitespace-nowrap p-2 text-sm text-gray-500">{product?.category?.name}</td>
              <td className="whitespace-nowrap p-2 text-sm text-gray-500">
                {product?.is_active ?
                  <>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Active
                    </span>
                  </> : <>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                      Inctive
                    </span>
                  </>}
              </td>
              <td className="relative whitespace-nowrap py-2 pl-3 text-right text-sm font-medium sm:pr-0 md:pr-2 space-x-2">
                <span className="text-yellow-500 hover:text-yellow-800 cursor-pointer" onClick={() => setEdit(product)}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <span className="text-red-500 hover:text-red-800 cursor-pointer" onClick={() => deleteProduct(product?.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        paginate={paginate}
        onNext={nextPage}
        onPrevious={previousPage}
      />
    </section>
  )
}

export default ProductTable
