import React, {useContext} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import AuthenticationContext from "../../context/AuthenticationContext";
import Layout from "./Layout";

import FormStyles from "../styles/Form.module.scss"

import { Container } from "@mui/material";


const withAuth = Component => {
  const Auth = (props) => {
    const { user } = useContext(AuthenticationContext);
    if (!user) {
      return (
				<Layout>
          <Container sx={{mt:10}} >
            <div className={FormStyles.FormCard}>
            <h1 className={FormStyles.FormCardTitle}>Please Log In </h1>
              <div className={FormStyles.FormCardContent}>
                <div className={FormStyles.FormCardItem}>	
                  <Link href='/account/login'>
                    <button className={FormStyles.FormButton} >Login</button>
                  </Link>
                </div>              
              </div>
            </div>
          </Container>      
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