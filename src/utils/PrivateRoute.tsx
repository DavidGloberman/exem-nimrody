import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../store/store";

interface IPrivateRoute {
  component: ReactNode;
}

const PrivateRoute = ({ component }: IPrivateRoute) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const { floorAccess } = useSelector((state: RootState) => state.floorAccess);

  useEffect(() => {
    const parsedIndex = parseInt(index || "");
    if (!floorAccess[parsedIndex]) {
      navigate("/forbidden");
    }
  }, [index]);

  return <div className="PrivateRoute">{component}</div>;
};

export default PrivateRoute;
