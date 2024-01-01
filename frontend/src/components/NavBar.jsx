import React, { useEffect, useRef, useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
	MdOutlineArrowDropDown,
	MdOutlineArrowDropUp,
} from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { logOutUser } from "../redux/user/userSlice.js";

import { useSelector, useDispatch } from "react-redux";

import LazyLoadImg from "./LazyLoadImg.jsx";
import { FiLogOut, FiUser } from "react-icons/fi";

import { LuLogIn, LuLogOut } from "react-icons/lu";
import useClickOutside from "../customHooks/useClickOutside.js";

import { ContactMe, Theme } from "../components";

import { useSearchWithDebounce } from "../customHooks/SearchWithDebounce.js";

const NavBar = () => {
	const user = useSelector((store) => store?.userSlice.user);
	const [showLogOut, setShowLogOut] = useState(false);

	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(logOutUser("user"));
	};

	const { searchTerm, handleInputChange } = useSearchWithDebounce();

	// using custom hook to close the open UserDashboardMenu
	const divRef = useRef();
	const iconRef = useRef();
	const isOutsideClicked = useClickOutside(divRef, iconRef);

	useEffect(() => {
		showLogOut && !isOutsideClicked && setShowLogOut(false);
	}, [isOutsideClicked]);

	return (
		<div className=" max-[318px]:flex-wrap flex w-full font-inter  items-center justify-between border-b nav-bar py-2 md:py-[0.2rem]  dark:border-b-slate-800 gap-4 dark:bg-lightdark px-4 md:px-8 dark:text-slate-200">
			<Link to="/" className="">
				<img
					src="/blogvana.png"
					alt="Blog post icon: A dynamic symbol representing insightful content, diverse perspectives, and engaging storytelling"
					className="w-[2.5rem] border hidden md:flex border-blue-400"
				/>
				<h1 className=" md:hidden text-blue-500 text-2xl font-bold">Blogvana</h1>
			</Link>

			<form className="relative md:w-1/3 justify-center z-50  items-center">
				<input
					className={` hidden md:flex text-xs  font-sm dark:bg-dark px-1 md:py-2 border border-gray-100 dark:border-gray-800 focus:border-b-gray-300 dark:border-b-gray-600   rounded-full bg-gray-100 text-center focus:outline-none  w-full bg-transparent `}
					type="text"
					id="searchPost"
					placeholder="Search"
					value={searchTerm}
					onChange={handleInputChange}
				/>
			</form>

			{/* theme  */}
			<div className="">
				<Theme />
			</div>
			<div className={``}>
				{/* user */}
				{user ? (
					<div className=" flex gap-3 md:gap-4 place-items-center">
						<button
							ref={iconRef}
							onClick={() => setShowLogOut(!showLogOut)}
							className="flex items-center"
						>
							<div className=" flex items-center">
								{/* lazyloading */}
								<div>
									<LazyLoadImg
										backgroundClassName={
											" rounded-full w-8 h-8  relative border border-blue-400  "
										}
										imgClassName={
											"absolute inset-0 w-full h-full  object-cover rounded-full "
										}
										originalImgUrl={user?.profilePhoto}
										blurImageStr={user?.blurProfilePhoto}
										optimizationStr={"q_auto,f_auto,w_100"}
										paddingBottom={"100%"}
									/>
								</div>
								{showLogOut ? (
									<MdOutlineArrowDropDown className="text-colorPrimary transition-all" />
								) : (
									<MdOutlineArrowDropUp className="text-colorPrimary transition-all " />
								)}
							</div>
						</button>

						<div
							ref={divRef}
							className={`${
								showLogOut ? " " : " hidden "
							} flex flex-col items-center pt-4 pb-1 absolute drop-shadow-lg text-lg md:text-base h-[40vh] gap-4  justify-between  top-12 z-50 right-[0.5rem] md:right-20 border dark:border-slate-700 bg-slate-50 rounded-md px-3  transition-all dark:bg-lightdark `}
						>
							<div className="flex flex-col gap-3">
								<Link
									to="/stats"
									className="bg-blue-500 flex gap-2 items-center  px-1 rounded-md  text-slate-100 hover:shadow-md transition-all hover:bg-blue-600"
								>
									<FiUser />
									Profile
								</Link>
								<button
									onClick={handleLogOut}
									className="bg-red-500 flex gap-2 items-center px-1 rounded-md text-white hover:shadow-md transition-all hover:bg-red-600"
								>
									<FiLogOut className="" />
									Log Out
								</button>
							</div>
							<div className=" text-sm">
								<ContactMe copyrightNeeded={true} nameNeeded={true} />
							</div>
						</div>
						<Link
							to="/post-Create"
							className="  text-xs md:text-sm flex hover:border-gray-300 dark:hover:bg-gray-700 place-items-center gap-[0.3rem] border border-blue-200 px-1 py-1 md:px-2 rounded-md hover:bg-gray-100 transition-all"
						>
							<BsPencilSquare className=" text-2xl text-blue-400" />
							<h3 className=" hidden md:flex text-blue-400">write</h3>
						</Link>
					</div>
				) : (
					<div className="flex gap-4 items-center">
						<Link
							to="/login"
							id="login"
							className=" flex gap-2 items-center text-blue-500 hover:text-white  py-[0.2rem] px-2 rounded-lg   hover:bg-blue-600 transition-all"
						>
							<LuLogIn className="  text-2xl md:text-xl md:flex" />
							<h1 className=" hidden md:flex">login</h1>
						</Link>
						<Link
							to="/register"
							id="logOut"
							className=" flex gap-2 items-center   py-[0.2rem] px-2 rounded-lg hover:text-white text-red-500 hover:bg-red-500 transition-all"
						>
							<LuLogOut className="text-2xl md:text-xl md:flex " />
							<h1 className=" hidden md:flex">Register</h1>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavBar;
