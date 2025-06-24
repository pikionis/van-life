import React from "react"
import bgImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"

export default function Vans() {
    const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then((res) => res.json())
            .then((data) => setVans(data.vans));
    }, []);

    const vanElements = vans.map(van => (
        <Link to={`/vans/${van.id}`} key={van.id} className="van-tile">
          <div> {/* Πρόσθεσα κλάση για μελλοντικό styling */}
            <img src={van.imageUrl} alt={van.name} />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
                {/* Νέες ιδιότητες που προσθέτουμε */}
                <p>{van.description}</p> {/* Εμφάνιση της περιγραφής */}
                <p>Type: {van.type}</p> {/* Εμφάνιση του τύπου (αν και το χρησιμοποιούμε ήδη για την κλάση) */}
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i> {/* Το εικονίδιο τύπου παραμένει */}
          </div>
        </Link>
    ))  


    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}