import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/ShortList";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { Suspense, use, useEffect, useState } from "react";
import { puppies as puppyData } from "./data/puppies";
import { Puppy } from "./types";
import { LoaderCircle } from "lucide-react";
import { getPuppies } from "./queries";
import { ErrorBoundary } from 'react-error-boundary'

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
			<ErrorBoundary 
				fallbackRender={({error}) => (
					<div className="bg-red-100 p-6 mt-12 shadow ring ring-black/5">
						<pre className="text-red-500">{ error.message}: {error.details}</pre>
					</div>
				)}
			>
				<Suspense 
					fallback={
						<div className="bg-white p-6 mt-12 shadow ring ring-black/5">
							<LoaderCircle className="animate-spin stroke-slate-300" />
						</div>
					}
				>
					<ApiPuppies />
				</Suspense>
			</ErrorBoundary>
			
			<div className="mt-24 grid gap-8 sm:grid-cols-2">
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<Shortlist puppies={puppies} liked={liked} setLiked={setLiked} />
			</div>
			<PuppiesList searchQuery={searchQuery} puppies={puppies} liked={liked} setLiked={setLiked} />
			<NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
		</main>
	);
}

const puppyPromise = getPuppies();

function ApiPuppies() {
	const apiPuppies = use(puppyPromise);
	return (
		<div className="bg-green-100 p-6 mt-12 shadow ring ring-black/5">
			<pre>{JSON.stringify(apiPuppies, null, 2)}</pre>
		</div>
	);
}