import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from 'next/dynamic'

const UserDetails = dynamic(() => import('../../components/UserDetails/UserDetails'))

function userDetails()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const users = useSelector(state => state.users);
  const {
    profileLoading,
    coverPhoto,
    profilePhoto
  } = users;
  // useEffect(() =>
  // {
  //   if (coverPhoto !== null || profilePhoto !== null)
  //   {
  //     dispatch(reset())
  //     router.push('/')
  //   }
  // }, [dispatch,coverPhoto, profilePhoto])
  return (
    <UserDetails id={id} />
  )
}

export default userDetails

// export const getServerSideProps = wrapper.getServerSideProps( store =>  ({ req, res,params}) =>
// {

//   const data = { req, id:params.id }
//   store.dispatch(userProfileAction(data))
// });