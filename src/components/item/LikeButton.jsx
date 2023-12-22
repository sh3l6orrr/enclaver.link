import { useState } from "react";
import { useStore } from "../../store";
import { likeItem } from "./actions.js";

export default function LikeButton({ item }) {
  const token = useStore(state => state.token)
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const loggedUser = useStore(state => state.loggedUser)
  const [optimisticItem, setOptimisticItem] = useState(item)

  const handleLikeClick = async (event) => {
    event.stopPropagation();

    if (!loggedUser) {
      setShowSignInModal(true);
      return;
    }
    if (optimisticItem.liked_by.includes(loggedUser)) {
      setOptimisticItem({
        ...optimisticItem,
        likes: parseInt(optimisticItem.likes) - 1,
        liked_by: optimisticItem.liked_by.filter(username => username !== loggedUser)
      })
    } else {
      setOptimisticItem({
        ...optimisticItem,
        likes: parseInt(optimisticItem.likes) + 1,
        liked_by: [...optimisticItem.liked_by, loggedUser]
      })
    }
    await likeItem(token, item.id);
  }
  return <div className="item-button" onClick={handleLikeClick}>
    {optimisticItem.liked_by.includes(loggedUser) ? '♥' : '♡'} Like {optimisticItem.likes}
  </div>
}