'use client'

import React from 'react'
import styled from 'styled-components'

type CardProps = {
    size?: "sm" | "md" | "lg" | "full" | undefined
    children: React.ReactNode
}

const Card = ({ children, size }: CardProps) => {
    return (
        <CardContainer>{children}</CardContainer>
    )
}

export default Card

const CardContainer = styled.div`
    background: white;
    padding: 0.25rem;
    border-radius: 1rem;
    cursor: default;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    max-width: 100%;
    padding: 2rem;
`