import { Space } from "../../../util.jsx"
import { getProfile } from "./actions.js"
import ProfileHeader from "./ProfileHeader.jsx"

export default async function Layout({ params, children }) {

  const profile = await getProfile(params.username)

  return <>
    <ProfileHeader profile={profile} />
    <Space h="1rem" />
    {children}
  </>
}