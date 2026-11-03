import { useState, type FormEvent } from "react";

interface Props {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault(); 
    if (!username.trim()) return;
    onLogin(username.trim());
  }

  return (
    <div className="center">
      <form className="box" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Log in</button>
        <p className="hint">Demo login: any username works, no password is verified.</p>
      </form>
    </div>
  );
}
