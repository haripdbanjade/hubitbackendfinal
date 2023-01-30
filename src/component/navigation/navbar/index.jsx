import React from "react";

import Topnav from "../topnav/Topnav";
function Index({ setmenuActive, menuActive,course,setCourse }) {
  // const [menuActive, setmenuActive] = useState(false);
  return (
    <div>
      <Topnav setmenuActive={setmenuActive} menuActive={menuActive}
        course={course} setCourse={setCourse} />
      {/* <Sidenav /> */}
    </div>
  );
}

export default Index;
