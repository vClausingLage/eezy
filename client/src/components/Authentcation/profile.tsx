import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {user && isAuthenticated && (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )}
    </>
  );
};

export default Profile;
