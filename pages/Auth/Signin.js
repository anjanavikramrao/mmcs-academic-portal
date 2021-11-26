import React from "react";
import { Button, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap";
import Image from 'next/image';
import styles from "../../styles/SignIn.module.scss";
import { useRouter } from 'next/router'

const Signin = (props) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [alert, setAlert] = React.useState(null);
    const router = useRouter();

    const redirect = () => {
        router.push("/EducationGroup/Educationgroupformcreation");
    }

    const submit = async (e) => {
        e.preventDefault();
        const { supabase, httpService, setProps } = props;
        const { session, error } = await supabase.auth.signIn({ email, password });
        if(error) {
            console.log(error);
            setAlert({
                type: "danger",
                message: "Oops!! Something happened"
            });
        } else {
            httpService.updateClass({
                Authorization: `Bearer ${session.access_token}`
            });    
            setProps("loggedIn", true);
            router.push("/EducationGroup/Educationgroupformcreation");
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
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="johndoe@demo.com" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"  placeholder="*******" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit" disabled={!email || !password}>Submit</Button>
                                        <NavLink style={{float: "right", color: "blue"}} href='/Auth/Signup'>Register</NavLink>
                                        {alert ? (
                                            <Alert style={{marginTop: "10px"}} color={alert.type}>{alert.message}</Alert>
                                        ) : null}
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Signin;