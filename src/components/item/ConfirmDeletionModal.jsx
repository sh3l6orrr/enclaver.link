import { Modal, Space } from "../../util"
import { deleteItem } from "./item"
import { useRouter } from "next/navigation"
import { useStore } from "../../store"

export default function ConfirmDeletionModal({ id, setShowConfirmDeletionModal }) {
  const token = useStore(state => state.token)
  const router = useRouter()

  async function handleDelete() {
    const { ok, msg } = await deleteItem(token, id)
    alert(ok, msg)
    setShowConfirmDeletionModal(false)
    router.refresh()
  }
  return <>
    <Modal hideModalCallback={() => setShowConfirmDeletionModal(false)}>
      <h2>Are you sure?</h2>
      <div className="horizontal">
        <button onClick={() => setShowConfirmDeletionModal(false)}>Cancel</button>
        <Space w="1.5rem" />
        <button onClick={handleDelete}>Yes, delete.</button>
      </div>
    </Modal>
  </>
}