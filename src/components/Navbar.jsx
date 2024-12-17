import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link onClick={() => window.history.back()}>Retour</Link></li>
            </ul>
        </nav>
    )

}