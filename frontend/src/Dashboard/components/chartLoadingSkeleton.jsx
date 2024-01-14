import React from "react";

const ChartLoadingSkeleton = () => {
	return (
		<div
			role="status"
			className="p-4  rounded shadow animate-pulse md:p-6"
		>
			<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
			<div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			<div className="flex items-baseline mt-4">
				<div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
				<div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
				<div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-60 ms-6 dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-[10rem] ms-6 dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-[15rem] ms-6 dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-[12rem] ms-6 dark:bg-gray-700"></div>
				<div className="w-full bg-gray-200 rounded-t-lg h-[16rem] ms-6 dark:bg-gray-700"></div>
			</div>
			<span class="sr-only">Loading...</span>
		</div>
	);
};

export default ChartLoadingSkeleton;
