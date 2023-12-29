'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Input from '../Form/Input'
import { findProductByBarcode } from '@/app/products/actions'
import { storeStock } from '@/app/stocks/actions'
import { iAddStockForm, iAddStockFormError } from '@/models/stock'
import { useRouter } from 'next/navigation'

interface iAddStockFromProps {
  onSaveAndClose?: () => void
}

const AddStockForm = (props: iAddStockFromProps) => {
  const router = useRouter()

  const [form, setForm] = useState<iAddStockForm>({
    barcode: '',
    product_name: '',
    amount: NaN
  } as iAddStockForm)
  const [errors, setErrors] = useState<iAddStockFormError>({} as iAddStockFormError)
  const [product, setProduct] = useState<any>(null)


  const validatedForm = (): boolean => {
    let errs = {} as iAddStockFormError
    if (form?.barcode.trim().length < 10) errs = { ...errs, barcode: 'Enter barcode' }
    if (form?.product_name.trim().length < 1) errs = { ...errs, product_name: 'Invalid product name' }
    if (form?.amount == null || form?.amount < 1 || isNaN(form?.amount)) errs = { ...errs, amount: 'Enter amount' }
    setErrors(errs)

    return Object.values(errs).every(value => value === "")
  }

  const handleSave = async () => {
    if (validatedForm()) {
      await storeStock(form)
      setForm({ barcode: '', product_name: '', amount: NaN })
      router.refresh()
      return true
    }

    return false
  }

  const saveAndClose = async () => {
    const saved = await handleSave()
    if (saved) props.onSaveAndClose && props.onSaveAndClose()
  }

  useEffect(() => {
    setTimeout(async () => {
      if (form.barcode.trim().length < 10) return

      const product = await findProductByBarcode(form.barcode)
      if (product) {
        setForm({ ...form, product_name: product.name, product_id: product.id })
        setProduct(product)
      } else {
        setProduct(null)
      }
    }, 500)
  }, [form.barcode])

  return (
    <>
      <div className="form-group">
        <label htmlFor="barcode" className='label'>Barcode</label>
        <Input
          id="barcode"
          name="barcode"
          type="text"
          placeholder="Barcode..."
          className="w-full"
          onChange={(e: FormEvent<HTMLInputElement>) => setForm({ ...form, barcode: e.currentTarget.value })}
          value={form.barcode}
        />
        {errors.barcode && <p className="helper-error">{errors.barcode}</p>}
      </div>

      <div className="form-group">
        {/* <label htmlFor="product_name" className='label'>Product name</label> */}
        <Input
          type="text"
          id="product_name"
          name="product_name"
          className="w-full"
          defaultValue={product?.name}
          placeholder="Product name..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, product_name: e.currentTarget.value })}
          value={form.product_name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount" className='label'>Amout</label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="Amount of stock"
          className="w-full"
          onChange={(e: FormEvent<HTMLInputElement>) => setForm({ ...form, amount: parseInt(e.currentTarget.value) })}
          value={form.amount}
        />
        {errors.amount && <p className="helper-error">{errors.amount}</p>}
      </div>

      <div className="flex justify-between">
        <button type="submit" className='btn btn-primary' onClick={() => handleSave()}>Save & Continue</button>
        <button className='btn btn-secondary' onClick={() => saveAndClose()}>Save & Close</button>
      </div>
    </>
  )
}

export default AddStockForm