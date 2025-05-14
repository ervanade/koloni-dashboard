import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { loginUser } from '../../store/authSlice';


const AddToFavoriteButton = ({ username, platform, followers, engagement_rate }) => {
    const user = useSelector((a) => a.auth.user);
    const dispatch = useDispatch();
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(false);

  useEffect(() => {
    const isInitiallyFavorite = user?.favorites?.some(
      (fav) => fav.username === username && fav.platform === platform
    );
    setIsFavoriteLocal(isInitiallyFavorite);
  }, [user?.favorites, username, platform]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    const newFavoriteStatus = !isFavoriteLocal;
    setIsFavoriteLocal(newFavoriteStatus);

    const favoriteData = { username, platform, followers, engagement_rate };
    const userId = user?._id;

    if (!userId) {
      console.error("User ID not found. Cannot update favorites.");
      return;
    }

    try {
      let updatedFavorites = [...(user?.favorites || [])];

      if (newFavoriteStatus) {
        // Add to favorites
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/users/${userId}/favorites`,
          JSON.stringify({ username, platform, followers, engagement_rate }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          updatedFavorites = [...updatedFavorites, favoriteData];
          dispatch(loginUser({ ...user, favorites: updatedFavorites }));
        } else {
          console.error("Failed to add to favorites:", response);
          setIsFavoriteLocal(!newFavoriteStatus); // Revert local state
        }
      } else {
        // Remove from favorites
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_API_URL}/users/${encodeURIComponent(userId)}/favorites`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            data: { username, platform }, // Kirim username dan platform untuk menghapus
          }
        );
        if (response.status === 200) {
          updatedFavorites = updatedFavorites.filter(
            (fav) => !(fav.username === username && fav.platform === platform)
          );
          dispatch(loginUser({ ...user.user, favorites: updatedFavorites }));
        } else {
          console.error("Failed to remove from favorites:", response);
          setIsFavoriteLocal(!newFavoriteStatus); // Revert local state
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      setIsFavoriteLocal(!newFavoriteStatus); // Revert local state
    }
  };

  return (
    <button onClick={handleFavoriteClick} className="flex items-center gap-1 text-sm hover:text-yellow-500">
      {isFavoriteLocal ? (
        <>
          <FaStar className="text-yellow-500" size={16} />
          <span className="">Remove</span>
        </>
      ) : (
        <>
          <FaRegStar className="text-gray-400 hover:text-yellow-500" size={16} />
          <span className="">Favorite</span>
        </>
      )}
    </button>
  );
};

export default AddToFavoriteButton;