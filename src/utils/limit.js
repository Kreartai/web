export const getLimit = () =>{
  return localStorage.getItem("limit")
}
export const setLimit = (val) =>{
  return localStorage.setItem("limit", val)
}