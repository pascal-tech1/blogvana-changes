import React from "react";

const Category = ({
	allCategory,
	className,
	handleSelected,
	isActive,
}) => {
	className = className || " flex justify-between gap-2 flex-wrap ";

	return (
		<div className={className}>
			{allCategory?.map((category, index) => {
				return (
					<button
						key={index}
						onClick={() => {
							handleSelected(category);
						}}
						className={`${
							isActive === category && " border dark:border-gray-700"
						} md:text-sm font-inter dark:text-slate-300 dark:bg-gray-700 bg-[#F2F2F2] whitespace-nowrap gap-2 mt-1 delay-75 cursor-pointer flex hover:dark:bg-lightdark  hover:bg-gray-300 rounded-[1rem] py-[0.15rem] px-3 }`}
					>
						{category.charAt(0).toUpperCase() +
							category.slice(1).toLowerCase()}
					</button>
				);
			})}
		</div>
	);
};

export default Category;
