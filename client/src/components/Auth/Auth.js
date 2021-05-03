import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Container, Paper, Typography, Grid, Button, Avatar} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import {useDispatch} from "react-redux";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import {signin, signup} from "../../actions/auth";

const initialState = { lastName: '', firstName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        //console.log(res)
        try {
            dispatch({ type: "AUTH", data: { result, token } })
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Connexion avec Google a echouée!")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} element={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography> { isSignup ? "Identification" : "Authentification" }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="lastName" label="Nom" handleChange={handleChange} autoFocus half/>
                                    <Input name="firstName" label="Prénom" handleChange={handleChange} half/>
                                </>
                            )}
                        <Input name="email" label="E-mail" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Mot de passe" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && (<Input name="confirmPassword" label="Repeter le mot de passe" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>)}
                    </Grid>
                    <Button variant="contained" className={classes.submit} type="submit" color="primary" fullWidth>
                        { isSignup ? "S'incrire" : "S'identifier" }
                    </Button>
                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Se connecter avec Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Vous avez déjà un compte? Se connecter" : "Vous n'avez pas pas de compte? S'incrire" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
export default Auth