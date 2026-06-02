export default function App() {
    return ( 
        <>
            <h1>CooL List</h1>
            <H1>Hi!</H1>
            <Greeting/>
            <ul className="my-list">
                <li>hello</li>
                <li>world</li>
            </ul>
        </>
        )
} 

function H1({children}){
    return <h1>{children}</h1>
}

function Greeting() {
    return <h2>Hi there!</h2>
}