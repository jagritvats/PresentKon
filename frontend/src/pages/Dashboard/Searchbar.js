import SearchIcon from '@mui/icons-material/Search';
import searchbar from './Searchbar.module.css';

export default function Searchbar() {
	return (
		<div className={searchbar.Container}>
			<SearchIcon />
			<input
				className={searchbar.Input}
				name="search"
				type="text"
				placeholder="Search batch..."
			/>
		</div>
	);
}
