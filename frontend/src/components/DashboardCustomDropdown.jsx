import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useClickOutside } from "../customHooks";
import Fade from "react-reveal/Fade";

const DashboardCustomDropdown = ({
	allFilters,
	selectedFilter,
	dropdownWidth,
	left,
	handleSelected,
	setSelectedFilter,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	// using custom hook to close the open UserDashboardMenu
	const divRef = useRef();
	const iconRef = useRef();
	const isOutsideClicked = useClickOutside(divRef, iconRef);

	useEffect(() => {
		isOpen && !isOutsideClicked && setIsOpen(false);
	}, [isOutsideClicked]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelectedFilter = (filter) => {
		dispatch(setSelectedFilter(filter));
	};

	handleSelected = handleSelected ? handleSelected : handleSelectedFilter;

	return (
		<div className="relative z-[50] flex flex-col font-inter ">
			<button
				ref={iconRef}
				type="button"
				onClick={toggleDropdown}
				className="bg-white dark:bg-lightdark text-sm  dark:text-slate-200 border dark:border-gray-700 justify-center py-[0.3rem] md:text-sm outline-none focus:border-gray-400 capitalize whitespace-nowrap  px-2 flex font-inter  items-center rounded-lg text-gray-700 focus:outline-none "
			>
				{selectedFilter}
				{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
			</button>

			<ul
				ref={divRef}
				className={`${left ? left : "-left-12"} ${
					dropdownWidth ? dropdownWidth : " w-[80vw]"
				} ${
					isOpen &&
					"rounded border border-gray-300 dark:border-gray-700 overflow-y-auto custom-scrollbar bg-white dark:bg-lightdark shadow-lg"
				} absolute flex top-10 self-center md:text-sm  flex-wrap max-h-[50vh] z-50  justify-evenly   items-center  `}
			>
				{allFilters.map((filter, index) => (
					<Fade top opposite collapse when={isOpen}>
						<li
							key={index}
							type="button"
							className={`${
								selectedFilter === filter && " border-b border-b-blue-600"
							} bg-gray-100 dark:bg-lightdark hover:bg-gray-200 dark:hover:bg-gray-800 transition-all delay-75 rounded-md md:text-sm px-2 py-[0.12rem] my-1 `}
							onClick={() => {
								handleSelected(filter);
								setIsOpen(false);
							}}
						>
							{filter.charAt(0).toUpperCase() +
								filter.slice(1).toLowerCase()}
						</li>
					</Fade>
				))}
			</ul>
		</div>
	);
};

export default DashboardCustomDropdown;
