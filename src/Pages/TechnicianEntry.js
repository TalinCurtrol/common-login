
import {
  Button,
  useAuthenticator,
  CheckboxField,
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  View
} from "@aws-amplify/ui-react";
import { signUp } from '@aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import ReCAPTCHA from "react-google-recaptcha";






function onChange(value) {
  console.log("Captcha value:", value);
}


function TechnicianEntry() {
  const { tokens } = useTheme();
  const theme = {
    name: 'Auth Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
          },
        },
        button: {
          primary: {
            backgroundColor: tokens.colors.pink['40'],
          },
          link: {
            color: tokens.colors.pink['80'],
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 2px ${tokens.colors.pink['40']}`,
          },
        },
        tabs: {
          item: {
            color: tokens.colors.pink['40'],
            _active: {
              borderColor: tokens.colors.pink['80'],
              color: tokens.colors.pink['80'],
            },
          },
        },
      },
    },
  };

  const formFields = {
    signUp: {
      email: {
        order: 1
      },
      preferred_username: {
        order: 2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      }
    },
  }

  const services = {
    async handleSignUp(formData) {
      console.log("formData=" + JSON.stringify(formData))
      console.log()
      return signUp({
        username: formData.username,
        password: formData.password,
        options: {
          autoSignIn: true,
          userAttributes: {
            email: formData.options.userAttributes.email,
            preferred_username: formData.options.userAttributes.preferred_username,
            'custom:account_type': 'Technician',
          }

        },
        autoSignIn: {
          enabled: true,
        },
      });
    },
    async validateCustomSignUp(formData) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms and Conditions',
        };
      }
    },

  }

  return (
    <div >

      <ThemeProvider theme={theme}>
        <View padding="xxl">

          <ReCAPTCHA
            sitekey="6LdycLopAAAAAK98JD8igrnEL5gNEG2X_N3kRooG"
            onChange={onChange}
          />
          <h2>Technician:</h2>
          <Authenticator
            formFields={formFields}
            loginMechanisms={['email']}
            components={{
              SignUp: {
                FormFields() {
                  const { validationErrors } = useAuthenticator();

                  return (
                    <>
                      {/* Re-use default `Authenticator.SignUp.FormFields` */}
                      <Authenticator.SignUp.FormFields />

                      {/* Append & require Terms and Conditions field to sign up  */}
                      <CheckboxField
                        errorMessage={validationErrors.acknowledgement}
                        hasError={!!validationErrors.acknowledgement}
                        name="acknowledgement"
                        value="yes"
                        label="I agree with the Terms and Conditions"
                      />
                    </>
                  );
                },
              },
            }}
            services={services}>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user.username},</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}
          </Authenticator>
        </View >
      </ThemeProvider >
    </div>
  );
}

export default TechnicianEntry;