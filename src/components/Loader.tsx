const Loader = () => {
	return (
		<main className="main pt-[80px] pb-4 px-4 flex flex-col min-h-[100vh]">
			<div className="loader flex w-full justify-center items-center z-[999]">
				<div className="w-[2em] h-[2em] animate-spin mx-auto my-[1em] rounded-[50%] border-l-black border-[0.3em] border-solid border-[#ddd]" />
			</div>
		</main>
	);
};

export default Loader;
