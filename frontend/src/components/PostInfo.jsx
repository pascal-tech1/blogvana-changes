import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LikesSaveViews, PostUserInfo, LazyLoadImg } from ".";

//

const PostInfo = ({ post }) => {
	const user = useSelector((store) => store?.userSlice?.user);

	return (
		<div className="flex flex-col mb-2 justify-self-center py-6 border-b dark:border-b dark:border-b-lightdark mt-1 rounded-md px-3 ">
			<div className="flex flex-col  min-[436px]:flex-row  justify-between gap-4 mt-3">
				{/* user who created the post  */}
				<div>
					<div className=" mb-2">
						<PostUserInfo post={post} />
					</div>
					<div className=" self-start">
						<Link
							to={`/single-post/${post?._id}`}
							aria-label={`${post?.title}-link`}
						>
							<h3 className=" font-bold  text-sm  lg:text-lg mb-2 dark:text-slate-100 ">
								{post?.title}
							</h3>
						</Link>
						<div className=" hidden min-[870px]:flex ">
							<p className="text-sm">
								{post?.description?.slice(0, 120)}

								<Link
									to={`/single-post/${post?._id}`}
									className="ml-1 text-blue-600 dark:text-colorPrimary hover:text-blue-500 transition-all cursor-pointer"
									aria-label={`Read more about the post titled "${post?.title}"`}
								>
									Read more
								</Link>
							</p>
						</div>
						<div className="text-md md:text-sm mt-1 ">
							<LikesSaveViews post={post} />
						</div>
					</div>
				</div>
				<Link
					to={`/single-post/${post?._id}`}
					aria-label={`${post?.title}-link`}
					className=" self-center  "
				>
					{/* lazyloadingImg */}
					<LazyLoadImg
						backgroundClassName={
							"w-[80vw] min-[436px]:w-[120px] lg:w-[160px] rounded-md relative border dark:border-slate-900"
						}
						imgClassName={
							"absolute inset-0 w-full h-full object-cover rounded-md"
						}
						originalImgUrl={post?.image}
						blurImageStr={post.blurImageUrl}
						optimizationStr={"q_auto,f_auto,w_400"}
						paddingBottom={"100%"}
					/>
				</Link>
			</div>
		</div>
	);
};

export default PostInfo;
