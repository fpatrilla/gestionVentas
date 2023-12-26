import Link from "next/link";
import { useRequireAuth } from "../lib/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Nav() {
  const { isLoggedIn } = useRequireAuth();
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState("./logoTech.png");
  const [logoSrc, setLogoSrc] = useState("./LogoNavBar.png"); // Estado para la fuente de la imagen
  // Estado para la fuente de la imagen

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar la ruta de la imagen agregando un valor incremental al final
      setImageSrc(`/logoTech.png?v=${Date.now()}`);
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      // Cambiar la ruta del logo agregando un valor incremental al final
      setLogoSrc(`/LogoNavBar.png?v=${Date.now()}`);
    }, 180000);

    return () => clearInterval(interval1);
  }, []);

  const username = Cookies.get("username");

  // Handle conditional rendering based on isLoggedIn
  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div>
      <div className="up">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{ marginLeft: "auto", color: "white", marginRight: "5%" }}
          >
            Bienvenido {username} !
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ padding: "3px 3px", fontSize: "14px" }}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      <nav id="sidebar" style={{ backgroundColor: "343a40" }}>
        <span style={{ marginTop: "-10px" }}>
          <img
            src={imageSrc} // Utilizar el estado imageSrc para la fuente de la imagen
            alt="login form"
            width={180}
            height={180}
            style={{ marginTop: "-22px" }}
          />
        </span>

        <ul
          className="list-unstyled components"
          style={{
            marginLeft: "10px",
            position: "relative",
            marginTop: "-25px",
          }}
        >
          <li className="linkNav">
            <Link className="linkNav" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/nuevo">
              Nuevo
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/ordenes">
              Ordenes
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/ventas">
              Ventas
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/clients">
              Clientes
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/articles">
              Articulos
            </Link>
          </li>
          <li>
            <Link className="linkNav" href="/varios">
              Varios
            </Link>
          </li>

          <li>
            <Link className="linkNav" href="/administracion">
              Administracion
            </Link>
          </li>
          <li style={{ height: "2%" }}></li>
          <li>
            <span style={{ marginLeft: "25%" }}>
              <img src={logoSrc} alt="login form" width={60} />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
