import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import { theme } from './styles'

const ModalBackgroundStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;

	background-color: rgba(0, 0, 0, 0.4);

	transition: all 0.3s;
	transition-property: visibility, opacity;

	z-index: ${(props) => props.zIndex || '999'};
`

const ModalStyle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	height: ${(props) => props.height || 'auto'};
	width: ${(props) => props.width || '700px'};
	background-color: white;

	border-radius: 5px;

	display: flex;
	flex-direction: column;

	transition: all 0.3s;
	transition-property: visibility, opacity;

	z-index: ${(props) => props.zIndex || '1000'};
`

const ModalWrapper = (props) => {
	const { show, onClose, zIndex, backDrop = true, children } = props

	return !show
		? null
		: ReactDOM.createPortal(
				<>
					{/* Clickable background to close modal */}
					<ModalBackgroundStyle
						className='modalBackdropC'
						onClick={backDrop ? onClose : null}
						zIndex={zIndex}
					/>
					{/* Fix for themes not being added */}
					<ThemeProvider theme={theme}>
						<ModalStyle className='modalC' {...props}>
							{children}
						</ModalStyle>
					</ThemeProvider>
				</>,
				document.body
		  )
}

ModalWrapper.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default ModalWrapper
