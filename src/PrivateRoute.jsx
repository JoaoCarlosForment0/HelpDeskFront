import { Navigate } from 'react-router-dom';

function PrivateRoute ({ element: Component, isAuthenticated, ...rest}) {

    if(isAuthenticated){
        return <Component {...rest}/>;
    }else{
        return <Navigate to="/login" replace />;
    }
}

export default PrivateRoute 