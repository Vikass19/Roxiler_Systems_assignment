import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import api from "../../api/apis";
import RatingStars from "../../componants/ratings/RatingStars";
import { AuthContext } from "../../context/AuthContext";

export default function StoreList() {
  const { user } = useContext(AuthContext);

  const [stores, setStores] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const loadStores = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(
        "/stores"
      );

      const storesWithUserRating =
        res.data.map((store) => {
          const userRatingObj =
            store.ratings?.find(
              (rating) =>
                rating.userId ===
                user?.id
            );

          return {
            ...store,
            userRating:
              userRatingObj
                ? userRatingObj.value
                : 0,
          };
        });

      setStores(
        storesWithUserRating
      );
    } catch (e) {
      console.error(e);

      setError(
        "Failed to load stores. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleRatingChange =
    async (storeId, value) => {
      if (
        !user ||
        user.role !==
          "NORMAL_USER"
      )
        return;

      try {
        await api.post(
          `/ratings/${storeId}/rate`,
          { value }
        );

        setStores((prev) =>
          prev.map((store) =>
            store.id === storeId
              ? {
                  ...store,
                  userRating: value,
                }
              : store
          )
        );
      } catch (e) {
        console.error(
          "Failed to submit rating",
          e.response?.data ||
            e.message
        );
      }
    };

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading stores...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl space-y-6 px-4">
      <h2 className="mb-6 text-center text-3xl font-bold">
        🌟 Stores Around You
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {stores.map((store) => {
          const avgRating =
            store.ratings?.length
              ? (
                  store.ratings.reduce(
                    (
                      total,
                      rating
                    ) =>
                      total +
                      rating.value,
                    0
                  ) /
                  store.ratings
                    .length
                ).toFixed(1)
              : "N/A";

          return (
            <div
              key={store.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-white p-5 shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {store.name}
                </h3>

                <p className="mt-1 text-gray-500">
                  {store.address}
                </p>

                <div className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  Avg Rating:{" "}
                  {avgRating} ⭐
                </div>
              </div>

              <div className="flex-shrink-0">
                <RatingStars
                  value={
                    store.userRating ||
                    0
                  }
                  editable={
                    user?.role ===
                    "NORMAL_USER"
                  }
                  onChange={(value) =>
                    handleRatingChange(
                      store.id,
                      value
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}