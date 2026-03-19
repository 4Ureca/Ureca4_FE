import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useGetMyInfoQuery, useMutationPostLogoutQuery } from "../../shared/api/generated/auth";
import { clearRole } from "../../shared/api/roleStore";
import { clearAllStorage } from "../../shared/api/tokenStore";
import { ROUTES } from "../../shared/config/routes";
import { LogoutIcon, UserIcon } from "../../shared/ui/icons";
import * as s from "./UserDropdown.css";

export function UserDropdown() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data } = useGetMyInfoQuery();

  const { mutate: logout } = useMutationPostLogoutQuery({
    mutation: {
      onSuccess: () => {
        clearAllStorage();
        clearRole();
        queryClient.clear();
        navigate({ to: ROUTES.LOGIN });
      },
    },
  });

  const avatarChar = data?.name?.[0] ?? "?";

  return (
    <div className={s.wrapper}>
      <button
        type="button"
        className={s.avatar}
        onClick={() => setOpen((v) => !v)}
        aria-label="사용자 메뉴 열기"
      >
        {avatarChar}
      </button>

      {open && (
        <>
          <button
            type="button"
            className={s.backdrop}
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
          />
          <div className={s.panel}>
            <div className={s.header}>
              <div className={s.headerAvatar}>{avatarChar}</div>
              <div>
                <p className={s.name}>{data?.name ?? "—"}</p>
                <p className={s.role}>{data?.roleName ?? "—"}</p>
              </div>
            </div>

            <div className={s.menu}>
              <button
                type="button"
                className={s.menuItem}
                onClick={() => { navigate({ to: ROUTES.MYPAGE }); setOpen(false); }}
              >
                <UserIcon />
                마이페이지
              </button>
              <button
                type="button"
                className={`${s.menuItem} ${s.menuItemDanger}`}
                onClick={() => logout()}
              >
                <LogoutIcon />
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
