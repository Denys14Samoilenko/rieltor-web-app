import { useEffect, useState } from 'react';
import Card from './Card';
import { getSearchParams } from '../api/api';
import { Apartment } from '../types/Apartment';
import Loader from './Loader';
import { CHOISE_APART_PARAMS } from '../assets/constants';

const History = () => {
	const [showHistory, setShowHistory] = useState(false);
	const [choiseApartments, setChoiseApartments] = useState<Apartment[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 200
			) {
				loadData();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [currentPage]);

	const loadData = async () => {
		setLoading(true);
		try {
			const response = await getSearchParams(
				`${CHOISE_APART_PARAMS}${currentPage}`
			);

			setChoiseApartments(prevData => [...prevData, ...response.data]);
			setCurrentPage(prevPage => prevPage + 1);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className="flex flex-wrap -m-2 items-center">
				{showHistory
					? choiseApartments
							.filter((apartment: Apartment) => !!apartment.choise)
							.map((apartment: Apartment, index) => (
								<div key={`${apartment.id}-${index}`} className="w-1/2 p-2">
									<Card apartment={apartment} />
								</div>
							))
					: choiseApartments.map((apartment: Apartment, index) => {
							return (
								<div key={`${apartment.id}-${index}`} className="w-1/2 p-2">
									<Card apartment={apartment} />
								</div>
							);
					  })}
			</div>
			<button
				className={`fixed left-2 right-2 bottom-1 p-2 transition-colors rounded-sm ${
					showHistory
						? 'bg-[rgba(70,165,70,0.9)]'
						: 'bg-[rgba(197,197,197,0.9)] text-black'
				}`}
				onClick={() => setShowHistory(prev => !prev)}
			>
				{showHistory ? 'Показати всі' : 'Показати ті, що сподобались'}
			</button>
		</>
	);
};
export default History;
