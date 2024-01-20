import React from 'react'

import { default as Content } from './ModalContent'
import { default as Footer } from './ModalFooter'
import { default as Header } from './ModalHeader'
import { default as ModalWrapper } from './ModalWrapper'
export { theme } from './styles'

const Modal = ({ body: { header, content, footer }, ...props }) => {
	const handleClose = () => {
		if (props.onClose) props.onClose()
	}

	return (
		<ModalWrapper {...props} onClose={handleClose}>
			<Header {...header} onClose={handleClose} />
			<Content minHeight={props.minHeight}>{content}</Content>
			<Footer>{footer}</Footer>
		</ModalWrapper>
	)
}

export { Modal }
