import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">Oh! Snap!</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry, Something went wrong! Please, Check Web Console for Technical
            Details of the Error.
          </p>
          <p className="my-8">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>

          <Link to="/">
            <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
              Back to Home
            </button>
          </Link>
        </div>
        <div className="max-w-lg"></div>
      </div>
    </div>
  );
}
