import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app';
import { withRouter } from "next/router";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'select2/dist/css/select2.min.css';
import React from 'react';
import "../assets/base.scss";
import { RootContext } from "../contexts/root.context";
import { RootProvider } from "../providers/root.provider";
import '../styles/CarouselDemo.css';
import "../styles/checkbox.scss";
import "../styles/coursecard.scss";
import '../styles/coursecarddetail.scss';
import '../styles/admissionprogressstages.scss'

//Enterprise structure scss

import "../styles/Entity/Datatablelistview.scss";
import "../styles/Entity/Entitycreateform.scss";
import "../styles/Entity/Entitydetailedview.scss";

// stylings
import '../styles/globals.scss';
import "../styles/Landingpage.css";
import "../styles/Register.scss";

import '../styles/site.scss';
import "../styles/Surveycreator.scss";

//HOC
import {authenticated} from "../hocs/route-guard.hoc";

function MyApp({ Component, pageProps, protectedRoute }) {
  const AuthenticatedComponent = authenticated(Component);
  return (
    <RootProvider>
      <RootContext.Consumer>
          {rootProps => {
            if(protectedRoute) {
              return <AuthenticatedComponent {...pageProps} {...rootProps}/>
            }
            return <Component {...pageProps} {...rootProps}/>
          }}
      </RootContext.Consumer>
    </RootProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const nonProtectedRoutes = [
    '/Auth/Signin',
    '/Auth/Signup'
  ];
  let protectedRoute = true;
  if(nonProtectedRoutes.includes(
    appContext.ctx.pathname
  )) {
    protectedRoute = false;
  }
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    protectedRoute
  };
};

export default withRouter(MyApp);