import { lazy } from "react";

const Layout = lazy(() => import("./Layout"));
const Followers = lazy(() => import("./Followers"));
const Messages = lazy(() => import("./Messages"));
const CreatePost = lazy(() => import("./CreatePost"));
const ProfileView = lazy(() => import("./ProfileView"));
const SavedPost = lazy(() => import("./SavedPost"));
const PostHistory = lazy(() => import("./PostHistory"));
const MyPosts = lazy(() => import("./MyPosts"));
const ConfirmUserEmail = lazy(() => import("./ConfrimUserEmail"));
const Following = lazy(() => import("./Following"));
const UserPage = lazy(() => import("./UserPage"));
const WhoViewedMyProfile = lazy(() => import("./WhoViewedMYProfileViews"));
const Stats = lazy(() => import("./Stats"));
const CropImage = lazy(() => import("./CropImage"));
const PasswordReset = lazy(() => import("./PasswordReset"));

export {
	Layout,
	Followers,
	Messages,
	CreatePost,
	ProfileView,
	SavedPost,
	PostHistory,
	MyPosts,
	Stats,
	ConfirmUserEmail,
	Following,
	WhoViewedMyProfile,
	UserPage,
	CropImage,
	PasswordReset,
};
