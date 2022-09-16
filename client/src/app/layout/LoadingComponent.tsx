import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

interface Props {
    message?: string
}

export default function LoadingComponent({message='Loading...'}: Props) {
  return (
    <Backdrop open={true} invisible={true}>
        <Box display='flex'
            justifyContent='center'
            alignItems='center'
            height='100vh'>
            <CircularProgress size={100} color='secondary'/>
            <Typography 
                variant='h4' 
                sx={{ justifyContent: 'center',position:'fixed'  ,top: '60%'}}>
                    {message}
                </Typography>
        </Box>
    </Backdrop>
  )
}
