import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Team from "./Team";
import Mission from "./Mission";
import Services from "./Services";
import WebDev from "./WebDev";
import Mobile from "./Mobile";
import Contact from "./Contact";
import NotFound from "./NotFound";
//npm install react-router-dom

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* About with nested routes */}
          <Route path="about" element={<About />}>
            <Route index element={<Navigate to="team" replace />} />{" "}
            {/* Redirect to /about/team */}
            <Route path="team" element={<Team />} />
            <Route path="mission" element={<Mission />} />
          </Route>

          {/* Services with nested routes */}
          <Route path="services" element={<Services />}>
            {/* <Route index element={<Navigate to="mobile" replace />} />  */}
            {/* Default redirect */}
            <Route path="webdev" element={<WebDev />} />
            <Route path="mobile" element={<Mobile />} />
          </Route>

          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
/*
Navigate and replace
1. Navigate
Navigate is a component from react-router-dom used to redirect the user from one route to another programmatically.
<Navigate to="team" />


Here, the user is redirected to the team route.
2. replace
The replace prop replaces the current entry in the browser's history instead of adding a new entry.
- replace → Replaces the current history entry.
- Without replace → Adds a new history entry.
3. Understanding your code
<Route
  index
  element={<Navigate to="team" replace />}
/>


When the user visits /about:
1. The index route matches.
2. <Navigate> redirects the user to /about/team.
3. replace replaces the /about history entry, so pressing Back does not return to that same redirecting entry.
Remember:
- to specifies the destination.
- replace controls how the redirect affects browser history.

Suppose the user visits /about and gets redirected to /about/team.
- With replace: The /about history entry is replaced by /about/team.
- Without replace: /about/team is added as a new history entry, keeping /about in history.
Important: Without replace, pressing the Back button may return to /about, trigger the redirect again, and send the user back to /about/team.
Remember: replace replaces history; without it, navigation pushes a new history entry.
*/
