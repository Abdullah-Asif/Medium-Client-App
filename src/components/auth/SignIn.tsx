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
import {SignInModel} from "../../models/signInModel";
import {useNavigate } from 'react-router-dom'
import {useAuth} from "../../contexts/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

const defaultTheme = createTheme();

export default function SignIn() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values: SignInModel) => {
        try {
            console.log(values);
            await login(values);
            toast.success("Login successful !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            // setTimeout(() => {
            //     navigate("/blogs");
            // }, 3000);
            navigate("/blogs");

        }catch (error) {
            toast.error(`${error.message}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{
                            username: '',
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
                                                helperText={touched.username && errors.username}
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
                                                helperText={touched.password && errors.password}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link to="/auth/sign-up" className="text-blue-500 hover:underline">
                                                Don't have an account? Sign Up
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