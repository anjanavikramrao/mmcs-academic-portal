import { useRouter } from 'next/router'
import React from "react";
import Layout from "../components/Layout/Layout";
export const authenticated = (WrappedComponent) => { 
  const hoc = props => {
    const [hocReady, setHocReady] = React.useState(false);
    const loggedIn = props.getProp("loggedIn");
    const router = useRouter();

    React.useEffect(() => {
      if(router) {
        setHocReady(true);
      }
    }, []);

    const LoggedInComponent = () => {
      return (
        <Layout {...props}>
          <WrappedComponent {...props} />
        </Layout>
      );
    };

    const NonLoggedInComponent = () => {
      router.push('/Auth/Signin');
      return <></>;
    };

    if(!hocReady) {
      return null;
    }

    return (
      <React.Fragment>
        {loggedIn ? <LoggedInComponent /> : <NonLoggedInComponent />}
      </React.Fragment>
    );
  }
  return hoc;
}
