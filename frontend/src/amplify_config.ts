import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-2_3Yx8jAnbM",
      userPoolClientId: "2ueg0clst0vt9qfi5nl6glkfel",
    },
  },
});