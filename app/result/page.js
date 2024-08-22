'use client'
const { Container, CircularProgress, Typography, Box, Grid, Button } = require("@mui/material")
import { redirect, useSearchParams } from "next/navigation"
// const { useRouter } = require("next/router")
import { useState, useEffect } from "react"



const ResultPage = () => {
    // const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect( () =>{
        const fetchCheckoutSession = async () => {
            if (!session_id) return redirect('/')
            try {
                const response = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const sessionData = await response.json()
                if (response.ok) {
                    console.log(sessionData)
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error has occured while retrieving the session.')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if (loading){
        return (
            <Container maxWidth="sm" sx= {{textAlign: 'center', mt:3}}>
                <CircularProgress/>
                <Typography varient="h6">Loading...</Typography>
            </Container>
        )
    }

    if (error){
        return (
            <Container maxWidth="sm" sx= {{textAlign: 'center', mt:3}}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        )
    }

    return (
    <Container maxWidth="sm" sx= {{textAlign: 'center', mt:3}}>
        {session.payment_status ==='paid' ? (
            <>
                <Typography variant="h4" > Thank you for supporting us! Enjoy all ther perks!</Typography>
                <Box sx={{mt: 2}}>
                    <Typography variant="h6" > Session ID: {session_id}</Typography>
                    <Typography variant="body1">
                        We have recieved you payment successfully! You will recieve an email with the order details soon.
                    </Typography>
                    <Button variant="contained" href="/">Return Home</Button>
                </Box>
            </>
        ) : ( redirect('/')
            // <>
            // <Typography variant="h4" > Payment Failed :(</Typography>
            // <Box sx={{mt: 2}}>
            //     <Typography variant="h6" > Your payment was not successful, Please try again!</Typography>
            //     <Button variant="contained" href="/">Return Home</Button>
            // </Box>
            // </>
        )}

    </Container>
    )
}

export default ResultPage;