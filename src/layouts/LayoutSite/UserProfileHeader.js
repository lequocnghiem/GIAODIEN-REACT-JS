import Swal from "sweetalert2";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

function UserProfileHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  return (
    <div className="dropdown-menu dropdown-menu-right">
      <div className="dropdown-user-details">
        {user ? (
          <>
            <div className="order-history">
              <a href="/orders" className="order-history-link">
                Order History
              </a>
            </div>
            <div className="user-profile-icon">
              {/* Insert user profile icon or avatar */}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserProfileHeader;
