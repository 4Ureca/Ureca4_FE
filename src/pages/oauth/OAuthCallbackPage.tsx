import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Route } from "../../routes/oauth";
import { useMutationPostGoogleLoginQuery } from "../../shared/api/generated/auth";
import { setRole } from "../../shared/api/roleStore";
import { setAccessToken } from "../../shared/api/tokenStore";
import { ROUTES } from "../../shared/config/routes";

export function OAuthCallbackPage() {
  const navigate = useNavigate();
  const { code } = Route.useSearch();
  const called = useRef(false);

  const { mutate: googleLogin } = useMutationPostGoogleLoginQuery({
    mutation: {
      onSuccess: (data) => {
        if (data.accessToken) setAccessToken(data.accessToken);
        setRole(data.role);
        navigate({ to: ROUTES.EXCELLENT });
      },
      onError: () => {
        navigate({ to: ROUTES.LOGIN });
      },
    },
  });

  useEffect(() => {
    if (!code || called.current) return;
    called.current = true;

    const decodedCode = decodeURIComponent(code);
    googleLogin({
      data: {
        authorizationCode: decodedCode,
        redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI as string,
      },
    });
  }, [code, googleLogin]);

  return null;
}
