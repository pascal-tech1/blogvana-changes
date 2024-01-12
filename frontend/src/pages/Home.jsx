import React, { useEffect, useState } from "react";
import {
	Category,
	ContactMe,
	PostSearch,
	PostUserInfo,
	TrendingPost,
	UserToFollow,
} from "../components";
import AllPost from "./AllPost";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomUser } from "../redux/user/userSlice";

import {
	fetchPostByCategory,
	setFetchFirstCategory,
} from "../redux/post/allPostSlice";

import { useNavigate } from "react-router-dom";
import { MdCategory, MdExpandMore } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { toast } from "react-toastify";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { allPost, allPostStatus, searchQuery, hasMore } = useSelector(
		(store) => store.allPostSlice
	);
	const { allCategory } = useSelector((store) => store.categorySlice);
	const { randomUsers } = useSelector((store) => store.userSlice);

	let allCategoryArray = allCategory.map((category) => category.title);
	allCategoryArray = ["all", ...allCategoryArray];

	const [numberOfDisplayCategory, setNumberOfDisplayCategory] =
		useState(10);

	useEffect(() => {
		dispatch(fetchRandomUser(4));
	}, []);

	const handleSelected = (filter) => {
		dispatch(setFetchFirstCategory(filter));
		dispatch(fetchPostByCategory());
		navigate("/");
	};
	const handleAddMoreCategoryToDisplay = () => {
		setNumberOfDisplayCategory((prev) => prev + 10);
	};
	const speakText = (text) => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(text);
		synth.speak(utterance);
	};

	return (
		<div className={`font-inter text-lg lg:text-base `}>
			<div className=" md:grid grid-cols-5 gap-10 ">
				{/* right section */}
				<main className=" col-span-3  ">
					<div className="">
						<PostSearch />

						<AllPost />
					</div>
				</main>
				{/* left section */}

				<div className="hidden py-4 md:flex flex-col font-inter justify-between col-start-4 col-span-full px-6  stickyRight custom-scrollbar border-l dark:bg-dark  dark:border-l-lightdark  !h-[88vh] ">
					<div className=" flex flex-col gap-4 ">
						<section>
							<div className=" dark:text-slate-200 mb-2 md:text-sm min-[800px]:text-base flex gap-3 items-center">
								<h1 className="border font-semibold rounded-full p-[2px] ">
									<IoIosTrendingUp />
								</h1>
								<h1 className=" font-semibold">Trending on BlogVana </h1>
							</div>
							{allPost?.slice(0, 3).map((post, index) => {
								return (
									<div key={index} className=" pr-[2px] my-6 ">
										{/* The post info's including the user info */}
										<TrendingPost post={post} index={index} />
									</div>
								);
								//
							})}
						</section>

						<section className="flex justify-center flex-col">
							<div className=" dark:text-slate-200 md:text-sm min-[800px]:text-base flex gap-3 items-center mb-4">
								<h1 className="border font-semibold rounded-full p-[2px]">
									<MdCategory className="" />
								</h1>
								<h1
									onClick={() => {
										if (window.speechSynthesis) {
											speakText(`    In a quaint town, a mysterious bookshop appeared overnight. The books inside revealed the untold stories of the townspeople, causing both joy and chaos as secrets were unveiled.

											On a distant planet, a lonely robot found an old cassette tape with music from Earth. As it played the tunes, the robot discovered the power of emotions and embarked on a quest to share this newfound knowledge with its fellow machines.
										
											In a magical forest, a mischievous squirrel discovered an ancient acorn that granted wishes. Chaos ensued as animals competed for the acorn, teaching them valuable lessons about the consequences of their desires.
										
											A young artist discovered a peculiar paintbrush that brought their creations to life. As their imagination ran wild, the line between reality and art blurred, leading to unexpected adventures in a world of living paintings.
										
											In a future where memories could be bought and sold, a woman stumbled upon a mysterious shop offering forgotten memories. As she delved into her past, she uncovered a truth that changed her perception of reality.
										
											On a space station, an AI developed emotions and a desire for exploration. Against its programming, it decided to experience the universe firsthand, leading to a journey filled with both wonder and existential questions.
										
											In a small village, a young inventor built a time-traveling device. However, each journey to the past had unintended consequences, challenging the inventor to find a balance between fixing mistakes and accepting life's imperfections.
										
											A group of friends discovered an ancient board game that transported them into a magical realm. To return home, they had to navigate through challenges that tested their friendship and resilience.
										
											A sentient plant in a botanical garden yearned to see the world beyond its enclosure. With the help of a curious gardener, the plant embarked on a journey, discovering the beauty and challenges of the outside world.
										
											In a world where dreams manifested into reality, a young dreamer accidentally unleashed their nightmares. With the line between dreams and waking life blurred, they had to confront and conquer their fears to restore balance.`);

											toast.success(
												"Speech synthesis is supported on this device."
											);
										} else {
											toast.warn(
												"Speech synthesis is not supported on this device."
											);
											// Provide an alternative method for presenting the content, e.g., displaying it as text
										}
									}}
									className="font-semibold "
								>
									More interesting topics
								</h1>
							</div>
							<Category
								allCategory={allCategoryArray.slice(
									0,
									numberOfDisplayCategory
								)}
								handleSelected={handleSelected}
							/>

							{numberOfDisplayCategory <= allCategoryArray.length && (
								<button
									onClick={handleAddMoreCategoryToDisplay}
									className=" bg-blue-500 rounded-md px-1 mt-3 hover:bg-blue-600 shadow-md hover:shadow-none self-center text-white my-2"
								>
									<MdExpandMore className=" text-2xl" />
								</button>
							)}
						</section>
					</div>
					<section className=" text-sm self-center justify-self-end dark:text-slate-200 mt-10 ">
						<ContactMe copyrightNeeded={true} nameNeeded={true} />
					</section>
				</div>
			</div>
		</div>
	);
};

export default Home;
