import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import Todos from "./Todos";

function Main({ signOut }: { signOut?: () => void }) {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        const session = await fetchAuthSession();
        const claims = session.tokens?.idToken?.payload;
        setUsername(
          (claims?.name as string) ||
            (claims?.email as string) ||
            user.username
        );
      } catch {
        // keep default
      }
    })();
  }, []);

  return <Todos username={username} onLogout={() => signOut?.()} />;
}

export default function App() {
  return (
    <Authenticator signUpAttributes={["name"]} loginMechanisms={["email"]}>
      {({ signOut }) => <Main signOut={signOut} />}
    </Authenticator>
  );
}