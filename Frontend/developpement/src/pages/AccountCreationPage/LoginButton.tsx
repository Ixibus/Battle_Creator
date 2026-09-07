import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;


const LoginButton = () => {

  // function trigger () {
     const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users`);

      return await response.json();
    },
  });

  
  if (isLoading) {return <p>Chargement...</p>}
  if (error) {return <p>{error.message}</p>} 
  
  return <p>{data.map((el: { email: any; }) => el.email)}</p>;
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
