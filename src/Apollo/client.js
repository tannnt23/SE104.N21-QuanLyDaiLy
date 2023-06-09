import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api-quan-ly-dai-ly-nhom-22.herokuapp.com/',
    cache: new InMemoryCache(),
});

export default client
