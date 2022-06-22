import React, {useContext} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import AuthenticationContext from "../../context/AuthenticationContext";
import Layout from "./Layout";

import LoginComponent from "../components/Account/login";

import FormStyles from "../styles/Form.module.scss"

import { Grid } from "@mui/material";


const WithAuth = Component => {
  const Auth = (props) => {
    const { user, userLoaded } = useContext(AuthenticationContext);
    if(!userLoaded){
      return(
        <Layout>

        </Layout>
      )
    }
    if (userLoaded && !user) {
      return (
				<Layout>
          <LoginComponent  />
				</Layout>
      );
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default WithAuth;