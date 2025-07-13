import React from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"


export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    // Log state values on every render
    console.log("HostVans Render - Loading:", loading, "Vans:", vans, "Error:", error);


    React.useEffect(() => {
        console.log("useEffect triggered!"); // <-- ΝΑΙ, βάλτο!
        async function loadVans() {
            setLoading(true)
            console.log("Starting fetch... setLoading(true)"); // <-- Αυτό το έχεις ήδη

            try {
                const data = await getHostVans()
                console.log("Fetch successful! Data received:", data); // <-- ΝΑΙ, βάλτο! (ΠΟΛΥ ΣΗΜΑΝΤΙΚΟ!)
                setVans(data)
                console.log("setVans(data) called."); // <-- ΝΑΙ, βάλτο!
            } catch (err) {
                console.error("Fetch error!", err); // <-- ΝΑΙ, βάλτο! (ΠΟΛΥ ΣΗΜΑΝΤΙΚΟ!)
                setError(err)
            } finally {
                setLoading(false)
                console.log("Fetch finished. setLoading(false)"); // <-- ΝΑΙ, βάλτο!
            }
        }
        loadVans()
    }, [])


    // Also check hostVansEls construction
    console.log("Vans array before map:", vans); // <-- ΝΑΙ, βάλτο!
    const hostVansEls = vans.map(van => (
        <Link to={van.id} key={van.id} className="host-van-link-wrapper">
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ));
    console.log("hostVansEls array:", hostVansEls); // <-- ΝΑΙ, βάλτο!


    if (loading) {
        console.log("Returning Loading UI."); // <-- ΝΑΙ, βάλτο!
        return <h2>Loading...</h2>
    }

    if (error) {
        console.log("Returning Error UI. Error message:", error.message); // <-- ΝΑΙ, βάλτο!
        return <h1>There was an error: {error.message}</h1>
    }

    console.log("Returning Main UI."); // <-- ΝΑΙ, βάλτο!
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {hostVansEls}
                        </section>
                    ) : (
                        <h2>No vans found.</h2>
                    )
                }
            </div>
        </section>
    )
}