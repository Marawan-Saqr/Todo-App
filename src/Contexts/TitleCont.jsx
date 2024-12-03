import { useState, createContext } from 'react';

const titleName = createContext();
const TitleContextProvider = ({children}) => {

  const [title, setTitle] = useState("");

  const changeTitle = (nameTitle) => {
    setTitle(nameTitle);
  }

  return (
    <titleName.Provider value={{title, changeTitle}}>
      {children}
    </titleName.Provider>
  )
}




export { titleName, TitleContextProvider };