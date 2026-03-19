import { useId, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutationPostLoginQuery } from "../../shared/api/generated/auth";
import { setRole } from "../../shared/api/roleStore";
import { setAccessToken } from "../../shared/api/tokenStore";
import { ROUTES } from "../../shared/config/routes";
import { Button } from "../../shared/ui/Button/Button";
import { EyeIcon, EyeOffIcon, GoogleIcon, UPlusLogoIcon } from "../../shared/ui/icons";
import { Input } from "../../shared/ui/Input/Input";
import * as s from "./LoginPage.css";

export function LoginPage() {
  const loginIdInputId = useId();
  const passwordInputId = useId();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutationPostLoginQuery({
    mutation: {
      onSuccess: (data) => {
        if (data.accessToken) setAccessToken(data.accessToken);
        setRole(data.role);
        navigate({ to: ROUTES.EXCELLENT });
      },
      onError: () => {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginId.trim()) return setError("아이디를 입력해주세요.");
    if (!password.trim()) return setError("비밀번호를 입력해주세요.");
    login({ data: { loginId, password } });
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.card}>
        <div className={s.logoSection}>
          <UPlusLogoIcon height={44} />
          <p className={s.serviceTitle}>고객 상담 기록 관리 시스템</p>
        </div>

        <div className={s.divider} />

        <form className={s.form} onSubmit={handleSubmit} noValidate>
          {error && <div className={s.globalErrorBox}>{error}</div>}

          <Input
            id={loginIdInputId}
            label="아이디"
            type="text"
            placeholder="아이디를 입력하세요"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            autoComplete="username"
            disabled={isPending}
          />

          <Input
            id={passwordInputId}
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isPending}
            rightSlot={
              <Button
                variant="icon"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            }
          />

          <Button variant="primary" type="submit" fullWidth disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>

          <div className={s.orDivider}>
            <span className={s.orDividerText}>또는</span>
          </div>

          <Button
            variant="secondary"
            type="button"
            fullWidth
            onClick={() => {
              window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
            }}
          >
            <GoogleIcon />
            Google로 로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
