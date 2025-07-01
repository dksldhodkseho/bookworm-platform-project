
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Subscribe from "./pages/Subscribe";
import WriterRequest from "./pages/WriterRequest";
import WriterManage from "./pages/WriterManage";
import WriteBook from "./pages/WriteBook";
import PublishRequest from "./pages/PublishRequest";
import DeleteBook from "./pages/DeleteBook";
import SubscriptionManage from "./pages/SubscriptionManage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/writer-request" element={<WriterRequest />} />
          <Route path="/writer-manage" element={<WriterManage />} />
          <Route path="/write-book" element={<WriteBook />} />
          <Route path="/publish-request" element={<PublishRequest />} />
          <Route path="/delete-book" element={<DeleteBook />} />
          <Route path="/subscription-manage" element={<SubscriptionManage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
