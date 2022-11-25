import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';

const Register = () => {
  const {
    firebaseAuthInstance,
    currentUser,
    currentUserLoading,
    currentUserLoadingError,
  } = useContext(FirebaseAuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileNeedsUpdate, setProfileNeedsUpdate] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [
    createUserWithEmailAndPassword, //Skipping a Variable on Next Line
    ,
    createUserLoading,
    createUserLoadingError,
  ] = useCreateUserWithEmailAndPassword(firebaseAuthInstance);

  const [updateProfile, updateLoading, updateError] =
    useUpdateProfile(firebaseAuthInstance);

  const [showCurrentUserLoadingError, setShowCurrentUserLoadingError] =
    useState(true);

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
    if (!profileNeedsUpdate || profileUpdated) {
      return <Navigate to={from} replace />;
    }
    return <MySpinnerDottedOnCenter size={70} />;
  }

  const handleSubmission = async event => {
    event.preventDefault();
    setError(null);
    if (password !== passwordConfirmed) {
      setError("Passwords don't Match");
      return;
    }
    if (name?.trim().length === 0) {
      setError('Names cannot be empty!');
      return;
    }
    if (!EmailValidator.validate(email)) {
      setError('Email Format Incorrect!');
      return;
    }
    if (password?.length < 6) {
      setError('Password needs to be at least 6 Characters!');
      return;
    }

    if (event.target.propic.files[0] === '') {
      setError('Add a Profile Picture.');
      return;
    }

    const formData = new FormData();
    formData.append('key', import.meta.env.VITE_ImgBB_API_KEY);
    formData.append('image', event.target.propic.files[0]);

    setUploadingImage(true);
    let photoURL = null;
    try {
      const imgBBResponse = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
      const imgBBResponseBody = await imgBBResponse.json();
      photoURL = imgBBResponseBody['data']['display_url'];
    } catch (err) {
      console.error(err);
      setError('Unable to Upload the Picture!');
      return;
    } finally {
      setUploadingImage(false);
    }

    setProfileNeedsUpdate(true);

    createUserWithEmailAndPassword(email, password)
      .then(user => {
        updateProfile({ photoURL, displayName: name }).then(() => {
          setProfileUpdated(true);
        });
      })
      .catch();
  };

  return (
    <div>
      <div className="flex flex-col items-center pt-5 sm:justify-center bg-gray-50">
        <div>
          <h3 className="text-3xl font-bold text-primary">
            PuranBoi | Register
          </h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmission}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Full Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={event => setName(event.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="propic"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Profile Picture
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  accept="image/png, image/jpeg"
                  type="file"
                  name="propic"
                  className="pl-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

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
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={event => setPasswordConfirmed(event.target.value)}
                  value={passwordConfirmed}
                  type="password"
                  name="password_confirmation"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
                disabled={updateLoading || createUserLoading || uploadingImage}
              >
                Register
              </button>
            </div>
          </form>

          {(error || createUserLoadingError || updateError) && (
            <div className="mt-4 text-center text-red-500">
              {error || createUserLoadingError?.message || updateError?.message}
            </div>
          )}

          {(createUserLoading || uploadingImage) && (
            <MySpinnerDottedOnCenter size={50} />
          )}

          <div className="mt-4 text-grey-600 text-center">
            Already have an account?
            <br />
            Or, want to Log In with Google? <br />
            <span>
              <Link
                className="text-primary hover:underline"
                to="/login"
                state={{ from: from }}
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
