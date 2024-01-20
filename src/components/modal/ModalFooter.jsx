import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.footer`
	position: relative;

	min-height: 52px;
	box-sizing: border-box;

	display: flex;
	flex-direction: row;
	align-items: center;

	padding: 1em;
`

const ModalFooter = (props) => (
	<FooterStyle className='modalFooterC' {...props}>
		{props.children}
	</FooterStyle>
)

export default ModalFooter
