import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import {
	ClearSearch,
	PostInfo,
	PostInfoLoadingSkeleton,
	Spinner,
} from "../components";
import {
	IncreasePageNumber,
	fetchPostByCategory,
	setEmptySearch,
} from "../redux/post/allPostSlice";
import { getUserFromLocalStorage } from "../utils/localStorage";

const AllPost = () => {
	const dispatch = useDispatch();
	const { allPost, allPostStatus, searchQuery, hasMore } = useSelector(
		(store) => store.allPostSlice
	);
	const token = getUserFromLocalStorage();
	const loadingSkeletonNumber = 10;

	const { user } = useSelector((store) => store.userSlice);

	useEffect(() => {
		if (token && !user) return;
		if (allPost.length === 0) {
			searchQuery.length === 0 && dispatch(fetchPostByCategory());
		}
	}, [token, user]);

	const observer = useRef();
	const lastPostRef = useCallback(
		(node) => {
			if (allPostStatus === "failed") return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					dispatch(IncreasePageNumber());
					dispatch(fetchPostByCategory());
				}
			});
			if (node) observer.current.observe(node);
		},
		[hasMore, allPostStatus]
	);
	const handleClearSearch = () => {
		dispatch(setEmptySearch());
		dispatch(fetchPostByCategory());
	};

	const handleFetchingPostFailed = (e) => {
		e.preventDefault();
		searchQuery.length === 0 && dispatch(fetchPostByCategory());
	};

	return (
		<>
			<ClearSearch
				searchQuery={searchQuery}
				handleClearSearch={handleClearSearch}
			/>

			{/* loading Spinner */}
			<div className="grid place-content-center">
				{Array.from({ length: loadingSkeletonNumber }).map((_, index) => (
					<PostInfoLoadingSkeleton key={index} />
				))}
			</div>
			<div className=" grid place-content-center">
				{allPostStatus === "failed" && (
					<div className=" ">
						<h3 className=" text-red-500 -ml-10">fetching post failed</h3>
						<button
							onClick={handleFetchingPostFailed}
							className=" bg-blue-400 text-white px-1 rounded-md"
						>
							refresh
						</button>
					</div>
				)}
			</div>
			<div>
				{allPost.length === 0 &&
					searchQuery &&
					allPostStatus !== "loading" && (
						<div className=" text-yellow-300">No Post found</div>
					)}
			</div>
			<div>
				{!hasMore &&
					searchQuery &&
					allPostStatus !== "loading" &&
					allPost.length > 0 && (
						<h3 className=" text-yellow-300">No more Post</h3>
					)}
			</div>
			<div>
				{!hasMore && !searchQuery && allPostStatus !== "loading" && (
					<h3 className=" text-yellow-300">No more Post</h3>
				)}
			</div>
		</>
	);
};

export default AllPost;
