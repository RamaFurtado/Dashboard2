import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                gap: "2vh",
                marginTop: "30px"
            }}
        >
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
        </div>
    )
}
