import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"

export default function HostVanDetail() {
    const [currentVan, setcurrentVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()


    React.useEffect(() => {
        async function loadVans(){
            setLoading(true)
            try {
                const data = await getVan(id)
                setcurrentVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])
    
    
    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    
    
    
    return (
        <>
            <section>
                <Link to="/host/vans" relative="path" className="back-button">&larr; <span>Back to all vans</span></Link>
                {currentVan && 
                    <div className="host-van-detail-layout-container">
                        <div className="host-van-detail">
                            <img src={currentVan.imageUrl} alt={currentVan.name} />
                            <div className="host-van-info">
                                <h2>{currentVan.name}</h2>
                                <p>{currentVan.price}/day</p>
                                <p>{currentVan.type}</p>
                            </div>  
                        </div>
                        
                        <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Photos
                        </NavLink>
                        </nav>


                    </div>
                }
            </section>
            <div>
                photo 
            </div>
        </>
    )
}