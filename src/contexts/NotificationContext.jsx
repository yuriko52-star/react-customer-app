import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}

      {/* {notification && <div className="toast">{notification}</div>} */}
    </NotificationContext.Provider>
  );
}
