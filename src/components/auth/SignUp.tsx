import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field} from "formik";
import * as Yup from 'yup';
import {SignUpModel} from "../../models/SignUpModel";
import AuthService from "../../services/auth/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/, 'Username must contain at least one letter'),
    name: Yup.string()
        .required('Full name is required')
        .min(3, 'Full name must be at least 3 characters')
        .matches(/^[^\d]*$/, 'Name cannot contain numbers'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
            'Password must contain at least 6 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
});

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = async (values: SignUpModel) => {
        try {
            await AuthService.register(values);
            toast.success("Registration successful !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                navigate("/sign-in");
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,

                });
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik
                        initialValues={{
                            username: '',
                            name: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="username"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={(touched.username && errors.username)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Full Name"
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={(touched.name && errors.name)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="email"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={(touched.email && errors.email)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="password"
                                                required
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                type="password"
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={(touched.password && errors.password)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link to="/sign-in" className="text-blue-500 hover:underline">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}