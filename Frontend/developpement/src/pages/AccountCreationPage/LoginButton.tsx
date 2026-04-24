import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  // function trigger () {
     const { data, isLoading, error } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/projects");

      return await response.json();
    },
  });

  console.log(data);

  if (isLoading) {return <p>Chargement...</p>}
  if (error) {return <p>{error.message}</p>} 
  // }


  // const {
  //   data: countries,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       "https://restcountries.com/v3.1/all?fields=name,flags,population,region",
  //     );
  return (
    // <button onClick={() => loginWithRedirect()} className="button login">
    <button className="button login">
      Log In
    </button>
  );
};

export default LoginButton;
