import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";

export default function Auth() {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Expense Tracker App</h1>
      <p className="text-lg font-semibold mb-8">Sign In With Google to Continue</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
    </div>
  </div>
  
  );
};