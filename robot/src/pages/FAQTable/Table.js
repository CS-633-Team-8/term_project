import React, { Component } from 'react';
import FullContentWrapper from '../../components/FullContentWrapper'
import PageTitle from '../../components/PageTitle';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head } from './table-config';
import Button from '@atlaskit/button';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import AddFAQForm from './AddFAQForm';
import AddFAQMessage from './AddFAQMessage';
import Loading from '../../components/Loading';
import InlineTextEdit from '../../components/InlineTextEdit';
import Tooltip from '@atlaskit/tooltip';
import Banner from '@atlaskit/banner';
import WarningIcon from '@atlaskit/icon/glyph/warning';


import { API_PATH } from "../../constants";

let apiPath = `${API_PATH}/faqs`

if (process.env.NODE_ENV !== 'production') {
  apiPath = 'http://localhost:5000/faqs'
}

const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;

const WarningBanner = ({ isOpen,  message}) => (
  <Banner icon={Icon} isOpen={isOpen} appearance="warning">
    {message}
  </Banner>
);

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}

function Table(props) {
  const { user } = props;
  console.log("Netlify user: ",user)
  return (
    <div>
    <FullContentWrapper>
      <PageTitle>Harold faqs</PageTitle>
      <Button onClick={function(e) {props.openAddModal()}} appearance='primary'>Add Answer</Button>
      {props.error ? <WarningBanner isOpen message="Problem retrieving FAQs from server, check your connection. If problem persists, please open issue in repo."/> : null}
      <DynamicTable
        caption={props.caption}
        head={props.head}
        rows={props.rows}
        rowsPerPage={10}
        defaultPage={1}
        loadingSpinnerSize="large"
        isLoading={false}
        //isFixedSize
        defaultSortKey="term"
        defaultSortOrder="ASC"
        onSort={() => console.log('onSort')}
        onSetPage={() => console.log('onSetPage')}
      />
    </FullContentWrapper>
    <ModalTransition>
      {props.isModalOpen && (
        <ModalDialog heading="Add a new FAQ">
          <AddFAQMessage />
          <AddFAQForm addItem={props.addEntry} onClose={function(e) {props.closeAddModal()}}/>
          <ModalFooter />
      </ModalDialog>
          
          )}
    </ModalTransition>
    </div>
  );
}

export default class TablePage extends Component {
  constructor(props) {
    super(props);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this._addEntry = this._addEntry.bind(this);
    this._deleteEntry = this._deleteEntry.bind(this);
    this._editEntry = this._editEntry.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      isModalOpen: false,
      updatingOnServer: {updating: false, finished: false, error: false},
    };
  }

  openAddModal() {
    console.log("Open Fired")
    this.setState({isModalOpen: true})
  }

  closeAddModal() {
    console.log("Close Fired")
    this.setState({isModalOpen: false})
  }

  _deleteEntry(index){
    if (window.confirm("Do you really want to delete this FAQ?")) { 
      const oldArray = this.state.items;
      oldArray.splice(index,1);
      // send json to server
      this.setState({items: oldArray});
      this.updateFAQOnServer(oldArray);
    } 
  }

  _addEntry(value){
    console.log(value);
    const oldArray = this.state.items;
    const data = {field1: value.question, field2: value.answer}
    oldArray.unshift(data);
    this.setState({items: oldArray});
    this.updateFAQOnServer(oldArray);
  }

  _editEntry(index, cell, value){
    console.log(index, cell, value)
    const oldArray = this.state.items;
    const data = oldArray[index]
    if (cell === 1){
      data.field1 = value
    } 
    else if (cell === 2) {
      data.field2 = value
    }
    oldArray[index] = data;
    this.setState({items: oldArray});
    this.updateFAQOnServer(oldArray);
  }

  updateFAQOnServer(data){
    this.setState({updatingOnServer: {updating: true, finished: false, error: false}})
    fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'secretID': 'ilovecs633' },
      body: JSON.stringify(data),
    })
    .then(
      (result) => {
        this.setState({updatingOnServer: {updating: false, finished: result, error: false}});
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({updatingOnServer: {updating: false, finished: true, error: error}});
      }
    )
  }

  componentDidMount() {
    fetch(apiPath, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'secretID': 'ilovecs633' },
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        console.log("Error from Table Fetch: ", error);
      }
    )
  }

  render() {

    const isLoaded = this.state.isLoaded;
    const isModalOpen = this.state.isModalOpen;
    const error = this.state.error;
    let content;

    if (isLoaded) {
      const rows = this.state.items.map((question, index) => ({
        key: `row-${index}-${question.field1}`,
        cells: [
          {
            key: createKey(question.field1),
            content: <Tooltip content="Click to Edit"><InlineTextEdit index={index} cell={1} onConfirm={this._editEntry} value={question.field1}/></Tooltip>
          },
          {
            key: createKey(question.field2),
            content: <Tooltip content="Click to Edit"><InlineTextEdit index={index} cell={2} onConfirm={this._editEntry} value={question.field2}/></Tooltip>
          },
          { key: Date.now(),
            content: <Button appearance='danger' onClick={(e) => this._deleteEntry(index)}>Delete</Button>
          },
        ]
      }));
      content = <Table error={error} rows={rows} caption={caption} head={head} openAddModal={this.openAddModal} closeAddModal={this.closeAddModal} isModalOpen={isModalOpen} addEntry={this._addEntry}/>
    } else {
      content = (
        <div>
        <Loading size='xlarge'/>
        </div>
      );
    }
    
    
    return (
      <div>{content}</div>
    );
  }
}