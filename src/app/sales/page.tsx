'use client'
import { iProduct } from '@/models/products'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { findProductByBarcode, getProductTopSaleList } from '../products/actions'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { storeSaleTransaction } from './actions'
import { getCategories } from '../categories/actions'
import { iCategory } from '@/models/category'
import Bill from './components/Bill'
import TotalBalance from './components/TotalBalance'
import ProductCategories from './components/ProductCategories'
import BarcodeSearchBox from './components/BarcodeSearchBox'
import TopSale from './components/TopSale'
import { SALE_PRODUCT_SELECTED_STATE } from './state.recoil'
import { useRecoilState } from 'recoil'

export interface iProductSale extends iProduct {
  amount: number
}

const SalePage = () => {
  const [search, setSearch] = useState<string>("")
  const [saleList, setSaleList] = useState<any>([])
  const [categories, setCategories] = useState<iCategory[]>([])
  const [topSaleList, setTopSaleList] = useState<any>([])
  const [productSelected, setProductSelected] = useRecoilState<iProduct>(SALE_PRODUCT_SELECTED_STATE)

  const handleSearch = async () => {
    const product: any = await findProductByBarcode(search)
    if (product) addProductToSaleList(product)
  }

  const addProductToSaleList = (product: iProduct) => {
    let productToSaleList = saleList

      if (productToSaleList.length > 0) {
        productToSaleList = productToSaleList.map((item: any) => {
          if (item.id === product.id) {
            return { ...item, amount: item.amount + 1 }
          } else {
            return item
          }
        })

        const productExist = productToSaleList.find((item: any) => item.id === product.id)
        if (productExist == undefined) {
          productToSaleList.push({ ...product, amount: 1 })
        }
      } else {
        productToSaleList.push({ ...product, amount: 1 })
      }
      setSaleList([...productToSaleList]);
      setTimeout(() => setSearch(""), 500)
  }

  const handleAmountChange = (e: any, index: number) => {
    if (isNaN(parseInt(e.target.value))) return

    let productToSaleList = [...saleList].map((item: any, i: number) => {
      return (i === index) ? { ...item, amount: parseInt(e.target.value) } : item
    })

    setSaleList([...productToSaleList])
  }

  const handleCancelSale = () => {
    if (saleList.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to cancel this sale?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6e7881',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          setSaleList([])
        }
      })
    }
  }

  const validatedSave = () => {
    return saleList.length > 0
  }

  const handleSaveSale = async () => {
    if (validatedSave()) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save this sale?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#04b8f4',
        cancelButtonColor: '#6e7881',
        confirmButtonText: 'Confirm'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const stored = await storeSaleTransaction(saleList)

          if (stored) {
            Swal.fire({
              title: 'Success',
              text: "Sale saved successfully",
              icon: 'success',
              confirmButtonColor: '#04b8f4',
              confirmButtonText: 'Ok'
            })
            setSaleList([])
          }
        }
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: "Sale list is empty",
        icon: 'error',
        confirmButtonColor: '#04b8f4',
        confirmButtonText: 'Ok'
      })
    }
  }

  const _initPage = async () => {
    const { results: _categories }: any = await getCategories()
    if (_categories) setCategories(_categories)

    const _topSaleList = await getProductTopSaleList()
    if (_topSaleList) setTopSaleList(_topSaleList)
  }

  useEffect(() => {
    if (search.trim().length >= 12) {
      handleSearch()
    }
  }, [search])

  useEffect(() => {
    if (Object.keys(productSelected).length > 0 ) {
      addProductToSaleList(productSelected)
      setProductSelected({})
    }
  }, [productSelected])

  useEffect(() => {
    _initPage()
  }, [])

  return (
    <div className='bg-[#f6f7fb] h-screen'>
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Left screen */}
        <MainScreen className='col-span-2 p-4'>
          <BarcodeSearchBox onSearch={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} search={search} />

          <TopSale topSaleList={topSaleList} />

          <ProductCategories categories={categories} />
        </MainScreen>

        {/* Right screen */}
        <SummaryScreen className='col-span-1 p-4 flex flex-col'>
          <TotalBalance saleList={saleList} />
            
          <Bill 
            saleList={saleList} 
            onAmountChange={(e: ChangeEvent<HTMLInputElement>, index: number) => handleAmountChange(e, index)}
            onUpdateSaleList={(product_id: string) => setSaleList([...saleList.filter((item: any) => item.id !== product_id)])}
          />
          

          <div className="mt-auto space-y-2">
            {saleList.length > 0 && (
              <>
                <ButtonSaveSale onClick={handleSaveSale}>
                  <span>Pay</span>
                </ButtonSaveSale>
                <ButtonCancelSale onClick={handleCancelSale}>Cancel</ButtonCancelSale>
              </>
            )}

          </div>
        </SummaryScreen>
      </div>

    </div>
  )
}

export default SalePage

const MainScreen = styled.div`
  height: calc(100vh - 2rem);
`

const SummaryScreen = styled(MainScreen)``

const ButtonStyle = styled.button`
  display: block;
  width: 100%;
  padding: 1.5rem 2rem;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.25rem;
`
const ButtonSaveSale = styled(ButtonStyle)`
  background: var(--primary-color);
`
const ButtonCancelSale = styled(ButtonStyle)`
  background: var(--secondary-color);
`


