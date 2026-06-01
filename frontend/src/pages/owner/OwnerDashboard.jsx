import  {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FiStar,
  FiUser,
  FiMail,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis";

export default function OwnerDashboard() {
  const { user } = useContext(AuthContext);

  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] =
    useState(0);
  const [loading, setLoading] =
    useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchRatings = async () => {
      setLoading(true);
      setMsg("");

      try {
        const storesRes = await api.get(
          "/stores"
        );

        const myStore =
          storesRes.data.find(
            (store) =>
              store.ownerId === user.id
          );

        if (!myStore) {
          setMsg(
            "No store assigned to your account"
          );

          setRatings([]);
          setAvgRating(0);

          return;
        }

        const ratingsRes =
          await api.get(
            `/stores/${myStore.id}/ratings`
          );

        const myRatings =
          ratingsRes.data || [];

        setRatings(myRatings);

        const total =
          myRatings.reduce(
            (sum, rating) =>
              sum + rating.value,
            0
          );

        const average =
          myRatings.length > 0
            ? total / myRatings.length
            : 0;

        setAvgRating(
          average.toFixed(2)
        );
      } catch (err) {
        console.error(
          "Failed to fetch ratings",
          err
        );

        setMsg(
          "Failed to fetch ratings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-lg text-gray-600">
        Loading ratings...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-5xl space-y-6 rounded-xl bg-gray-50 p-6 shadow-md">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Owner Dashboard
      </h2>

      {msg && (
        <div className="rounded bg-yellow-100 p-3 text-center font-medium text-yellow-800">
          {msg}
        </div>
      )}

      {/* Average Rating Card */}
      <div className="flex items-center justify-center rounded-xl bg-white p-6 shadow-md">
        <FiStar className="mr-4 text-4xl text-yellow-500" />

        <div>
          <p className="text-sm text-gray-500">
            Average Rating of Your Store
          </p>

          <p className="text-3xl font-bold text-gray-900">
            {avgRating}
          </p>
        </div>
      </div>

      {/* Ratings Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3 text-left font-semibold text-gray-700">
                User Name
              </th>

              <th className="border px-6 py-3 text-left font-semibold text-gray-700">
                Email
              </th>

              <th className="border px-6 py-3 text-left font-semibold text-gray-700">
                Rating
              </th>
            </tr>
          </thead>

          <tbody>
            {ratings.length > 0 ? (
              ratings.map((rating) => (
                <tr
                  key={rating.id}
                  className="cursor-pointer transition hover:bg-gray-50"
                >
                  <td className="flex items-center gap-2 border px-6 py-3">
                    <FiUser className="text-gray-400" />
                    {rating.user.name}
                  </td>

                  <td className="flex items-center gap-2 border px-6 py-3">
                    <FiMail className="text-gray-400" />
                    {rating.user.email}
                  </td>

                  <td
                    className={`border px-6 py-3 font-semibold ${
                      rating.value >= 4
                        ? "text-green-600"
                        : rating.value >= 2
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {rating.value}

                    <FiStar className="ml-1 inline text-yellow-400" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-gray-500"
                >
                  No ratings submitted yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}