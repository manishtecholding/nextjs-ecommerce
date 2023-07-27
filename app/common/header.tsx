'use client'
import React from 'react';
import { styled } from 'styled-components';

const HeaderContainer = styled.div`
    background: white;
    height: 2.5em;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: fixed;
    width: 100%;
`;

const CartButton = styled.a`
    text-decoration: none;
    color: black;
    float: right;
    padding: 0.625em;
`;

const Header = () => {
  return (
    <HeaderContainer>
        <CartButton href={'/cart'}>Cart</CartButton>
    </HeaderContainer>
  )
}

export default Header