import React from 'react'
import {InputAdornment, Grid, IconButton, TextField} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({ name, label, handleChange, autoFocus, type, handleShowPassword, half }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                variant='outlined'
                label={label}
                fullWidth
                required
                onChange={handleChange}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}
export default Input