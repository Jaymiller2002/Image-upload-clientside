import { Link } from "react-router-dom"
import './App.css'

function Header() {
  return (
    <div className="Header">
      <button><Link style={{ marginRight: 20 }} to='/'>Home</Link></button>
      <button><Link style={{ marginRight: 20 }} to='/login'>Login</Link></button>
      <button><Link to='/Profile'>Profile</Link></button>
    </div>
  )
}

export default Header