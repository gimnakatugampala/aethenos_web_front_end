import React, { useState } from 'react'
import './Annoucements.css'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Card } from "antd";
import MaterialTable from 'material-table';
import Dropdown from 'react-bootstrap/Dropdown';
import RichTextEditor from "../../../components/RichTextEditor";
import Typography from "@mui/material/Typography";



const Annoucements = () => {

  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const buttonStyle = {
    marginLeft: 'end',
  };
  const [isComposeVisible, setComposeVisible] = useState(false);

  const toggleCompose = () => {
    setComposeVisible(!isComposeVisible);
  };
  return (
    <>
    <div className='row'>
        <div className='col-md-3'>
            <Typography className="mb-4" variant="h4" gutterBottom>
            Annoucements
            </Typography>
        </div>

        <div className='col-md-2'>
    
          <Dropdown>
            <Dropdown.Toggle className='fw-bold' variant="Secondary" id="dropdown-basic">
              The Roman  Republic
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">The Roman  Republic</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Last 12 months</Dropdown.Item>
              <Dropdown.Item href="#/action-3">All Courses</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
      
    </div>
   
   
    <Card>
      
{/*    
    <br></br> */}

    {/* <div class="mb-3 d-flex justify-content-between">
    <p className="fs-6">minutes consumed by active students</p>
    <div className="text-end">
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            Last 12 months
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Last 30 days</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Last 12 months</Dropdown.Item>
                <Dropdown.Item href="#/action-3">All Courses</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
</div> */}

<div>
      <Button className='float-end' onClick={toggleCompose}>
        Compose
      </Button>
      <p className='float-end fw-bold m-lg-3' >
        2 of 2 left tthis month
      </p>
      {isComposeVisible && (
        <div>
          <div>
            <h4>Content</h4>
            <textarea className='col-12 col-lg-12 mb-3' placeholder='Announcement and email title (55 character max)'></textarea>
            <RichTextEditor />
            <div className='mt-3 mb-3 d-inline-flex'>
              <Button>Preview in course</Button>
              <Button>Send me email preview</Button>
            </div>
            <br></br>
            <Button className='mb-3'>Send</Button>
          </div>
        </div>
      )}
    </div>


<Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab
        eventKey="home"
        title={
          <div className="tab-title">
            <div>Educational announcement</div>
          </div>
        }
      >
    

<Card>

<p>
Support your students' learning by sending up to four educational announcements a
      month. <br/> Your students get these announcements both by email and within their
      Udemy accounts.<br/> <a className='blue'>Learn
more</a> 
</p>

<MaterialTable
      title=""
      columns={[
        { title: 'Announcement', field: 'Announcement' },
        { title: 'Created', field: 'Created' },
        { title: 'Open Rate', field: 'OpenRate' },
        { title: 'CTR', field: 'CTR' },
        { title: 'Unsubscribe Rate', field: 'UnsubscribeRate' },
        
      ]}
      data={[
        { Announcement: '', Created: '', OpenRate: '', CTR: '',UnsubscribeRate:''},
      ]}        
      options={{
        exportButton: true
      }}
    />

</Card>
      </Tab>
      <Tab
        eventKey="profile"
        title={
          <div className="tab-title">
            <div>Promotional emails</div>

         
          </div>
        }

      >
        <Card>
        <p>Promote your courses by sending up to two promotional emails a month. <a className='blue'>Learn
more</a> 
</p>
<MaterialTable
      title=""
      columns={[
        { title: 'Announcement', field: 'Announcement' },
        { title: 'Created', field: 'Created' },
        { title: 'Open Rate', field: 'OpenRate' },
        { title: 'CTR', field: 'CTR' },
        { title: 'Unsubscribe Rate', field: 'UnsubscribeRate' },
        
      ]}
      data={[
        { Announcement: '', Created: '', OpenRate: '', CTR: '',UnsubscribeRate:''},
      ]}        
      options={{
        exportButton: true
      }}
    />
        </Card>
      </Tab>

     
      
    
    </Tabs>
 


</Card>
</>
  )
}

export default Annoucements