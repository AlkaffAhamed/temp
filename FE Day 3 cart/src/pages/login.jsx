import { LoginForm, LogoutButton, useAuth } from "../domains/auth/"
import { Route, Redirect } from "react-router-dom";

export const LockedRoute = ({ component: Component, ...props }) => {
  const auth = useAuth();
  
  return(
    <Route
      {...props}
      render={(props) =>
        auth.status === "anonymous"
          ? <Redirect to="/" />
          : <>
              <Component {...props} />
              <LogoutButton />
            </>
      }
    />
  );
}

export const Login = ({ endPath, ...props }) => {
  const auth = useAuth();
  
  return(
    <Route
      {...props}
      render={() =>
        auth.status === "anonymous"
          ? <main className="bg-gray-50 p-6 sm:p-12 min-h-screen">
              <LoginForm />
            </main>
          : <Redirect to={endPath} />
      }
    />
  );
}