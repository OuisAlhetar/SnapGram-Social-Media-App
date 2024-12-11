import { bottombarLinks } from "@/constants";
import { useTranslation } from "react-i18next";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <section className="flex md:hidden fixed bottom-0 z-50 w-full bg-[#FFFFFF] dark:bg-dark-2 border-t border-border">
      <div className="flex items-center justify-between w-full px-5 py-4 sm:px-10">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`bottom-bar-link ${
                isActive && "bg-primary dark:bg-primary text-light-1"
              }`}
            >
              <img
                src={link.imgURL}
                alt={t(link.label)}
                width={16}
                height={16}
                className={`${isActive && "invert"} dark:invert`}
              />
              <p className="tiny-medium">
                {t(link.label)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
