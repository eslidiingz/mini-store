'use client'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FormEvent, useState } from 'react'
import Input from '../Form/Input'
import { storeCategory } from '@/app/categories/actions'
import { Category } from '@/models/category'
import { useRouter } from 'next/navigation'

const CategoryForm = () => {
  const router = useRouter()
  
  const [name, setName] = useState<string>('')
  const [errorName, setErrorName] = useState<string>('')

  const validateForm = (): boolean => {
    if (name.trim().length < 4) {
      setErrorName('Name must be at least 4 characters')
    }

    return name.trim().length >= 4
  }

  const addNewCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (validateForm()) {
      await storeCategory(name)
      router.refresh()
      
      setName('')
      setErrorName('')
    }
  }


  return (
    <form onSubmit={addNewCategory}>
      <div className='flex'>
        <div>
          <Input
            type="text"
            name="name"
            id="name"
            autoComplete='off'
            placeholder='New category name'
            style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
            inValid={errorName}
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
        </div>

        <button
          className='btn btn-primary flex items-center'
          style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className='ml-1'>Add</span>
        </button>
      </div>

      {errorName && <p className='helper-error'>{errorName}</p>}
    </form>
  )
}

export default CategoryForm
