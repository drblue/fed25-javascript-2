import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

interface ProtectedRoutesProps {
	redirect?: string;
}

const ProtectedRoutes = ({ redirect = "/login" }: ProtectedRoutesProps) => {
	const { currentUser } = useAuth();

	return currentUser
		? <Outlet />
		: <Navigate to={redirect} replace />
}

export default ProtectedRoutes;
