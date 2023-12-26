import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      Cookies.set("token", "valor_del_token");
      Cookies.set("username", username); // Guarda el nombre de usuario en una cookie
      router.push("/");
    } else {
      const data = await response.json();
      setErrorMessage("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  if (loggedIn) {
    return <div className="welcome">{welcomeMessage}</div>;
  }

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
                <h1>Iniciar sesión</h1>
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
                  Iniciar sesión
                </button>
              </div>
              <div>
                {errorMessage && <div className="error">{errorMessage}</div>}
              </div>
            </form>
            <hr />
            <div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    marginRight: "5%",
                    color: "#6478db",
                    fontWeight: "bold",
                  }}
                >
                  ¿No tienes una cuenta?
                </span>
                <span style={{ marginRight: "5%", fontWeight: "bold" }}>
                  {" "}
                  <Link href="/register">Registro</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
