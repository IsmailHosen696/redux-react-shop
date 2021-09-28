import Nav from "./Nav";
import Shop from "./Shop";

export default function HomePage() {
    return (
        <div className="flex flex-col w-full">
            <Nav />
            <Shop />
        </div>
    )
}
