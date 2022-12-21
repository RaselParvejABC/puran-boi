import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import InformDialog from '../../components/Dialogs/InformDialog';

const Login = () => {
  const {
    firebaseAuthInstance,
    currentUser,
    currentUserLoading,
    currentUserLoadingError,
  } = useContext(FirebaseAuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showCurrentUserLoadingError, setShowCurrentUserLoadingError] =
    useState(true);
  const [
    signInWithEmailAndPassword,
    ,
    passwordLoginLoading,
    passwordLoginError,
  ] = useSignInWithEmailAndPassword(firebaseAuthInstance);

  const [signInWithGoogle, , googleLoginLoading, googleLoginError] =
    useSignInWithGoogle(firebaseAuthInstance);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (currentUserLoading) {
    return <MySpinnerDottedOnCenter size={70} />;
  }

  if (currentUserLoadingError) {
    return (
      <InformDialog
        title="Please, Reload the Page!"
        message="PuranBoi cannot Retrieve Current User State."
        isOpen={showCurrentUserLoadingError}
        onClose={() => setShowCurrentUserLoadingError(false)}
      />
    );
  }

  if (currentUser) {
    return <Navigate to={from} replace />;
  }

  const handleSubmission = event => {
    event.preventDefault();
    setError(null);
    if (!EmailValidator.validate(email)) {
      setError('Email Format Incorrect!');
      return;
    }
    signInWithEmailAndPassword(email, password);
  };

  const handleGoogleSignIn = async event => {
    event.preventDefault();
    setError(null);
    signInWithGoogle();
  };

  return (
    <div>
      <div className="flex flex-col items-center  pt-5 sm:justify-center bg-gray-50">
        <div>
          <h3 className="text-3xl font-bold text-primary">PuranBoi | Log In</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <button
                onClick={handleSubmission}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
                disabled={passwordLoginLoading || googleLoginLoading}
              >
                Log In
              </button>
            </div>
          </form>

          {(error || passwordLoginError || googleLoginError) && (
            <div className="mt-4 text-center text-red-500">
              {error && <p>{error}</p>}
              {!error &&
                passwordLoginError &&
                passwordLoginError.code.endsWith('user-not-found') &&
                'No Registered User with this Email'}
              {!error &&
                passwordLoginError &&
                passwordLoginError.code.endsWith('wrong-password') &&
                'Incorrect Password!'}

              {!error && !passwordLoginError && googleLoginError && (
                <p>{googleLoginError.message}</p>
              )}
            </div>
          )}

          {(passwordLoginLoading || googleLoginLoading) && (
            <MySpinnerDottedOnCenter size={70} />
          )}
          <div className="mt-4 text-grey-600">
            Want to Register a Password Account with your Email?{' '}
            <span>
              <Link
                className="text-primary hover:underline"
                to="/register"
                state={{ from: from }}
              >
                Register
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
