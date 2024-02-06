import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Chat from './components/Chat';
import ApartmentSwiper from './components/ApartmentSwiper';
import History from './components/History';

export const Root = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<ApartmentSwiper />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/history" element={<History />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
