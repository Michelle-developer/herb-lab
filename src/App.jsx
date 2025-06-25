import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Homepage from "./features/homepage/Homepage";
import ConstitutionList from "./features/constitution/ConstitutionList";
import ConstitutionDetail from "./features/constitution/ConstitutionDetail";
import HerbList from "./features/herb/HerbList";
import HerbDetail from "./features/herb/HerbDetail";
import PageNotFound from "./pages/PageNotFound";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="constitutions">
            <Route index element={<ConstitutionList />} />
            <Route path=":slug" element={<ConstitutionDetail />} />
          </Route>

          <Route path="herbs">
            <Route index element={<HerbList />} />
            <Route path=":slug" element={<HerbDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
