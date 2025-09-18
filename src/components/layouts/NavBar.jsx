import { Link } from 'react-router-dom'
import Conteiner from './Conteiner'
import Logo from '../../assets/costs_logo.png'
import style from './NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={style.navBar}>
      <Conteiner>
        <Link to='/'><img src={Logo} alt="" /></Link>
        <ul className={style.list}>
          <li className={style.item}><Link to='/'>Home</Link></li>
          <li className={style.item}><Link to='/projects'>Projects</Link></li>
        </ul>
        
        
      </Conteiner>
    </nav>
  )
}
