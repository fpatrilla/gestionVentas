import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = !!Cookies.get("token"); // Verifica si existe una cookie de autenticación

    if (!isLoggedIn) {
      router.push("/login"); // Redirige al usuario a la página de inicio de sesión si no está autenticado
    }
  }, []);

  // Devuelve el estado de autenticación
  return {
    isLoggedIn: !!Cookies.get("token"),
  };
};
