'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import Input from '../Form/Input'
import { allCategories } from '@/app/categories/actions'
import { iCategory } from '@/models/category'
import SelectBox from '../Form/Select'
import { PhotoIcon } from '@heroicons/react/24/solid'
// import { iStockForm, iStockFormError } from '@/models/stock'
import { storeStock } from '@/app/stocks/actions'


const StockForm = () => {
  const router = useRouter()

  const [categories, setCategories] = useState<iCategory[]>([] as iCategory[])
  const [form, setForm] = useState<any>({} as any)
  const [errors, setErrors] = useState<any>({} as any)

  const _initComponent = async () => {
    const all_categoreis: any = await allCategories()
    setCategories(all_categoreis || [])
  }

  const handleCategoryChange = (category: iCategory) => {
    setForm({
      ...form,
      category_id: category.id
    })
  }

  const validatedForm = (): boolean => {
    if (!form.name) {
      setErrors({
        ...errors,
        name: 'Name is required'
      })
      return false
    }

    return true
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( validatedForm() ) {
      await storeStock(form)
      router.refresh()
    }
  }

  useEffect(() => {
    _initComponent()
  }, [])

  return (
    <form onSubmit={handleFormSubmit} className='p-4'>
      <h3 className='text-2xl font-bold mb-4'>Add stock</h3>

      <div className="form-group">
        <label className='label' htmlFor="barcode">Barcode<span className="text-red-600">*</span></label>
        <Input 
          type="text" 
          name="barcode" 
          id="barcode" 
          placeholder="Product barcode..." 
          autoComplete="off"
          className="w-full" 
        />
      </div>

      <div className="form-group">
        <label className='label' htmlFor="name">Name<span className="text-red-600">*</span></label>
        <Input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Product name..." 
          autoComplete="off"
          className="w-full" 
        />
      </div>

      <div className="form-group">
        <label className='label' htmlFor="description">Description<span className="text-red-600">*</span></label>
        <Input 
          type="text" 
          name="description" 
          id="description" 
          placeholder="Product description..." 
          autoComplete="off"
          className="w-full" 
        />
      </div>

      <div className="form-group">
        <SelectBox 
          options={categories}
          optionsSelected={categories.find((category: iCategory) => category.id === form?.category_id)}
          label="Category" 
          isRequired={true} 
          onChange={(category: iCategory) => handleCategoryChange(category)} 
        />
      </div>

      {/* <div className="form-group">
        <label htmlFor="sell_price">Sell price<span className="text-red-600">*</span></label>
        <Input type="text" name="sell_price" id="sell_price" placeholder="Price to sell..." className="w-full"  />
      </div>
      
      <div className="form-group">
        <label htmlFor="cost_price">Cost price<span className="text-red-600">*</span></label>
        <Input type="text" name="cost_price" id="cost_price" placeholder="Cost price..." className="w-full"  />
      </div> */}

      <div className="form-group">
        <div className="col-span-full">
          <label htmlFor="photo" className="label">
            Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:ring-offset-2 hover:text-[var(--primary-color)]"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <button className='btn btn-primary'>Save</button>
    </form>
  )
}

export default StockForm