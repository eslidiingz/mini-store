'use client'

import Input from "@/components/Form/Input"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { storeProduct, updateProduct } from "../actions"
import { useRouter } from "next/navigation"
import SelectBox from "@/components/Form/Select"
import { iCategory } from "@/models/category"
import { allCategories } from "@/app/categories/actions"
import { useRecoilState } from "recoil"
import { PRODUCT_IS_RESET_STATE, PRODUCT_SELECTED_STATE } from "../state.recoil"
import { iProduct } from "@/models/products"
import Switch from "@/components/Form/Switch"

type FormProduct = {
  barcode: string
  name: string
  price: number
  cost_price: number
  photo?: any
  category_id: string
  is_active?: boolean
}

type FormProductError = Omit<FormProduct, "price" | "cost_price"> & {
  price: string
  cost_price: string
};

type ProductFormProps = {

}

const ProductForm = (props: ProductFormProps) => {
  const [form, setForm] = useState<FormProduct>({
    barcode: "",
    name: "",
    price: NaN,
    cost_price: NaN,
    category_id: "",
  } as FormProduct)
  const [isReset, setIsReset] = useRecoilState<boolean>(PRODUCT_IS_RESET_STATE)
  const [errors, setErrors] = useState<FormProductError>({} as FormProductError)
  const router = useRouter()
  const [productSelected, setProductSelected] = useRecoilState(PRODUCT_SELECTED_STATE)
  const [file, setFile] = useState<File|null>()
  const [previewUrl, setPreviewUrl] = useState<string|null>(null);


  const handleInputChange = (e: ChangeEvent<HTMLFormElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (category: iCategory) => {
    setForm({ ...form, category_id: category.id })
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setFile(file)
      // setForm({ ...form, photo: file })
      // setForm({ ...form, photo: URL.createObjectURL(file) })
      previewFile(file)
    }
  }

  const previewFile = (file: File|null) => {
    if ( file ) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const validatedForm = (): boolean => {
    let errs = {} as FormProductError
    if (form?.barcode.trim().length < 10) errs = { ...errs, barcode: 'Enter barcode' }
    if (form?.name.trim().length < 1) errs = { ...errs, name: 'Enter product name' }
    if (form?.price == null || form?.price < 1 || isNaN(form?.price)) errs = { ...errs, price: 'Enter price' }
    if (form?.cost_price == null || form?.cost_price < 1 || isNaN(form?.cost_price)) errs = { ...errs, cost_price: 'Enter cost price' }
    if (form?.category_id.trim().length < 1) errs = { ...errs, category_id: 'Select category' }
    setErrors(errs)

    return Object.values(errs).every(value => value === "")
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validatedForm()) {
      let filePath = ( file ) ? await uploadFile() : null

      try {
        let product: any
        let _form = ( file ) ? { ...form, photo: filePath } : form

        if (productSelected?.id) {
          product = await updateProduct(productSelected?.id, _form)
        } else {
          product = await storeProduct(_form)
        }

        if (product) resetForm()
      } catch (error) {
        console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: ProductForm.tsx:49 ~ handleFormSubmit ~ error:", error)
      }
    }
  }

  const uploadFile = async () => {
    if ( file ) {
      try {
        const data = new FormData()
        data.set('file', file)
  
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data
        })
        // handle the error
        if (!res.ok) throw new Error(await res.text())

        const resJson = await res.json()
        return resJson?.path 
      } catch (e: any) {
        // Handle errors here
        console.error(e)
      }
    }
  }

  const resetForm = () => {
    setForm({
      barcode: "",
      name: "",
      price: NaN,
      cost_price: NaN,
      category_id: categories[0].id,
    } as FormProduct)
    setProductSelected({} as iProduct)
    setIsReset(true)
    setFile(null)
    setPreviewUrl(null)
    router.refresh()
  }

  const [categories, setCategories] = useState<iCategory[]>([] as iCategory[])
  const [optionSelected, setOptionSelected] = useState<any>()
  const _initComponent = async () => {
    const all_categoreis: any = await allCategories()
    if (all_categoreis?.length) {
      setCategories(all_categoreis || [])
      setOptionSelected(all_categoreis[0])
      setForm({ ...form, category_id: all_categoreis[0].id } as FormProduct)
    }
  }

  useEffect(() => {
    _initComponent()
  }, [])

  useEffect(() => {
    if (productSelected?.id) {
      const { barcode, name, price, cost_price, category_id, is_active, category } = productSelected
      setForm({ ...form, barcode, name, price, cost_price, category_id, is_active, } as FormProduct)
      if (category) setOptionSelected({ ...optionSelected, id: category.id, name: category.name })
    }
  }, [productSelected])

  return (
    <section className="px-6">
      <div className="text-2xl mb-2 font-semibold">Product Form</div>

      <form onSubmit={handleFormSubmit} className="">
        <div className="form-group">
          <label htmlFor="barcode" className="label">Barcode<span className="text-red-400">*</span>{errors.barcode && <span className="helper-error">{errors.barcode}</span>}</label>
          <Input
            type="text"
            name="barcode"
            id="barcode"
            placeholder="Barcode..."
            className="w-full"
            onChange={(e: ChangeEvent<HTMLFormElement>) => handleInputChange(e)}
            value={form.barcode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="label">Name<span className="text-red-400">*</span>{errors.name && <span className="helper-error">{errors.name}</span>}</label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name..."
            className="w-full"
            onChange={(e: ChangeEvent<HTMLFormElement>) => handleInputChange(e)}
            value={form.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="label">Price<span className="text-red-400">*</span>{errors.price && <span className="helper-error">{errors.price}</span>}</label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Price..."
            className="w-full"
            onChange={(e: ChangeEvent<HTMLFormElement>) => handleInputChange(e)}
            value={form.price}
            min={1}
            step="any"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost_price" className="label">Cost price<span className="text-red-400">*</span>{errors.cost_price && <span className="helper-error">{errors.cost_price}</span>}</label>
          <Input
            type="number"
            name="cost_price"
            id="cost_price"
            placeholder="Cost price..."
            className="w-full"
            onChange={(e: ChangeEvent<HTMLFormElement>) => handleInputChange(e)}
            value={form.cost_price}
            min={1}
            step="any"
          />
        </div>

        <div className="form-group">
          {categories.length > 0 && (
            <SelectBox
              options={categories}
              optionsSelected={optionSelected}
              label="Category"
              isRequired={true}
              // isInvalid={Boolean(errors.category_id)}
              errorMessage={errors.category_id}
              isReset={isReset}
              onChange={(category: iCategory) => handleCategoryChange(category)}
              onReset={() => setIsReset(false)}
            />
          )}
        </div>

        {productSelected?.id && (
          <div className="form-group">
            <label className="label">Status: <span className="font-normal">{productSelected.is_active ? "Active" : "Inactive"}</span></label>

            <Switch
              status={productSelected.is_active}
              onChange={(newStatus: boolean) => setProductSelected({ ...productSelected, is_active: newStatus })}
            />

          </div>
        )}

        <div className="form-group">
          <div className="col-span-full">
            <label htmlFor="photo" className="label">
              Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-6">
              <div className="text-center">
                {previewUrl || productSelected?.photo ? (
                  <img src={previewUrl || productSelected?.photo} className="w-full" alt="product-image" />
                ) : (
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary-color)] focus-within:ring-offset-2 hover:text-[var(--primary-color)]"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/jpeg, image/png"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handlePhotoChange(e)}
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs leading-5 text-gray-600">Support file: PNG, JPG</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="btn btn-primary">Save</button>
          {productSelected?.id && <button className="btn btn-secondary" type="button" onClick={() => { setProductSelected({}), resetForm() }}>Cancel</button>}
        </div>
      </form>
    </section>

  )
}

export default ProductForm
