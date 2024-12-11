import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUserContext();

  React.useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar" aria-label={t('navigation.sidebar')}>
      <div className="flex flex-col gap-11">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              width={170}
              height={36}
            />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
              <img
                src={user.imageUrl || "/assets/images/profile-placeholder.png"}
                alt={t('profile.profileImage')}
                className="h-14 w-14 rounded-full"
              />
              <div className="flex flex-col">
                <p className="body-bold text-dark-1 dark:text-light-1">{user.name}</p>
                <p className="small-regular text-dark-3 dark:text-light-3">@{user.username}</p>
              </div>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary dark:bg-primary"
                }`}
              >
                <NavLink
                  to={link.route}
                  className={`flex gap-4 items-center p-4 ${
                    isActive 
                      ? "text-light-1" 
                      : "text-dark-1 dark:text-light-1"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <img
                    src={link.imgURL}
                    alt={t(link.label)}
                    className={`group-hover:invert-[0.4] dark:group-hover:invert-[0.7] ${
                      isActive && "invert"
                    }`}
                  />
                  {t(link.label)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto border-t border-border">
        <Button
          variant="ghost"
          className="shad-button_ghost flex gap-4 items-center p-4 w-full text-dark-1 dark:text-light-1 hover:bg-[#fdf2f8] dark:hover:bg-dark-4 hover:text-primary"
          onClick={() => signOut()}
          aria-label={t('auth.logout')}
        >
          <img 
            src="/assets/icons/logout.svg" 
            alt={t('auth.logout')} 
            className="group-hover:invert-[0.4] dark:invert"
          />
          <p className="small-medium lg:base-medium">
            {t('auth.logout')}
          </p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
