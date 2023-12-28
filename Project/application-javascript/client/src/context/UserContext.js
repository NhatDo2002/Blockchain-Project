import { useState, useContext, createContext } from 'react'

const UserContext = createContext();

const UserProvider = ({ children }) => {
     // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
  
  // Login updates the user data with a name parameter
  const login = (user) => {
    setUser(user);
  };

  // Logout updates the user data to default
  const logout = () => {
    sessionStorage.removeItem('user')
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
    const context = useContext(UserContext)
    if(typeof context === "undefined"){
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context
}

export { useUserContext, UserProvider }