import { NavLink } from "react-router-dom";

const Navigation = ({ links }) => {
  return (
    <nav>
      {links.map(({ path, name }) => <NavLink key={path} to={path}>{name}</NavLink>)}
    </nav>
  );
}

export default Navigation;