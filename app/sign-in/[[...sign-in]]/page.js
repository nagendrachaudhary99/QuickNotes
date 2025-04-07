import{AppBar,Container, Typography, Button,Box,Toolbar} from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react';
export default function SignUpPage(){
    return <Container maxWidth= "100vw">
        <AppBar position ="static" sx={{backgroundColor: '#3f51b5'}}>
          <Toolbar>
            <Typography
               variant="h6"
               sx={{
                   flexGrow:1,
               }}
            >
               QuickNotes
            </Typography>
            <Button color="inherit">
                <Link href="/login" passHref>
                    Login
                </Link>
            </Button>
            <Button color="inherit">
                <Link href="/signup" passHref>
                    Signup
                </Link>
            </Button>
          </Toolbar>
         </AppBar>

         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">

            <Typography variant="h4"> Sign In</Typography>
               <SignIn/>
           </Box>
    </Container>

}