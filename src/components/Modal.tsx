'use client'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

type ModalProps = {
  title?: string
  size?: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

const Modal = (props: ModalProps) => {

  let size = props.size ? props.size : 'md'
  let maxWidthClass = "";

  
  switch (size) {
    case 'sm':
      maxWidthClass = 'max-w-sm'
      break;
    case 'lg':
      maxWidthClass = 'max-w-3xl'
      break;
    case 'xl':
      maxWidthClass = 'max-w-5xl'
      break;
    default:
      maxWidthClass = 'max-w-lg'
      break;
  }
  
  return (
    <>
      {props.open && (
        <ModalWrapper
          className="bg-[#37303094] fixed flex inset-0 isSzjz items-center justify-center sc-bkkfxM z-50"
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <ModalContainer className={`${maxWidthClass} shadow`}>
            <ModalHeader className="border-b border-gray-200 pb-4 mb-4">
              <div className="text-xl font-bold">{props.title}</div>
              <button onClick={props.onClose}><FontAwesomeIcon icon={faTimes} className="text-gray-300 hover:text-gray-500 text-xl" /></button>
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  )
}

export default Modal

const ModalWrapper = styled.div`

`

const ModalContainer = styled.div`
  background: white;
  width: 100%;
  border-radius: 8px;
  padding: 28px;
  position: relative;
  z-index: 1000;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModalBody = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  /* overflow: hidden;
  padding-right: 8px;

  &:hover { 
    overflow: auto;
    padding-right: 6px;
  } */
  
  /* &::-webkit-scrollbar {
    display: none;
  } */
`

const ModalFooter = styled.div`

`
