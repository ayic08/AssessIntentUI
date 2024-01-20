import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    position: relative;

    min-height: 52px;
    box-sizing: border-box;

    padding: 1em;

    h5 {
        font-weight: bold;
    }

    #title  {
        margin: 0;
    }

    #close {
        position: absolute;
        margin: 0;

        right: 1em;
        cursor: pointer;

        top: 50%;

        transform: translateY(-50%);
        transition transform 0.3s;

        &:hover {
            transform: rotate(0.5turn) translateY(50%);
        }
    }
`

const ModalHeader = (props) => (
	<HeaderStyle className='modalHeaderC' {...props}>
		<h5 id='title'>{props.title || ''}</h5>
		<FontAwesomeIcon id='close' icon={faTimes} onClick={props.onClose} />
	</HeaderStyle>
)

ModalHeader.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default ModalHeader
