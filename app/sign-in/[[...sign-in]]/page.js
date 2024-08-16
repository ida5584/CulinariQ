import { SignIn } from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Container, Link, Button, Box } from '@mui/material'

export default function SignInPage() {
  return <Container>
    <AppBar position="sticky">
          <Toolbar>
          <Typography variant="h6" style={{flexGrow:1}}><Link color="inherit" href="/" passHref>CulinariQ</Link></Typography>
            {/* <Button color="inherit">
                <Link color="inherit" href="/login" passHref>Login</Link>
            </Button> */}
            <Button color="inherit">
                <Link color="inherit" href="/sign-up" passHref>Sign Up</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box display='flex' flexDirection="column" alignItems='center' justifyContent='center' p={3}>
        <SignIn />
        </Box>
  </Container> 
}