import './App.scss';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className="p-4 min-h-screen flex flex-col gap-12 justify-between overflow-hidden">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
