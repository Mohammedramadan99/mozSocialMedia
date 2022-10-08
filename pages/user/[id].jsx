import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import UserDetails from '../../components/UserDetails/UserDetails'
import { reset, userProfileAction } from '../../store/usersSlice'

function userDetails()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const users = useSelector(state => state.users);
  const {
    coverPhoto,
    profilePhoto
  } = users;
  useEffect(() =>
  {
    dispatch(userProfileAction(id))
  }, [id])
  useEffect(() =>
  {
    if (coverPhoto !== null || profilePhoto !== null)
    {
      dispatch(reset())
      router.push('/')
    }
  }, [coverPhoto, profilePhoto])
  return (
    <UserDetails id={id} />
  )
}

export default userDetails