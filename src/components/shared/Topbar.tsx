import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { user } = useUserContext();

	React.useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<section className="topbar bg-white">
			<div className="flex-between py-4 px-5">
				<Link to={"/"} className="flex gap-3 items-center">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={130}
						height={325}
					/>
				</Link>

				<div className="flex items-center gap-4">
					<div className="block md:hidden">
						<LanguageSwitcher />
					</div>
					<div className="flex gap-4">
						<ThemeToggle />
						<Button
							variant={"ghost"}
							className="shad-button_ghost hover:text-purple-600"
							onClick={() => signOut()}
						>
							<img src="/assets/icons/logout.svg" alt={t('auth.logout')} className="group-hover:invert-[0.4]" />
						</Button>
						<Link to={`/profile/${user.id}`} className="flex-center gap-3 hover:text-purple-600">
							<img
								src={user.imageUrl || "/assets/icons/profile-placeholder.png"}
								alt="profile"
								className="h-8 w-8 rounded-full"
							/>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Topbar;
