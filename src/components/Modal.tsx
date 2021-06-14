import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import { FaTimes, FaCopy } from 'react-icons/fa'
import './../styles/Modal.css'

interface Props {
  onClose: React.MouseEventHandler
  id: string
}

const Modal: React.FC<Props> = ({ onClose, id }) => {
  const [message, setMessage] = useState('')

  const copyId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(id)
      setMessage('Copied to clipboard!')
    } catch (e) {
      setMessage('Error occurred.')
    }
  }

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'><FaTimes onClick={onClose} /></div>
        <div className='modal-body'>
          <QRCode
            value={id}
            renderAs='svg'
            size={232}
            bgColor='#222632'
            fgColor='#ffffff'
          />
          <div className='modal-copy'>
            <div className='modal-id'>{id}</div>
            <div className='modal-clipboard' title='Copy ID' onClick={copyId}><FaCopy /></div>
          </div>
          <span className={`modal-message ${message === 'Error occurred.' ? 'brr' : ''}`}>{message}</span>
        </div>
      </div>
    </div>
  )
}

export default Modal
