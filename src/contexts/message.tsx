import React from "react";
import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";

const MessageContext = React.createContext<MessageInstance | null>(null);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function MessageProvider({ children }: NotificationProviderProps) {
  const [api, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={api}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export function useMessage() {
  return React.useContext(MessageContext) as MessageInstance;
}
