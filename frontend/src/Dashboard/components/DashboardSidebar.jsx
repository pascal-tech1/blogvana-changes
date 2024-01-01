// DashboardSideBar.js
import { FaUser, FaUsers } from "react-icons/fa";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";

import {
	BiBookContent,
	BiHistory,
	BiInfoCircle,
	BiMessage,
} from "react-icons/bi";
import { CiSaveDown1, CiSettings } from "react-icons/ci";
import { RiBookReadLine, RiUserFollowFill } from "react-icons/ri";
import {
	MdAdminPanelSettings,
	MdCategory,
	MdOutlineArrowDropDown,
	MdOutlineCreate,
} from "react-icons/md";
import { GiShadowFollower } from "react-icons/gi";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import { LazyLoadImg } from "../../components";

const Entry = React.memo(({ entry, depth, path }) => {
	const location = useLocation();
	const page = location.pathname.substring(
		location.pathname.lastIndexOf("/") + 1
	);
	const [isExpanded, setIsExpanded] = useState(false);
	// Construct the path for the current entry
	const currentPath = path
		? `${path}-${entry?.title?.replace(/ /g, "-")}`
		: entry?.title;
	const to = entry?.children ? null : currentPath;
	const Icon = entry?.icon;

	return (
		<div className=" w-[7rem] my-1">
			<NavLink
				to={to}
				className={`${
					page === currentPath && "text-blue-500"
				} flex gap-1 items-center hover:bg-gray-300 rounded-lg  hover:dark:bg-gray-700 px-2 py-1  `}
				onClick={(e) => {
					entry?.children && setIsExpanded((prev) => !prev);
				}}
			>
				{entry.icon && <Icon />}
				<h1>{entry?.title}</h1>
				{entry?.children &&
					(isExpanded ? (
						<MdOutlineArrowDropDown className=" text-center" />
					) : (
						<IoMdArrowDropright className=" text-center" />
					))}
			</NavLink>
			<div className=" px-4">
				<div className={`border-l-[0.7px] dark:border-l-gray-800`}>
					<div className="ml-2">
						{isExpanded &&
							entry?.children?.map((childEntry) => (
								<Entry
									key={childEntry.title} // Make sure to use a unique key
									entry={childEntry}
									depth={depth + 1}
									path={currentPath} // Pass the current path to children
									isExpanded={isExpanded}
									setIsExpanded={setIsExpanded}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
});

const DashboardSideBar = () => {
	const { user } = useSelector((store) => store.userSlice);
	const sideBarItems = {
		children: [
			{
				title: "Stats",
				icon: LuLayoutDashboard,
			},
			{
				title: "Profile",
				icon: FaUser,

				children: [
					{
						title: "details",
						icon: BiInfoCircle,
					},
					{
						title: "message",
						icon: BiMessage,
					},
					{
						title: "views",
						icon: BsEye,
					},
				],
			},
			{
				title: "Post",
				icon: BiBookContent,

				children: [
					{
						title: "my posts",
						icon: CiSettings,
					},
					{
						title: "create",
						icon: MdOutlineCreate,
					},
					{
						title: "history",
						icon: BiHistory,
					},
					{
						title: "saved",
						icon: CiSaveDown1,
					},
				],
			},
			{
				title: "Follows",
				icon: GiShadowFollower,
				children: [
					{
						title: "followers",
						icon: FaUsers,
					},
					{
						title: "following",
						icon: RiUserFollowFill,
					},
				],
			},
		],
	};

	const AdminObject = {
		title: "Admin",
		icon: MdAdminPanelSettings,

		children: [
			{
				title: "all users",
				icon: FaUsersGear,
			},

			{
				title: "category",
				icon: MdCategory,
			},
			{
				title: "all posts",
				icon: RiBookReadLine,
			},
		],
	};

	user?.isAdmin && sideBarItems.children.push(AdminObject);

	return (
		<div className="px-8 mt-4 overflow-y-auto overflow-x-hidden h-[83vh] md:h-[90vh]  custom-scrollbar">
			<Link
				to={"/"}
				className="  flex items-center justify-center w-[100%] bg-gray-50 dark:bg-lightdark rounded-md"
			>
				<div className="">
					<LazyLoadImg
						backgroundClassName={"h-20 w-20 relative  "}
						imgClassName={"absolute inset-0 w-full h-full  object-cover"}
						originalImgUrl={
							"https://res.cloudinary.com/da3q9dbku/image/upload/v1704106557/mern-blog-app/pascalazubike003%40gmail.com/profilePhoto/zn9kxlenc3ttw6mpxrrg.png"
						}
						blurImageStr={
							"https://res.cloudinary.com/da3q9dbku/image/upload/q_auto,f_auto,w_10/v1704106557/mern-blog-app/pascalazubike003%40gmail.com/profilePhoto/zn9kxlenc3ttw6mpxrrg.png"
						}
						optimizationStr={"w_800"}
						paddingBottom={"100%"}
					/>
				</div>
			</Link>

			<div className=" mt-4 md:grid place-content-center">
				{sideBarItems.children.map((entry) => (
					<Entry key={entry.title} entry={entry} depth={1} path="" />
				))}
			</div>
		</div>
	);
};

export default DashboardSideBar;
