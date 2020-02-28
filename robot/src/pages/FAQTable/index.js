import React from "react"
import Table from './Table';
import {withRouter} from 'react-router';
import Button, { ButtonGroup } from '@atlaskit/button';
import styled from 'styled-components';
import AuthContext from '../../modules/Context/auth-context';

class FAQTable extends React.Component {

static contextType = AuthContext

  logout = () => {
    this.context.logout();
    this.props.history.push('/');
  };

  render(){
    const authenticated = this.context.isAuthenticated();
    let content;

    if(authenticated){
      const {name} = this.context.getProfile();
      console.log(name)
      content = <Table user={name} logout={this.logout.bind(this)}/>
    } else {
      content = <BasicLogin login={this.context.login}/>
    }

    return (
      <div>
        {content}
      </div>
      )

  }
}

function BasicLogin(props){
  return(
    <div>
        <Container>
          <h3>You are trying to view a protected page. Please log in</h3>
          <ButtonGroup appearance="primary">
            <Button onClick={props.login} appearance="primary">
              Log In
            </Button>
          </ButtonGroup>
        </Container>
      </div>
  );
}

const Container = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
`;

export default withRouter(FAQTable);