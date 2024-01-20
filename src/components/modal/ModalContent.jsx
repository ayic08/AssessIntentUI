import React from 'react'
import styled, { css } from 'styled-components'

const ContentStyle = styled.div`
	position: relative;

	height: 80%;
	
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;

	padding: 1em;

	${(props) =>
		props.minHeight &&
		css`
			min-height: ${props.minHeight};
		`}
`

const ModalContent = (props) => (
	<ContentStyle {...props}>
		{props.children}
	</ContentStyle>
)

export default ModalContent
