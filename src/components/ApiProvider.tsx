import React,{ createContext, useState } from 'react'

interface ApiContextProps {
  isPutApiSuccess: boolean;
  setPutApiSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApiContext = createContext<ApiContextProps>({
  isPutApiSuccess: false,
  setPutApiSuccess: () => {},
}); 


const ApiProvider = ({children}:any) => { 
  const [isPutApiSuccess, setPutApiSuccess] = useState<boolean>(false);
  return (
    <ApiContext.Provider value={{ isPutApiSuccess, setPutApiSuccess }}>
      {children}
    </ApiContext.Provider>

  )
}

export default ApiProvider  


interface PostApiContextProps {
  isPostApiSuccess: boolean;
  setPostApiSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostApiContext = createContext<PostApiContextProps>({
  isPostApiSuccess: false,
  setPostApiSuccess: () => {},
}); 



export const PostApiProvider = ({children}:any) => { 
  const [isPostApiSuccess, setPostApiSuccess] = useState<boolean>(false);
  return (
    <PostApiContext.Provider value={{ isPostApiSuccess, setPostApiSuccess }}>
      {children}
    </PostApiContext.Provider>
  )
}  







