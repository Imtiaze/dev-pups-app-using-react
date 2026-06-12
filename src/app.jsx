import { PageWrapper } from "./components/PageWrapper"
import { Container } from "./components/Container"
import { Header } from "./components/Header"
import { Search } from "./components/Search"
import { ShortList } from "./components/ShortList"
import { NewPuppyForm } from "./components/NewPuppyForm"
import { puppies } from "./data/puppies"

export function App() {
    return (
      <PageWrapper>
        <Container>
          <Header />
            <Main />
        </Container>
      </PageWrapper>
    )
}  

function Main() {
  return (
    <main>
      <Search />
      <ShortList puppies={puppies} />
      <NewPuppyForm />
    </main>
  )
}