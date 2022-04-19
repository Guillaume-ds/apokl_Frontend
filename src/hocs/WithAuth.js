import React, {useContext} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import AuthenticationContext from "../../context/AuthenticationContext";
import Layout from "./Layout";

import FormStyles from "../styles/Form.module.scss"

import { Grid } from "@mui/material";


const withAuth = Component => {
  const Auth = (props) => {
    const { user } = useContext(AuthenticationContext);
    if (!user) {
      return (
				<Layout>
          <Grid container direction="row" justifyContent="center" sx={{height:'70vh', pt:10}}>
            <div className={FormStyles.formCard}>
            <h1 className={FormStyles.formCardTitle}>Please Log In </h1>
              <div className={FormStyles.formCardContent}>
                <div className={FormStyles.formCardItem}>	
                  <Link href='/account/login'>
                    <button className={FormStyles.formButton} >Login</button>
                  </Link>
                </div>              
              </div>
            </div>
          </Grid>      
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

export default withAuth;