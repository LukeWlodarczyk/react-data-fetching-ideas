import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
        <NavLink to='/useState&useEffect'>useEffect&useState</NavLink>
        <NavLink to='/useSWR'>useSWR</NavLink>
        <NavLink to='/useQuery'>useQuery</NavLink>
        <NavLink to='/customWrapPromise&Suspense'>CustomWrapPromise&Suspense</NavLink>
        <NavLink to='/useSWR&Suspense'>useSWR&Suspense</NavLink>
        <NavLink to='/useSuspenseQuery&Suspense'>useSuspenseQuery&Suspense</NavLink>
        <NavLink to='/use&Suspense'>use&Suspense</NavLink>
    </nav>
  );
}

export default Navigation;