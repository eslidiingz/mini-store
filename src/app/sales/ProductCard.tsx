'use client'

import { iProduct } from '@/models/products'
import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { PRODUCT_SELECTED_STATE } from './state.recoil'
import Image from 'next/image'

type ProductCardProps = {
  product: iProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [_, setProductSelected] = useRecoilState<iProduct>(PRODUCT_SELECTED_STATE)

  return (
    <>
      <ProductContainer>
        <ProductCover onClick={() => setProductSelected(product)}>
          <Image 
            src={product?.photo ?? "https://via.placeholder.com/200"} 
            alt={product?.name ?? ""} 
            className="rounded-lg w-full"
            width={0}
            height={0}
            sizes='100vw'
          />
        </ProductCover>
        <div className="my-2">{product?.name}</div>
      </ProductContainer>
    </>
  )
}

export default ProductCard

const ProductContainer = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: gray;
`

const ProductCover = styled.div`
  background: white;
  padding: 0.25rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-width: 100%;
  /* border: 1px dashed lightgray; */
  /* padding-top: calc(100% / 3);
  padding-bottom: calc(100% /3); */

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
  }
`