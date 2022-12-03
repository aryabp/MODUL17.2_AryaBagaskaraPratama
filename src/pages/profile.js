import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

 
// Abaikan kode di bawah ini
let theme = createTheme({
    palette: {
      primary: {
        main: '#F5F5F5',         // Used elsewhere
      },
      success: {
        main: '#11C6A9',         // custom button color (seafoam green)
        contrastText: '#ffffff', // custom button text (white)
      },
      error: {
        main: '#C6112E',         // custom button color (red)
      },
    },
});

const Profile = () => {
    // State untuk mengecek apakah user sudah login atau belum
    const [isLogin, setIsLogin] = React.useState(false)

    // Default user, ganti dengan data user yang didapat dari localstorage
    const [user, setUser] = React.useState({
        id: 1,
        name: 'MHadi',
        email: 'm.hadi@gmail.com'
    })

    // Modifikasi kode di bawah ini untuk mengambil data dari localstorage
    React.useEffect(() => {
        // 1. Ambil data user dari localstorage
        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')

        // 2. buat fungsi verifikasi token yang sama seperti di halaman home
        const verifikasi = () =>{
          axios.post(process.env.REACT_APP_URL_BACKEND +`/verify`,{jwt:token,email:email}).then(
              (a)=>{return a}
              
        )

      }
        // panggil fungsi verifikasi token di bawah sini
        const semen = verifikasi()
        // 3. Lakukan setUser dengan data user yang didapat dari localstorage
        setUser(semen)
        setIsLogin(true)
    }, [])

    const handleToHome = () => {
        window.location.href = '/';
    };

    const handleLogout = async () => {
        // 1. Hapus localStorage
        localStorage.removeItem('user');

        // 2. Hit endpoint logout dengan body jwt yang didapat dari localstorage
        //   dan setelah berhasil, beri alert sukses
        await axios.post(process.env.REACT_APP_URL_BACKEND +'/logout', {
            jwt: localStorage.getItem('token')
        })
        .then((res) => {
            alert('Logout Success');
        })

        // 3. Redirect ke halaman login, clue : window.location.href = "/"
        window.location.href = '/login';
    }

    if(!isLogin) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Profile
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleToHome}
                            >
                                Back to Home
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ m: 1 }} />
            <Typography component="h3" variant="h6">
                Name: {user.username}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography component="h3" variant="h6" align="center">
                ID: {user.id}
              </Typography>
              <Typography component="h3" variant="h6" align="center">
                Email: {user.email}
              </Typography>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleToHome}
              >
                Home
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default Profile