import React, { useEffect } from "react";

const UserProfile = () => {
  const useParams = "";
  const id = useParams();
  const fetchUser = async () => {
    await fetch(`api/users/${id}/posts`);
  };

  useEffect(() => {
    fetchUser();
  });
  return <div></div>;
};

export default UserProfile;
