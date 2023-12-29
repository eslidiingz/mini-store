import React from 'react'
import styled from 'styled-components'
import { iProductSale } from '../page'

const TotalBalance = ({ saleList }: { saleList: iProductSale[] }) => {
  return (
    <TotalBalanceContainer>
      <div className='ml-2 text-xs'>Total amount: </div>
      <div className="leading-none">{saleList?.reduce((prev: number, next: any) => prev + next.amount * next.price, 0)}</div>
    </TotalBalanceContainer>
  )
}

export default TotalBalance


const TotalBalanceContainer = styled.div`
  font-size: 5rem;
  text-align: right;
  background: black;
  color: var(--primary-color);
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`