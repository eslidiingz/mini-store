'use client'
import React, { ChangeEvent } from 'react'
import Input from '../../../components/Form/Input'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'

type BarcodeSearchBoxProps = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  search: string
}

const BarcodeSearchBox = ({ onSearch, search }: BarcodeSearchBoxProps) => {
  return (
    <BarcodeSearchBoxContainer className="flex">
      <FontAwesomeIcon icon={faBarcode} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-300" />
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Scan barcode..."
        className="w-full pl-9"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e)}
        value={search}
      />
    </BarcodeSearchBoxContainer>
  )
}

export default BarcodeSearchBox

const BarcodeSearchBoxContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`

