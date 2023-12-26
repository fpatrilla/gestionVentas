import { useState } from "react";
import { useRouter } from "next/router";


export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/login"); 
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <div>
      <div className="login1">
        <div className="login2">
          <div className="box-left">
            <img src="./logo.png" alt="login form" width={"100%"} />
          </div>
          <div className="box-right">
            <form onSubmit={handleSubmit}>
              <div>
                <h1>Registro</h1>
              </div>
              <div>
                <label htmlFor="username">
                  <h5>Usuario:</h5>
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">
                  <h5>Contraseña:</h5>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success">
                  Registrarse
                </button>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
