type ModalProps = {
  children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Modal
