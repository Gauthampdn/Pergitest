import { useAuthContext } from "./useAuthContext";
import { useTemplatesContext } from "./useTemplatesContext";


export const useLogout =  () => {

  const { dispatch } = useAuthContext()

  const { dispatch: dispatchTemplates } = useTemplatesContext()

  const logout = async () => {
    dispatch({type: "LOGOUT"})
    dispatchTemplates({type: "SET_TEMPLATES", payload: null})

    window.location.href = "http://localhost:4000/auth/logout";

  }

  return { logout }
}
 
