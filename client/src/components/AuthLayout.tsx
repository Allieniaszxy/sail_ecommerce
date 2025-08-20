import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-500 text-center">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm text-gray-500">
          {title === "Sign In" ? (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-600 hover:underline">
                Sign In
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
