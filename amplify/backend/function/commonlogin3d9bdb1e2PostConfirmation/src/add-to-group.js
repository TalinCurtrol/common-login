const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  const groupParams = {
    GroupName: event.request.userAttributes['custom:account_type'],
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: event.request.userAttributes['custom:account_type'],
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));

  return event;
};
