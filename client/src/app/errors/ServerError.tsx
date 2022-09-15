import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


export default function ServerError(){
    const navigate =useNavigate();
    const location = useLocation();
    const error =(location.state as any)?.error ;
    return(
        
        <Container component={Paper}>
            {error ?(
                <>
                    <Typography variant="h3" color="error" gutterBottom>{error.title}</Typography>
                    <Divider/>
                    <Typography variant="h5" gutterBottom>{error.detail || 'Internal server error'}</Typography>
                </>
                ) : (
                    <Typography variant="h5" gutterBottom>Server error</Typography>
                )
            }
            <Button onClick={()=> navigate('/catalog')}>Go back to the store</Button>
        </Container>
    );
}