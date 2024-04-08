'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@/components/Pagination'
import { iSaleProduct, iSaleProductGroupById } from '@/models/sale_product'
import dayjs from 'dayjs'
import { numberFormat } from '@/misc'

type SaleProductTableProps = {
    sale_products: any
    // sale_products: {
    //     results: iSaleProduct[] | iSaleProductGroupById[] | any
    // }
}
const SaleProductTable = ({ sale_products }: SaleProductTableProps) => {
    // console.log("%c%s", "background: #04b8f4; color: #000000", "🚀 ~ file: SaleProductTable.tsx:13 ~ SaleProductTable ~ sale_products:", sale_products)

    return (
        <section>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" className="py-2 sm:pl-0 md:pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                            Sale ID
                        </th>
                        <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-center">
                            Items
                        </th>
                        <th scope="col" className="p-2 text-sm font-semibold text-gray-900 text-center">
                            Total
                        </th>
                        {/* <th scope="col" className="p-2 text-left text-sm font-semibold text-gray-900">
                            Catogory
                        </th>
                        <th scope="col" className="p-2 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th> */}
                        {/* <th scope="col" className="relative py-2 pl-3 pr-2 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th> */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sale_products?.results?.map((sale: any) => (
                        <tr key={sale?.sale_id} className="hover:bg-gray-50">
                            <td className='p-2 pl-4'>
                                <div>
                                    {sale?.sale_id}
                                </div>
                                <div>
                                    <small className="text-gray-400">{dayjs(sale?._min?.created_at).format("YYYY-MM-DD HH:mm:ss")}</small>
                                </div>
                            </td>
                            <td className="whitespace-nowrap p-2 text-sm text-gray-500 text-center">
                                <div className="text-gray-900">{sale?._sum?.amount}</div>
                            </td>
                            <td className="whitespace-nowrap p-2 text-sm text-gray-500 text-center">
                                <div className="text-gray-900">{numberFormat(sale?._sum?.total_balance)}</div>
                            </td>
                        </tr>
                    ))}

                    {/* {products?.results?.map((product: iProduct) => (
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
                    ))} */}
                </tbody>
            </table>

            {/* <Pagination
                paginate={paginate}
                onNext={nextPage}
                onPrevious={previousPage}
            /> */}
        </section>
    )
}

export default SaleProductTable