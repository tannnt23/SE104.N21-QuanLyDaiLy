import { useQuery, gql } from '@apollo/client';
import { queryEveryDaily } from '../../graphql/queries';

const DangKyDaiLy = () => {
  const { loading, error, data } = useQuery(queryEveryDaily);
  console.log(data)
  if (loading) {
    // Display a loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle the error
    return <div>Error: {error.message}</div>;
  }

   // Access the retrieved data
   const { everyDaily } = data;

   // Access TenDaiLy for the first item in the array
   const firstDaily = everyDaily[0];
   const TenDaiLy = firstDaily.TenDaiLy;

  // Render the component with the retrieved data
  return (
    <div>
      <h1>TenDaiLy: {TenDaiLy}</h1>
    </div>
  );
};


export default DangKyDaiLy