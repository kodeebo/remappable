import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useScore } from './util/score-context'

    const headerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    height: 120px;
    box-shadow: -10px 10px 10px #cccccc;
    background-color: papayawhip;`


const Header = () => {
    const {state} = useScore();
    return (
        <header css={headerStyle}>
        <h1>Remappable</h1>
        <h3>{`Din score er ${state.score}`}</h3>
      </header>
    )
}

export default Header
