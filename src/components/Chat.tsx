import { useEffect, useState, useRef } from 'react';
import { getSearchParams } from '../api/api';
import { ChatMessage } from '../types/ChatMessage';
import { formattedDate } from '../assets/functions';
import { MESSAGE_PARAMS, VIEW_CHAT_PARAMS } from '../assets/constants';
import { IoCloseCircleOutline, IoImageOutline } from 'react-icons/io5';
import { CiLocationArrow1 } from 'react-icons/ci';

const Chat = () => {
	const [message, setMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [files, setFiles] = useState<FileList | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (files !== null) {
			const formData = new FormData();

			Array.from(files).forEach(async file => {
				formData.append("FILES['img']", file);

				try {
					const response = await fetch(
						`https://sidorko.programmer.lviv.ua/?mod=chat&action=send_messege`,
						{
							method: 'POST',
							body: formData,
						}
					);

					return await response.json();
				} catch (error) {
					console.error('Error uploading file:', error);
				}
			});
		}

		await getSearchParams(`${MESSAGE_PARAMS}${message}`);
		setMessage('');

		await getSearchParams(VIEW_CHAT_PARAMS).then(res => {
			setChatMessages(res.data);
			scrollToBottom();
		});
	};

	useEffect(() => {
		getSearchParams(VIEW_CHAT_PARAMS).then(res => setChatMessages(res.data));
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]);

	return (
		<main className="flex flex-col gap-5 justify-between">
			<div className="flex flex-col items-end gap-2 overflow-y-auto max-h-[340px] ">
				{chatMessages.slice(-15).map((el, index) => {
					const isLast = index === chatMessages.length - 1;
					return (
						<div
							key={`${message}-${index}`}
							className={`flex flex-col items-end first:rounded-ss-2xl first:rounded-se-2xl first:rounded-es-2xl  bg-[rgba(93,99,255,0.70)] py-3 px-7  ${
								isLast
									? 'rounded-es-2xl rounded-ss-2xl rounded-ee-2xl'
									: 'rounded-ss-2xl rounded-es-2xl'
							}`}
						>
							<span className="text-lg">{el.messege}</span>
							<span className="text-xs">{formattedDate(el.time)}</span>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>
			<form className="flex gap-3 " onSubmit={handleSubmit}>
				<div className="relative w-full">
					<label htmlFor="message" className="text-black ">
						<input
							id="message"
							type="text"
							value={message}
							onChange={e => setMessage(e.target.value)}
							className="border-2 w-full border-[transparent] bg-[#bbb8b8] p-2 rounded-md outline-none focus:border-[rgba(93,99,255,0.70)] focus:bg-white"
						/>
						{!!message.length && (
							<span
								className="absolute right-9 top-2.5 text-xl"
								onClick={() => setMessage('')}
							>
								<IoCloseCircleOutline />
							</span>
						)}
					</label>
					<button type="button">
						<label htmlFor="image">
							<IoImageOutline className="absolute right-2 top-2.5 text-black text-xl" />
							<input
								type="file"
								className="hidden"
								id="image"
								multiple
								onChange={e => {
									setFiles(e.target.files);
								}}
							/>
						</label>
					</button>
				</div>

				<button
					type="submit"
					className={`w-1/6 flex justify-center items-center  p-2 rounded-md ${
						message.length
							? 'bg-[rgba(93,99,255,0.70)]'
							: 'bg-[rgba(185,185,185,0.7)] text-black'
					}`}
					disabled={!message.length}
				>
					<CiLocationArrow1 />
				</button>
			</form>
		</main>
	);
};

export default Chat;
