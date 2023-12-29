import { iProduct } from '@/models/products'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { iProductSale } from '../page'
import { numberFormat } from '@/misc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

interface BillProps {
  saleList: iProduct[]
  onAmountChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
  onUpdateSaleList: (product_id: string) => void
}


const Bill = ({ saleList, onAmountChange, onUpdateSaleList }: BillProps) => {
  return (
    <SaleBill>
      <table className='w-full'>
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">@</th>
            <th className="text-right">Total</th>
            <th className="text-right">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {saleList?.map((product: any, index: number) => (
            <tr key={product.id} className='text-sm'>
              <td className='text-left text-gray-500'>{product.name}</td>
              <td className='text-center text-gray-500'>{product.price}</td>
              <td className='text-center'>
                <input
                  type="number"
                  value={product.amount}
                  className="w-12 text-center p-0 rounded border border-gray-200 text-gray-500"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onAmountChange(e, index)}
                  min={1}
                />
              </td>
              <td className='text-right text-gray-500'>{numberFormat(product.price * product.amount)}</td>
              <td className='text-right'>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className='text-xs text-red-500 cursor-pointer'
                  onClick={() => onUpdateSaleList(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SaleBill>
  )
}

export default Bill

const SaleBill = styled.div`
  background: white;
  padding: 1rem;
  overflow: auto;
  margin-bottom: 1rem;
  height: calc(100vh);
  border-radius: 0.5rem;
`