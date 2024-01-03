import { useState } from "react";
import { useAppStore } from "@/store";
import { likeItem } from "./actions.js";
import styles from './styles.module.css'
import { useRouter } from "next/navigation";

export default function LikeButton({ item }) {
  const { token, loggedUser } = useAppStore()
  const router = useRouter()
  const [optimisticItem, setOptimisticItem] = useState(item)

  const handleLikeClick = async (event) => {
    event.stopPropagation();

    if (!loggedUser) {
      router.push('/signin')
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
  return <div className={styles.itemButton} onClick={handleLikeClick}>
    {optimisticItem.liked_by.includes(loggedUser) ? '♥' : '♡'} Like {optimisticItem.likes}
  </div>
}