import { useAuthContext } from "./useAuthContext";
import { useTemplatesContext } from "./useTemplatesContext";


export const useLogout = () => {

  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTemplates } = useTemplatesContext()

  const logout = () => {
    localStorage.removeItem("user")

    dispatch({type: "LOGOUT"})
    dispatchTemplates({type: "SET_TEMPLATES", payload: null})
  }

  return { logout }
}
 
