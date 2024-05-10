import React, { useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { database, auth } from "../../firebase";
import GoogleSignin from "../../Components/GoogleSignin";

export default function Register({ handleClose2 }) {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("")
    const register = async () => {
        setLoading(true);
        const user = auth.createUserWithEmailAndPassword(email, password).then((user) => {
            setLoading(false);
            database.ref(`Users/${user.user.uid}`).update({
                uid: user.user.uid,
                username: email.split('@')[0],
                photo: `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${email.split('@')[0]}?size=96`,
                email: email,
                createdAccountOn: Date.now(),
                timestamp: Date.now(),
            }).then(() => {
                setLoading(false);
                localStorage.setItem('uid', user.user.uid)
                handleClose2()
            }).catch((e) => {
                setLoading(false);
                setError(e.toString())
                setShow(true)
            });
        }).catch((e) => {
            console.log(e);
            setLoading(false);
            setError(e.toString())
            setShow(true)
        });
    };
    return (
        <>
            {show && <Alert variant="danger" onClose={() => {
                setShow(false)
                setError("")
            }
            } dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <div>
                    {error}
                </div>
            </Alert>}
            <div className="login">
                <div className="login__container">
                    <div className="login__text">
                        <h4>
                            Register
                        </h4>
                    </div>
                    <div className="d-grid gap-2">
                        <TextField
                            label="Email"
                            variant="standard"
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2" style={{ marginTop: "10px" }}>
                        <TextField
                            label="Password"
                            variant="standard"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2" style={{ marginTop: "20px" }}>
                        <Button
                            variant="warning"
                            size="md"
                            id="uploadBtn"
                            onClick={() => register()}
                        >
                            {loading ? "Please Wait.." : "Register"}
                        </Button>
                    </div>
                    <GoogleSignin close={handleClose2} />
                </div>
            </div>
        </>
    );
}