import { MessageProvider } from "@/contexts/message";
import { NotificationProvider } from "@/contexts/notification";

import Home from "@/pages/Home";

function App() {
  return (
    <MessageProvider>
      <NotificationProvider>
        <Home />
      </NotificationProvider>
    </MessageProvider>
  );
}

export default App;
