import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/ShortList";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { useState } from "react";
import { puppies } from "./data/puppies";
import { Puppy } from "./types";

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

  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Shortlist puppies={puppies} liked={liked} setLiked={setLiked} />
      </div>
      <PuppiesList searchQuery={searchQuery} puppies={puppies} liked={liked} setLiked={setLiked} />
      <NewPuppyForm />
    </main>
  );
}