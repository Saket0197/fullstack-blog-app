import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";


const useSession = () => {
  const {setUserInfo,setLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();
    async function getSession(jwtoken) {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/session`,{
          method: 'GET',
          headers:{
            'Authorization':`Bearer ${jwtoken}`
          },
          credentials:'include' 
        });
        const response = await res.json();
        if(response.success) {
          setUserInfo(response.data);
          setLoggedIn(true);
          return true;
        }
        else{
          setUserInfo(null);
          setLoggedIn(false);
          if(localStorage.getItem('token'))
            localStorage.removeItem('token');
          navigate('/');
          return false;
        }
      }

    const isSessionValid = async () => {
      try{
        if(localStorage.getItem('token')) {
          let res = await getSession(localStorage.getItem('token'));
          return res;
        }
      } catch(err) {
        console.log('Error in fetching session');
        console.error(err.message);
      }
    }
    return {isSessionValid};
}

export default useSession;