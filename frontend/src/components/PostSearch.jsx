import React, { useEffect } from "react";
import { useSearchWithDebounce } from "../customHooks/SearchWithDebounce";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	fetchAllCategorys,
	setIsTAbleOfContentClick,
} from "../redux/category/categorySlice";
import {
	fetchPostByCategory,
	setFetchFirstCategory,
} from "../redux/post/allPostSlice";
import Category from "./Category";
import DashboardCustomDropdown from "./DashboardCustomDropdown";
import { TfiMenuAlt } from "react-icons/tfi";
import Tooltip from "./Tooltip";

const PostSearch = ({ categoryNumber, isTableOfContent }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { allCategory, isTableOfContentClciked } = useSelector(
		(store) => store.categorySlice
	);

	const { activeCategory } = useSelector((store) => store.allPostSlice);

	let allCategoryArray = allCategory.map((category) => category.title);
	allCategoryArray = ["all", ...allCategoryArray];

	const displayedCategoryArray = [
		activeCategory,
		...allCategoryArray
			.filter((category) => category != activeCategory)
			.slice(0, categoryNumber || 5),
	];

	useEffect(() => {
		allCategory.length === 0 && dispatch(fetchAllCategorys());
	}, []);

	const handleSelected = (filter) => {
		dispatch(setFetchFirstCategory(filter));
		dispatch(fetchPostByCategory());
		navigate("/");
	};

	const { searchTerm, handleInputChange } = useSearchWithDebounce();

	return (
		<div className="  dark:bg-lightdark   gap-4 categorySticky ">
			<div className=" hidden md:flex gap-4 justify-center">
				<Category
					allCategory={displayedCategoryArray}
					handleSelected={handleSelected}
					isActive={activeCategory}
				/>
			</div>
			<div className="  md:hidden flex items-center justify-between gap-4 mx-3">
				{isTableOfContent && (
					<div
						onClick={() =>
							dispatch(setIsTAbleOfContentClick(!isTableOfContentClciked))
						}
						className=" py-2 px-1 hover:bg-gray-300 hover:dark:bg-dark hover:cursor-pointer  transition-colors delay-75 rounded-full"
					>
						<Tooltip info={""}>
							<TfiMenuAlt className=" text-2xl " />
						</Tooltip>
					</div>
				)}

				<div className="z-10000">
					<DashboardCustomDropdown
						allFilters={allCategoryArray}
						selectedFilter={activeCategory}
						handleSelected={handleSelected}
						left={"-left-4"}
						dropdownWidth={"w-[60vw]"}
					/>
				</div>

				<form className="relative z-50   w-[50vw]">
					<input
						className={` text-xs  px-1 font-sm rounded-lg bg-gray-100 border dark:border-gray-800 focus:border-b-gray-300 dark:bg-lightdark py-2  text-center focus:outline-none w-full  dark:focus:border-b-gray-600`}
						type="text"
						id="searchInput"
						placeholder="Search"
						value={searchTerm}
						onChange={handleInputChange}
						onClick={(e) => {
							e.preventDefault();
						}}
					/>
				</form>
			</div>
		</div>
	);
};

export default PostSearch;
