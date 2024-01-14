import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LikesSaveViews, PostUserInfo, LazyLoadImg, Tooltip } from ".";
import { useScreenWidth } from "../customHooks";

//

const PostInfo = ({ post }) => {
	const user = useSelector((store) => store?.userSlice?.user);
	const screenWidth = useScreenWidth();

	return (
		<div className="flex flex-col mb-2 justify-self-center py-4 border-b dark:border-b dark:border-b-lightdark mt-1 rounded-md px-3 ">
			<div className=" min-[384px]:hidden">
				<PostUserInfo post={post} />
			</div>
			<div className="flex flex-col  min-[351px]:flex-row  justify-between gap-4 mt-1">
				{/* user who created the post  */}

				<div>
					<div className="max-[384px]:hidden mb-1">
						<PostUserInfo post={post} />
					</div>
					<div className=" self-start ">
						<Link
							to={`/single-post/${post?._id}`}
							aria-label={`${post?.title}-link`}
						>
							<h3 className=" font-bold  text-sm  lg:text-lg dark:text-slate-100 ">
								{screenWidth < 1200 ? (
									post.title.length > 60 ? (
										<div className=" relative">
											<Tooltip info={post.title}>{`${post?.title?.slice(
												0,
												60
											)}...`}</Tooltip>
										</div>
									) : (
										post.title
									)
								) : post.title.length > 116 ? (
									<div className=" relative">
										<Tooltip info={post.title}>{`${post?.title?.slice(
											0,
											116
										)}...`}</Tooltip>
									</div>
								) : (
									post.title
								)}
							</h3>
						</Link>
						<div className=" hidden min-[1200px]:flex ">
							<p className="text-sm">
								{post?.description > 120
									? `${post?.description?.slice(0, 120)}...`
									: post.title}

								<Link
									to={`/single-post/${post?._id}`}
									className="ml-1 text-blue-600 dark:text-colorPrimary mt-2 hover:text-blue-500 transition-all cursor-pointer"
									aria-label={`Read more about the post titled "${post?.title}"`}
								>
									<h3>Read more</h3>
								</Link>
							</p>
						</div>
						<div className=" text-md md:text-sm ">
							<LikesSaveViews post={post} />
						</div>
					</div>
				</div>
				<Link
					to={`/single-post/${post?._id}`}
					aria-label={`${post?.title}-link`}
					className=" self-center  "
				>
					{screenWidth > 350 ? (
						<LazyLoadImg
							backgroundClassName={
								"w-[85vw] !h-[0.2rem] min-[351px]:w-[120px] lg:w-[120px] rounded-md relative border dark:border-slate-900"
							}
							imgClassName={
								"absolute inset-0 w-full h-full object-cover rounded-md"
							}
							originalImgUrl={post?.image}
							blurImageStr={post.blurImageUrl}
							optimizationStr={"q_auto,f_auto,w_400"}
							paddingBottom={"100%"}
						/>
					) : (
						<LazyLoadImg
							backgroundClassName={
								"w-[85vw] !h-[0.2rem] min-[351px]:w-[120px] lg:w-[120px] rounded-md relative border dark:border-slate-900"
							}
							imgClassName={
								"absolute inset-0 w-full h-full object-cover rounded-md"
							}
							originalImgUrl={post?.image}
							blurImageStr={post.blurImageUrl}
							optimizationStr={"q_auto,f_auto,w_400"}
							paddingBottom={"50%"}
						/>
					)}
				</Link>
			</div>
		</div>
	);
};

export default PostInfo;
