import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./About.css";

const About = () => {
  const linkStyle = {
    padding: "10px 20px",
    marginRight: "10px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderRadius: "5px",
    backgroundColor: "#f8f9fa",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    display: "inline-block",
  };

  const activeStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    borderColor: "#007bff", // now this is safe since border is not shorthand
  };
  //---------------------------------- USING INLINE STYLES -------------------------------------
  return (
    <div style={{ padding: "20px", marginTop: "-40px" }}>
      <h2 style={{ marginBottom: "20px" }}>About Us</h2>
      <div>
        <NavLink
          to="team"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Team
        </NavLink>

        <NavLink
          to="mission"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Mission
        </NavLink>
      </div>
      {/* <div>
          <Link
            to="team"
           
          >
            Team
          </Link>

          <Link
            to="mission"
           
          >
            Mission
          </Link>
        </div> */}
      <Outlet />
    </div>
  );
  //------------------------------------ USING CLASSNAME ----------------------------------------
  /* return (
        <div className="about-container">
            <h2 className="about-title">About Us</h2>

            <div className="nav-links">
                <NavLink
                    to="team"
                    className={({ isActive }) =>
                        isActive ? 'link-btn active-link' : 'link-btn'
                    }
                >
                    Team
                </NavLink>

                <NavLink
                    to="mission"
                    className={({ isActive }) =>
                        isActive ? 'link-btn active-link' : 'link-btn'
                    }
                >
                    Mission
                </NavLink>
            </div>
            <Outlet />
        </div>
    ); */
  //--------------------------------------------------------------------------------
};

export default About;
/*
NavLink and isActive
1. What is NavLink?
NavLink is a component from react-router-dom used to navigate between routes. It can automatically identify whether its link is currently active.
import { NavLink } from "react-router-dom";

<NavLink to="team">Team</NavLink>


2. What is isActive?
isActive is a boolean value provided by React Router. It indicates whether the current URL matches the link's route.
- true → The link is active.
- false → The link is inactive.
3. Understanding your code
<NavLink
  to="team"
  style={({ isActive }) =>
    isActive
      ? { ...linkStyle, ...activeStyle }
      : linkStyle
  }
>
  Team
</NavLink>


Code	                            Meaning

to="team"	                        Navigates to the team route relative to the current route.
({ isActive })	                    Extracts isActive from the style callback argument.
isActive ? ... : ...	            Applies different styles depending on whether the link is active.
{ ...linkStyle, ...activeStyle }	Combines both style objects; properties in activeStyle override matching properties in linkStyle.

Example:
const linkStyle = { color: "black" };
const activeStyle = {
  color: "blue",
  fontWeight: "bold"
};


When the Team link is active, its text becomes blue and bold. Otherwise, 
it uses the normal black text style.
Remember: NavLink provides isActive automatically, so you don't need to 
manage the active state yourself.
*/
