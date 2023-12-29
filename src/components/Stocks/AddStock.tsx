'use client'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Modal from '../Modal'
import StockForm from './StockForm'
import AddStockForm from './AddStockForm'

const AddStock = () => {
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <>
      <button className='btn btn-primary' onClick={() => setOpenForm(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add stock
      </button>

      <Modal 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        title='Add stock'
      >
        <AddStockForm onSaveAndClose={() => setOpenForm(false)} />
      </Modal>

    </>
  )
}

export default AddStock