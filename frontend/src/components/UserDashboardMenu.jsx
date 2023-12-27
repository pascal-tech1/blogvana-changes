import React from "react";
import { useDispatch } from "react-redux";
import {
	logOutUser,
	setChangeEmail,
	setChangePassword,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BsLock, BsMessenger } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { IoMdHelp } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import ContactMe from "./ContactMe";
import Fade from "react-reveal/Fade";

const UserDashboardMenu = ({ isMenuOpen, setIsMenuOpen }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleProfileClick = () => {
		navigate("/profile-view");
	};

	const handleUupdatePassword = () => {
		dispatch(setChangePassword());
	};

	const handleChangeEmail = () => {
		dispatch(setChangeEmail());
	};

	const handleFaqClick = () => {};

	const handleLogOut = () => {
		dispatch(logOutUser());
		navigate("/");
	};

	return (
		<>
			<div className="absolute top-8 overflow-y-hidden right-4 md:text-sm  flex-col drop-shadow-lg h-[60vh] rounded-lg z-[500] ">
				<Fade right collapse when={isMenuOpen}>
					<div className=" flex flex-col justify-start whitespace-nowrap   font-inter gap-3 pt-3 dark:bg-lightdark border px-4  dark:border-gray-700   bg-white ">
						<li
							onClick={() => {
								handleProfileClick();
								setIsMenuOpen(!isMenuOpen);
							}}
							className=" hover:bg-blue-100 dark:hover:bg-gray-800 flex gap-2 items-center py-1 px-2 rounded-lg transition-all delay-75"
						>
							<div className="flex gap-1 items-center hover:cursor-pointer">
								<CiUser />
								profile
							</div>
						</li>
						<li
							onClick={() => {
								handleUupdatePassword();
								setIsMenuOpen(!isMenuOpen);
							}}
							className=" hover:bg-blue-100  dark:hover:bg-gray-800 flex gap-2 items-center  py-1 px-2 rounded-lg transition-all delay-75"
						>
							<div className="flex gap-1 items-center hover:cursor-pointer">
								<BsLock />
								update password
							</div>
						</li>
						<li
							onClick={() => {
								handleChangeEmail();
								setIsMenuOpen(!isMenuOpen);
							}}
							className=" hover:bg-blue-100 dark:hover:bg-gray-800 flex gap-2 items-center  py-1 px-2 rounded-lg transition-all delay-75"
						>
							<div className="flex gap-1 items-center hover:cursor-pointer">
								<BsMessenger />
								change email
							</div>
						</li>
						<li
							onClick={() => {
								handleFaqClick();
								setIsMenuOpen(!isMenuOpen);
							}}
							className=" hover:bg-blue-100  dark:hover:bg-gray-800 flex gap-2 items-center  py-1 px-2 rounded-lg transition-all delay-75"
						>
							<div className="flex gap-1 items-center hover:cursor-pointer">
								<IoMdHelp />
								FAQ
							</div>
						</li>
						<li
							onClick={() => {
								handleLogOut();
								setIsMenuOpen(!isMenuOpen);
							}}
							className=" hover:bg-blue-100 dark:hover:bg-gray-800 flex gap-2 items-center text-red-400  py-1 px-2 rounded-lg transition-all delay-75"
						>
							<div className="flex gap-1 items-center hover:cursor-pointer">
								<FiLogOut />
								logout
							</div>
						</li>
						<li className=" text-xs justify-self-end">
							<div>
								<ContactMe copyrightNeeded={true} nameNeeded={true} />
							</div>
						</li>
					</div>
				</Fade>
			</div>
		</>
	);
};

export default UserDashboardMenu;
