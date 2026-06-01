import React, { useState } from "react";
import { submitRating } from "../../api/apis";

export default function StoreCard({
  store,
  userRating,
  onRatingSubmitted,
}) {
  const [rating, setRating] =
    useState(userRating || 0);

  const [loading, setLoading] =
    useState(false);

  const handleRating = async (
    value
  ) => {
    setLoading(true);

    try {
      await submitRating(
        store.id,
        value
      );

      setRating(value);

      if (onRatingSubmitted) {
        onRatingSubmitted();
      }
    } catch (err) {
      console.error(
        "Failed to submit rating",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const averageRating =
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
          store.ratings.length
        ).toFixed(1)
      : 0;

  return (
    <div className="mb-2 rounded border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        {store.name}
      </h3>

      <p className="text-gray-600">
        Address: {store.address}
      </p>

      <p className="mt-1 text-gray-700">
        Average Rating:{" "}
        {averageRating}
      </p>

      <div className="mt-3 flex gap-2">
        {[1, 2, 3, 4, 5].map(
          (num) => (
            <button
              key={num}
              disabled={loading}
              onClick={() =>
                handleRating(num)
              }
              className={`rounded px-3 py-1 transition ${
                num <= rating
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200 text-gray-700"
              } ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "hover:opacity-90"
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>
    </div>
  );
}