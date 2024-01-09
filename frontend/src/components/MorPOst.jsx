import React from "react";

import { Link } from "react-router-dom";

import {
	Spinner,
	Tooltip,
	LazyLoadImg,
	LikesSaveViews,
	PostUserInfo,
} from "../components";

const MorePost = ({ post, status }) => {
	return (
		<>
			{post?.map((post, index) => (
				<div
					key={index}
					className="   dark:text-slate-300  dark:bg-lightdark bg-gray-100 rounded-lg
					"
				>
					<Link
						to={`/single-post/${post?._id}`}
						className=" hover:cursor-pointer"
						aria-label={`${post?.title}-link`}
					>
						<LazyLoadImg
							backgroundClassName={" w-full rounded-t-md  relative "}
							imgClassName={
								"absolute inset-0 w-full h-full object-cover rounded-t-md"
							}
							originalImgUrl={post?.image}
							blurImageStr={post?.blurImageUrl}
							optimizationStr={`q_auto,f_auto,w_800`}
							paddingBottom={"50%"}
						/>
					</Link>

					<div className=" px-2 pb-2">
						<div className=" dark:text-slate-300 mt-1 mb-2">
							<Tooltip relative={true} info={post?.title}>
								<h3>
									{post.title.length > 70
										? `${post.title.slice(0, 70)}...`
										: post.title}
								</h3>
							</Tooltip>
						</div>

						<PostUserInfo post={post} />
						<LikesSaveViews post={post} />
					</div>
				</div>
			))}
			<div className=" grid place-content-center">
				{status === "loading" && <Spinner />}
			</div>
		</>
	);
};

export default MorePost;
