import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

    const footerStyle = css`display: flex; 
    justify-content: center; 
    height: 80px;
    margin-top: auto;
    `

const Footer = () => {
    return (
        <footer css={footerStyle}>
            <h3>Torgeir Haugen</h3>
        </footer>
    )
}

export default Footer
