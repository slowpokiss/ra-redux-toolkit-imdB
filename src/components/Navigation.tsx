import { Link } from "react-router-dom"

export default function Navigation() {
  //console.log(window.location.href);
  //{window.location.href === 'http://localhost:5173/' ?}
  
  return (<>
    <div className="nav-block">
      <Link to='/' className="nav-link">Search Films</Link>
      <Link to='/favorite' className="nav-link">Favorites</Link>
    </div>
  </>)
}