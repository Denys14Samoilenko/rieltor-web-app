import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { Apartment } from '../types/Apartment';

const Card = ({ apartment }: { apartment: Apartment }) => {
	return (
		<>
			<div
				style={{
					backgroundImage: `url(${apartment.imgs[0]})`,
				}}
				className="text-black p-2 rounded-[6px] min-h-[200px] w-full flex flex-col justify-between bg-center bg-no-repeat bg-cover"
			>
				<div className="absolute">
					{apartment.choise ? (
						<div className="bg-[#44a744] px-3 py-1 rounded-xl text-white">
							<FiThumbsUp />
						</div>
					) : (
						<div className="bg-[#d34747] px-3 py-1 rounded-xl text-white">
							<FiThumbsDown />
						</div>
					)}
				</div>
			</div>
			<div className="text-white">
				<div className="">
					<span>
						{apartment.location_inf.location}, {apartment.location_inf.street} *{' '}
						{`${apartment.price.price_usd}$`} {apartment.rooms} *{' '}
						{apartment.total_house_area} м²
					</span>
				</div>
			</div>
		</>
	);
};

export default Card;
