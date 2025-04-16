import { NavLink } from 'react-router';
import { FC, ReactNode } from 'react';
import './NavigationLink.scss';

type NavigationLinkProps = {
  to: string;
  children: ReactNode;
}

const NavigationLink: FC<NavigationLinkProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (
        `navigation-link ${isActive ? 'navigation-link--active' : ''}`
      )}
    >
      {children}
    </NavLink>
  )
}

export { NavigationLink };