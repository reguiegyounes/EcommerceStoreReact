import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header(){
    return (

        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">
                    Store
                </Typography>
            </Toolbar>
        </AppBar>

    )
}