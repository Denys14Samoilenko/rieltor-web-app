import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Apartment } from '../types/Apartment';
import { getSearchParams } from '../api/api';

import {
	FiDollarSign,
	FiThumbsDown,
	FiThumbsUp,
	HiOutlineArrowsExpand,
	IoIosArrowDown,
	IoIosArrowForward,
	IoLocationOutline,
	MdOutlineBedroomChild,
	MdOutlineEuro,
	TbCurrencyHryvnia,
} from '../assets/icons';
import '../App.scss';
import Loader from './Loader';
import { Rubric } from '../types/Rubric';
import {
	DISLIKE_PARAMS,
	LIKE_PARAMS,
	NEW_APARTMENTS_PARAMS,
	RUBRICS_PARAMS,
} from '../assets/constants';

const ApartmentSwiper = () => {
	const [apartments, setApartments] = useState<Apartment[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [priceMenu, setPriceMenu] = useState(false);
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState('');
	const [allCardsViewed, setAllCardsViewed] = useState<boolean>(false);
	const [rubrics, setRubrics] = useState<Rubric[]>([]);

	const onSwipe = async (direction: string, character: Apartment) => {
		if (direction === 'right') {
			await getSearchParams(`${LIKE_PARAMS}${character.id}`);
		}

		if (direction === 'left') {
			await getSearchParams(`${DISLIKE_PARAMS}${character.id}`);
		}
	};

	const loadApartments = async () => {
		setLoading(true);
		try {
			const response = await getSearchParams(NEW_APARTMENTS_PARAMS);
			setApartments(response.data);

			if (response.data.length > 0) {
				setPrice(`${response.data[0].price.price_usd} $`);
			}
		} catch (error) {
			console.error('Помилка завантаження квартир:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadRubrics = async () => {
		try {
			const response = await getSearchParams(RUBRICS_PARAMS);
			setRubrics(response);
		} catch (error) {
			console.error('Помилка завантаження квартир:', error);
		}
	};

	useEffect(() => {
		loadApartments();
		loadRubrics();
	}, []);

	useEffect(() => {
		setCurrentIndex(0);
	}, [apartments]);

	const handleSwipe = (direction: string) => {
		const updatedApartments = [...apartments];
		const removedApartment = updatedApartments.shift();
		setApartments(updatedApartments);
		onSwipe(direction, removedApartment!);

		if (updatedApartments.length === 0) {
			setAllCardsViewed(true);
		}
		if (currentIndex === apartments.length - 1) {
			loadApartments();
		}
	};

	const handleLike = () => {
		if (!allCardsViewed) {
			handleSwipe('right');
		}
	};

	const handleDislike = () => {
		if (!allCardsViewed) {
			handleSwipe('left');
		}
	};

	return loading ? (
		<Loader />
	) : allCardsViewed ? (
		<div className="all-cards-viewed-message">
			Ви продивились всі нові квартири
		</div>
	) : (
		<div className="w-full flex flex-col gap-7">
			<div className="apartment-swiper-container h-[300px]">
				{apartments.map((apartment, index) => {
					const apartmentRubric =
						(Object.values(rubrics) as Rubric[]).find(
							({ id }: { id: string }) => id === apartment.rubric
						)?.name || '';
					return (
						<div
							key={apartment.id}
							className={`apartment-card ${index === 0 ? 'main' : ''} ${
								index === 1 ? 'second' : ''
							} ${index === 2 ? 'third' : ''}`}
							onClick={() => setCurrentIndex(index)}
						>
							<TinderCard
								className="swipe"
								onSwipe={direction => {
									handleSwipe(direction);
								}}
								onCardLeftScreen={() => setCurrentIndex(currentIndex + 1)}
								flickOnSwipe={true}
								preventSwipe={['up', 'down']}
							>
								<div
									style={{
										backgroundImage: `url(${apartment.imgs[0]})`,
									}}
									className="text-black p-2 rounded-[6px] h-[300px] w-full flex flex-col justify-between bg-[`url(${apartment.imgs[0]})`] bg-no-repeat bg-cover bg-center"
								>
									<div className="flex items-center justify-between gap-1">
										<div className="text-[#95ff57] flex gap-1 h-[32px]">
											<div className="flex gap-[1px] max-w-[129px]">
												<span className="bg-[rgba(0,0,0,0.5)] p-1 rounded-ss-md rounded-es-md text-nowrap ">
													{price}
												</span>
												<button
													className={`bg-[rgba(0,0,0,0.5)] p-1 rounded-se-md rounded-ee-md`}
													onClick={() => {
														setPriceMenu(prev => !prev);
													}}
												>
													{priceMenu ? (
														<IoIosArrowForward />
													) : (
														<IoIosArrowDown />
													)}
												</button>
											</div>

											<div
												className={`flex gap-2 items-center transition-opacity duration-400 ${
													priceMenu ? 'opacity-100' : 'opacity-0'
												}`}
											>
												<button
													className="text-lg bg-white text-[#8cff49] focus:bg-[#8cff49] focus:text-white p-1 border-2 border-[#8cff49] rounded-[6px]"
													onClick={() =>
														setPrice(`${apartment.price.price_usd}$`)
													}
												>
													<FiDollarSign />
												</button>
												<button
													className="text-lg bg-white text-[#8cff49] focus:bg-[#8cff49] focus:text-white p-1 border-2 border-[#8cff49] rounded-[6px]"
													onClick={() =>
														setPrice(`${apartment.price.price_eur} €`)
													}
												>
													<MdOutlineEuro />
												</button>
												<button
													className="text-lg bg-white text-[#8cff49] focus:bg-[#8cff49] focus:text-white p-1 border-2 border-[#8cff49] rounded-[6px]"
													onClick={() =>
														setPrice(`${apartment.price.price_uah} ₴`)
													}
												>
													<TbCurrencyHryvnia />
												</button>
											</div>
										</div>
										<span className="flex bg-[rgba(0,0,0,0.7)] px-2 py-1 text-white rounded-lg">
											{apartmentRubric}
										</span>
									</div>

									<div className="text-white text-xs">
										<div className="flex gap-1 items-center">
											<span>
												<IoLocationOutline />
											</span>
											<span>
												{apartment.location_inf.location},
												{apartment.location_inf.street} |
											</span>
											<span>
												<MdOutlineBedroomChild />
											</span>
											<span>{apartment.rooms} |</span>
											<span>
												<HiOutlineArrowsExpand />
											</span>
											<span>{apartment.total_house_area} м²</span>
										</div>
										<p>{apartment.description.slice(0, 80)}...</p>
									</div>
								</div>
							</TinderCard>
						</div>
					);
				})}
			</div>

			<div className="buttons flex gap-4 items-center justify-between">
				<button
					onClick={handleDislike}
					className="bg-[rgba(93,99,255,0.70)] p-4 rounded-[9px]  active:bg-[#d84b4b]"
				>
					<FiThumbsDown />
				</button>
				<button
					onClick={handleLike}
					className="bg-[rgba(93,99,255,0.70)] p-4 rounded-[9px] active:bg-[#3ba33b]"
				>
					<FiThumbsUp />
				</button>
			</div>
		</div>
	);
};

export default ApartmentSwiper;
