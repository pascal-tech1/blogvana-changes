import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { sendMsg } from "../redux/message/messageSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LuSend, LuSendHorizonal } from "react-icons/lu";
import { logOutUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const MessageUser = ({ receiverId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState("");
	const { SendingMessageStatus, isBlocked } = useSelector(
		(store) => store.messageSlice
	);
	const formSchema = Yup.object().shape({
		message: Yup.string().required("messge is Required."),
	});

	const formik = useFormik({
		initialValues: {
			message: "",
		},

		onSubmit: (values) => {
			dispatch(sendMsg({ receiverId, message: values.message }));
		},
		validationSchema: formSchema,
	});
	console.log(SendingMessageStatus, isBlocked);
	useEffect(() => {
		if (SendingMessageStatus === "success") {
			console.log(SendingMessageStatus, "im sending message");
			formik.resetForm({
				values: {
					message: "",
				},
			});
		}
	}, [SendingMessageStatus]);

	useEffect(() => {
		if (isBlocked) {
			dispatch(logOutUser());
			navigate("/");
		}
	}, [isBlocked]);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const continueAction = () => {
		formik.submitForm();
		closeModal();
		setMessage("");
	};

	return (
		<div className=" font-inter">
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onContinue={continueAction}
				enterNeeded={false}
			>
				<form
					onSubmit={formik.handleSubmit}
					className=" min-w-[60vw] md:min-w-[30vw] "
				>
					<textarea
						value={formik.values.message}
						onChange={formik.handleChange("message")}
						onBlur={formik.handleBlur("message")}
						aria-label="Please enter your message"
						type="text"
						className="form-input h-[10rem]"
					/>
					<div className=" relative mb-2 self-start  ">
						<h1 className=" form-error-text ">
							{formik.touched.message && formik.errors.message}
						</h1>
					</div>
				</form>
			</Modal>
			<div
				onClick={openModal}
				className=" cursor-pointer p-2 rounded-full hover:bg-gray-500 hover:rounded-full flex items-center justify-center dark:text-white text-gray-600 transition-all delay-75 "
			>
				<LuSendHorizonal className=" text-lg  " />
			</div>
		</div>
	);
};

export default MessageUser;
