import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/ShortList";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { useEffect, useState } from "react";
import { puppies as puppyData } from "./data/puppies";
import { Puppy } from "./types";
import { LoaderCircle } from "lucide-react";

export function App() {
	return (
		<PageWrapper>
			<Container>
				<Header />
				<Main />
			</Container>
		</PageWrapper>
	);
}

function Main() {

	const [liked, setLiked] = useState<Puppy['id'][]>([1, 3])
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [puppies, setPuppies] = useState<Puppy[]>(puppyData);

	return (
		<main>
			<ApiPuppies />
			<div className="mt-24 grid gap-8 sm:grid-cols-2">
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<Shortlist puppies={puppies} liked={liked} setLiked={setLiked} />
			</div>
			<PuppiesList searchQuery={searchQuery} puppies={puppies} liked={liked} setLiked={setLiked} />
			<NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
		</main>
	);
}

function ApiPuppies() {

	const [apiPuppies, getApiPuppies] = useState<[]>([]);
	const [apiLoader, getApiLoader] = useState<Boolean>(true);

	useEffect(() => {
		async function getPuppies() {
			try {
				const response = await fetch('http://127.0.0.1:8000/api/puppies');

				if (!response.ok) {
					throw new Error("Network response is no ok");
				}

				const data = await response.json();

				getApiPuppies(data);

				getApiLoader(false);
			} catch (error) {
				console.log(error);
			}
		}

		getPuppies();
	}, [

	]);

	return (
		<div className="bg-white p-6 mt-12 shadow ring ring-black/5">
			{
				apiLoader 
					? (<LoaderCircle className="animate-spin stroke-slate-300" />)
					: (<pre>{JSON.stringify(apiPuppies, null, 2)}</pre>)
			}
		</div>
	);
}