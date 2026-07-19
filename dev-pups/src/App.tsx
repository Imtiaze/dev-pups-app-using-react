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
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getPuppies() {
			setIsLoading(true);
			try {
				const response = await fetch('http://127.0.0.1:8000/api/puppies');

				if (!response.ok) {
					const errorData = await response.json();
					setError(`${errorData.message}: ${errorData.details}`)
					throw new errorData;
				}

				const result = await response.json();

				getApiPuppies(result.data);

			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		}

		getPuppies();
	}, [

	]);

	return (
		<div className="bg-white p-6 mt-12 shadow ring ring-black/5">
			{ isLoading && <LoaderCircle className="animate-spin stroke-slate-300" />}
			{apiPuppies.length > 0	&& (
				<pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
			)}
			{ error && <p className="text-red-500">{error}</p>}
		</div>
	);
}