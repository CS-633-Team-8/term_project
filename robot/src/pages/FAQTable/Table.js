import React, { Component } from 'react';
import FullContentWrapper from '../../components/FullContentWrapper'
import PageTitle from '../../components/PageTitle';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head } from './table-config';
import Button from '@atlaskit/button';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import styled from 'styled-components';
import { gridSize, fontSize } from '@atlaskit/theme';
import AddFAQForm from './AddFAQForm';
import AddFAQMessage from './AddFAQMessage';
import Loading from '../../components/Loading';
import InlineTextEdit from '../../components/InlineTextEdit';


import { API_PATH } from "../../constants";

let apiPath = `${API_PATH}/faqs`

if (process.env.NODE_ENV !== 'production') {
  apiPath = 'http://localhost:5000/faqs'
}

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
    if (cell == 1){
      data.field1 = value
    } 
    else if (cell == 2) {
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
      }
    )
  }

  render() {

    const isLoaded = this.state.isLoaded;
    const isModalOpen = this.state.isModalOpen;
    let content;

    if (isLoaded) {
      const rows = this.state.items.map((question, index) => ({
        key: `row-${index}-${question.field1}`,
        cells: [
          {
            key: createKey(question.field1),
            content: <InlineTextEdit index={index} cell={1} onConfirm={this._editEntry} value={question.field1}/>
          },
          {
            key: createKey(question.field2),
            content: <InlineTextEdit index={index} cell={2} onConfirm={this._editEntry} value={question.field2}/>
          },
          { key: Date.now(),
            content: <Button appearance='danger' onClick={(e) => this._deleteEntry(index)}>Delete</Button>
          },
        ]
      }));
      content = <Table rows={rows} caption={caption} head={head} openAddModal={this.openAddModal} closeAddModal={this.closeAddModal} isModalOpen={isModalOpen} addEntry={this._addEntry}/>
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

const mocItems = [
  {
    field1: 'some attributes of solid requirements',
    field2: 'Unambiguous | Non-overlapping | Complete | Testable | Clearly stated | Consistent | Correct | Modifiable | Prioritized | Traceable & Traced |Uniquely identified | Design-Free'
  },
  {
    field1: 'the latest version of the iPhone',
    field2: 'The latest version is iPhone 11, running on iOS 13.1'
  },
  {
    field1: 'how AI works',
    field2: 'AI works by combining large amounts of data with fast, iterative processing and intelligent algorithms, allowing the software to learn automatically from patterns or features in the data.'
  },
  {
    field1: 'how is Mark Zuckerberg so rich and famous',
    field2: 'He invented Facebook and is wicked smart, also he had some good luck and priveledge.'
  },
  { field1: 'if Google is evil', field2: 'I think it probably is.' },
  {
    field1: 'what BitCoin Is',
    field2: 'Bitcoin is a cryptocurrency. It is a decentralized digital currency without a central bank or single administrator that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.'
  },
  {
    field1: 'what a wireframe is',
    field2: 'A wireframe, also known as a page schematic or screen blueprint, is a visual guide that represents the skeletal framework of a website or application.'
  },
  { field1: 'how much of the grade the final is worth', field2: '30%' },
  {
    field1: 'what a definition of done is',
    field2: 'A list of criteria which must be met before a product increment “often a user story” is considered “done”.'
  },
  {
    field1: 'what a peer review is',
    field2: 'Peer reviews are a formal examination of work products by peers to identify defects.'
  },
  {
    field1: 'what agile is',
    field2: 'Agile software development is an umbrella term for a set of frameworks and practices based on the values and principles expressed in the Manifesto for Agile Software Development and the 12 Principles behind it.'
  },
  {
    field1: 'what personnas are',
    field2: 'It is prudent to start the requirements process with documenting the so-called personas (users, actors, roles).  Assuming each persona has a different set of needs, we are aiming to assemble a complete list of product requirements.'
  },
  {
    field1: 'what continuous delivery is',
    field2: 'With continuous delivery, each code commit is automatically tested at the time it is added. After passing the automated tests, the code changes are sent to a staging environment for deployment.'
  },
  {
    field1: 'what git is',
    field2: 'Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.'
  },
  {
    field1: 'who our professor is',
    field2: 'Prof Alex Elentukh, my friend and teacher.'
  },
  {
    field1: 'how much of the grade the term project is worth',
    field2: '30%'
  },
  {
    field1: 'my name',
    field2: 'It Harold and I am a very smart elephant who specializes in Computer Science.'
  },
  {
    field1: 'what books are recommended for the course',
    field2: 'The Art of Software Testing - Glenford Myers,  Software Estimation: Demystifying the Black Art - Steve McConnell,  The Joy of UX - David Pratt,  Fundamentals of Information Systems Security - David Kim,  Continuous Delivery - Jezz Humble.'
  },
  {
    field1: 'what the course is about',
    field2: 'The course provides an in-depth examination of key software engineering techniques from the viewpoint of a program and process manager.'
  },
  {
    field1: 'what software engineering is',
    field2: 'A systematic approach to the development, operation, and retirement of software.'
  },
  {
    field1: 'what a Senior Manager is',
    field2: 'A management role at a high enough level in an organization that the primary  focus is the long-term vitality of the organization'
  },
  {
    field1: 'what Organizational Structure is',
    field2: 'A set of unwritten rules that most of the staff abides by.'
  },
  {
    field1: 'what Work Breakdown Structure is',
    field2: 'A deliverable-oriented grouping of project elements that organizes and defines the total work scope of the project.'
  },
  {
    field1: 'what WBS is',
    field2: 'Work Breakdown Structure - A deliverable-oriented grouping of project elements that organizes and defines the total work scope of the project.'
  },
  {
    field1: 'what a Change Control Board is',
    field2: 'A formally constituted group of stakeholders responsible for approving or rejecting changes to project baselines or any other configuration item.'
  },
  {
    field1: 'what CCB is',
    field2: 'Change Control Board - A formally constituted group of stakeholders responsible for approving or rejecting changes to project baselines or any other configuration item.'
  },
  {
    field1: 'what Software Inspections are',
    field2: 'Formal examination of work products by peers to identify defects.'
  },
  {
    field1: 'what Software Configuration Management is',
    field2: "The purpose of SCM is to establish and maintain the integrity of the products of the software project throughout the project's life cycle. This discipline is comprised of Identification, Controlling, Auditing, and Reporting."
  },
  {
    field1: 'what SCM is',
    field2: 'Software Contiguration Management.'
  },
  {
    field1: 'what Baseline Audit is',
    field2: 'Verification of baseline Integrity.'
  },
  {
    field1: 'what DynamicTtesting is',
    field2: 'Process of executing a program with the intent of finding errors.'
  },
  {
    field1: 'what a Sprint is',
    field2: 'A sprint is a short, time-boxed period when a scrum team works to complete a set amount of work.'
  },
  {
    field1: 'what a Epic is',
    field2: 'An epic is a large user story that cannot be delivered as defined within a single iteration or is large enough that it can be split into smaller user stories.'
  },
  {
    field1: 'what Canonical Form is',
    field2: 'A language construct that many in the Agile community use to document their requirements (aka, user stories). This includes the role (aka, persona or actor) you are playing, your action, and the business benefit.'
  },
  {
    field1: 'what SAFE is',
    field2: 'Scaled Agile Framework is a knowledge base of proven, integrated principles, practices, and competencies for achieving business agility using Lean, Agile, and DevOps.'
  },
  { field1: 'what a MVP is', field2: 'A Minimum Viable Product.' },
  {
    field1: 'what a minimum viable product is',
    field2: 'A minimum viable product (MVP) is a version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort.'
  },
  {
    field1: 'what a swim lane is',
    field2: 'A Swim Lane is used in process flow diagrams, or flowcharts, that visually distinguishes job sharing and responsibilities for sub-processes of a business process.'
  },
  {
    field1: 'what low coupling is',
    field2: "The concept that software components should be able to run independently and not hinder each other's operation."
  },
  {
    field1: 'what high cohesion is',
    field2: 'Cohesion often refers to how the elements of a module belong together. Related code should be close to each other to make it highly cohesive.'
  },
  {
    field1: 'what UML is',
    field2: 'It is the Unified Modeling Language.'
  },
  {
    field1: 'what Unified Modeling Language is',
    field2: 'UML is a common language for business analysts, software architects and developers used to describe, specify, design, and document existing or new business processes, structure and behavior of artifacts of software systems.'
  },
  {
    field1: 'what Malware is',
    field2: 'Malware is the collective name for a number of malicious software variants, including viruses, ransomware and spyware.'
  },
  {
    field1: 'what a Virus is',
    field2: 'In computer terms, a virus is attached to a host, it replicates and renders important data useless.'
  },
  {
    field1: 'what a Worm is',
    field2: "In computer terms, a worm is self-contained, doesn't need a host to replicate and slows computer."
  },
  {
    field1: 'what ransomware is',
    field2: 'In computer terms, ransomware blocks access to your computer until a ransom is paid.'
  },
  {
    field1: 'which is the best internet internet provider',
    field2: 'I think its Google Fiber'
  }
]