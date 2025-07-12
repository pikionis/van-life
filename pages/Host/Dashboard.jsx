import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVans } from "../../api"


export default function Dashboard() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    React.useEffect(() => {
        setLoading(true)
        getHostVans()
            .then(data => setVans(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    
    
    
    return (
        <div>
            <section className="host-dashboard-earnings">
                <div className="info">
                     <h1>Welcome!</h1>
                     <p>Income last <span className="bold">30 days</span></p>
                     <h2>$2,260</h2>
                </div>
                <link to="income">Details</link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score </h2>
                <BsStarFill className="star" />
                <p><span>5.0</span>/5</p>
                 <link to="review">Details</link>
            </section>
            <section className="host-dashboard-vans">
                <div>
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>

                
            </section>









        </div>
    )
}