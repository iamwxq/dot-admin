import React from "react";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";

const NotificationContext = React.createContext<NotificationInstance | null>(null);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  return React.useContext(NotificationContext) as NotificationInstance;
}
