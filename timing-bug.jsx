import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const TEST_QUERY = gql`
  query getUserDetails($userId: ID!) {
    user(id: $userId) {
      name
    }
  }
`;


const TestComponent = ({ match }) => {
  const [arbitaryState, setArbitaryState] = useState(null);
  const userId = match.params.userId;

  return (
    <Query query={TEST_QUERY} variables={{ userId }}>
      {({ loading, data, error }) => {
          console.log('Rerender of Query occured: ', { loading, data, error });
        return (<div>
            {loading && <div id="loading">Loading</div>}
            {error && <div id="error">error: {JSON.stringify(error)}</div>}
            <div id="data">data: {JSON.stringify(data)}</div>
        </div>);
      }}
    </Query>
  );
};

export default TestComponent;
