import {
  Button,
  useAuthenticator,
  CheckboxField,
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';


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



function CustomerEntry() {
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

  return (
    <div >
      <ThemeProvider theme={theme}>
        <View padding="xxl">
          <Authenticator formFields={formFields} loginMechanisms={['email']} signUpAttributes={['preferred_username']} socialProviders={['apple', 'facebook', 'google']} components={{
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
          }}>
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

export default CustomerEntry;









