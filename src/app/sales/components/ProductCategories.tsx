'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { iCategory } from '@/models/category'
import Modal from '@/components/Modal'
import ProductCard from '../ProductCard'
import { iProduct } from '@/models/products'
import ProductCardList from './ProductCardList'

const ProductCategories = ({ categories }: { categories: iCategory[] }) => {
  const [showModalProducts, setShowModalProducts] = useState(false)
  const [categorySelected, setCategorySelected] = useState<iCategory>()

  return (
    <>
      <HeadingText>
        <FontAwesomeIcon icon={faLayerGroup} className='mr-1' />Catgories
      </HeadingText>
      <ProductCategoryList className='grid grid-cols-5 gap-4'>
        {categories?.map((category: iCategory) => (
          <ProductCategory
            key={category.id}
            onClick={() => { setShowModalProducts(true), setCategorySelected(category) }}
          >
            <div>{category.name}</div>
          </ProductCategory>
        ))}
      </ProductCategoryList>

      <Modal
        open={showModalProducts}
        onClose={() => setShowModalProducts(false)}
        size='xl'
        title={`Category: ${categorySelected?.name}`}
      >
        <ProductCardList products={categorySelected?.products || []} />
      </Modal>
    </>
  )
}

export default ProductCategories


const ProductCategoryList = styled.div`
`
const ProductCategory = styled.div`
  background: white;
  padding: 1.25rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  border: 1px dashed lightgray;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  /* padding-top: calc(100% / 3);
  padding-bottom: calc(100% /3); */

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  }
`

const HeadingText: any = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #50565e;
  display: flex;
  align-items: center;
`