import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";
import Image from 'next/image';
import styles from "../../styles/SignIn.module.scss";
import { useRouter } from 'next/router';

const Signup = (props) => {
    const { supabase } = props;
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmpassword, setConfirmPassword] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [alert, setAlert] = React.useState(null);

    const router = useRouter();

    const redirect = () => {
        router.push("/EducationGroup/Educationgroupformcreation");
    }

    const submit = async (e) => {
        e.preventDefault();
        const { user, session, error } = await supabase.auth.signUp({ email, password, data: {
            name
        } });
        if(error) {
            setAlert({
                type: "danger",
                message: "Oops!! Something happened"
            });
        } else {
            setAlert({
                type: "success",
                message: "An email verification mail has been sent to you."
            });
            setTimeout(() => {
                router.push('/Auth/Signin')
            }, 5000);
        }
    }

    return (
        <React.Fragment>
            {props.getProp('loggedIn') ? redirect(): (
                <div className={`app-container app-theme-white`}>
                    <div className={styles.loginContainer}>
                        <div className={styles.card}>
                            <Image src="/logo.png" alt="me" width="75" height="75" />
                            <Form onSubmit={submit}>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="name" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="John Doe" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="johndoe@demo.com" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"  placeholder="*******" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Confirm Password</Label>
                                    <Input type="password" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} name="confirmpassword"  placeholder="*******" />
                                    {confirmpassword !== null && password !== confirmpassword ? (
                                        <FormText color="muted">
                                            Passwords are not matching
                                        </FormText>
                                    ) : null}
                                </FormGroup>
                                <Button type="submit" disabled={(confirmpassword === null || password === null || email === null || name === null) || (password !== confirmpassword)}>Submit</Button>
                                {alert ? (
                                    <Alert style={{marginTop: "10px"}} color={alert.type}>{alert.message}</Alert>
                                ) : null}
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Signup;
