import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { iProduct } from '@/models/products'
import ProductCard from '../ProductCard'
import ProductCardList from './ProductCardList'

type TopSaleListProps = {
  topSaleList: iProduct[]
}

const TopSale = ({ topSaleList }: TopSaleListProps) => {
  return (
    <TopSaleContainer>
      <HeadingText className='flex items-center'>
        <FontAwesomeIcon icon={faFlagCheckered} className='mr-1' />Top Sale
      </HeadingText>

      <ProductCardList products={topSaleList} />
    </TopSaleContainer>
  )
}

export default TopSale

const TopSaleContainer = styled.div`
  margin-bottom: 2rem;
`

const HeadingText: any = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #50565e;
  display: flex;
  align-items: center;
`