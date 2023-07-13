import Link from "next/link";

const Home = () => {
    return <div>
        <h1>Welcome!</h1>
        <h2>Execute your expensive tasks.</h2>
        <p>
            Please <Link href={"/login"} style={{color: 'blue'}}>login</Link> to continue. 
        </p>

    </div>
};

export default Home;