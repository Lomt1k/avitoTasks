import { NavigationLink } from '../ui';
import { NAV_LINK_DATAS } from './NavLinkData';
import './MainNav.scss';

const MainNav = () => {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {NAV_LINK_DATAS.map(data => (
          <li key={data.path}>
            <NavigationLink to={data.path}>
              {data.text}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { MainNav };