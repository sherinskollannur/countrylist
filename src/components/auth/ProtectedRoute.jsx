import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={location.pathname} />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
