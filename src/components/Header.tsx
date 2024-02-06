import { useEffect, useState } from 'react';

import { Rieltor } from '../types/Rieltor';
import { getSearchParams } from '../api/api';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AGENT_PARAMS } from '../assets/constants';
import { getActiveLinkClass } from '../assets/functions';
import { FiMessageCircle } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

const Header = () => {
	const [rieltor, setRieltor] = useState<Rieltor>();
	const [isChatOpen, setIsChatOpen] = useState(true);

	const handleOpenChat = () => setIsChatOpen(prev => !prev);

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
		handleOpenChat();
	};

	useEffect(() => {
		getSearchParams(AGENT_PARAMS)
			.then(res => setRieltor(res.data))
			.catch(error => {
				console.error('Помилка:', error);
			});
	}, []);

	return (
		<header className="text-white bg-[#454545] rounded-[13px] p-3 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="rounded-[50%] w-[50px] h-[50px] bg-white"></div>
					<div className="">
						<h2>{rieltor?.full_name}</h2>
						<span>Рієлтор</span>
					</div>
				</div>

				{isChatOpen ? (
					<Link to="/chat" onClick={handleOpenChat}>
						<FiMessageCircle className="text-2xl" />
					</Link>
				) : (
					<button onClick={handleGoBack}>
						<IoIosArrowForward />
					</button>
				)}
			</div>
			{isChatOpen && (
				<nav className="bg-[#242424] flex justify-between p-1 rounded-[6px]">
					<NavLink to="/history" className={getActiveLinkClass}>
						історія
					</NavLink>
					<NavLink to="/" className={getActiveLinkClass}>
						нові
					</NavLink>
				</nav>
			)}
		</header>
	);
};
export default Header;
