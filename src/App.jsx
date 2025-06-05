import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import BodyConstitutionList from "./features/constitution/BodyConstitutionList";
import BodyConstitutionDetail from "./features/constitution/BodyConstitutionDetail";
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
            <Route index element={<BodyConstitutionList />} />
            <Route path=":slug" element={<BodyConstitutionDetail />} />
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
