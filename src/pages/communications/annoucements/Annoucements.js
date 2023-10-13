import React, { useState } from 'react'
import './Annoucements.css'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Card } from "antd";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



import MaterialTable from 'material-table';
import Dropdown from 'react-bootstrap/Dropdown';
import RichTextEditor from "../../../components/RichTextEditor";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



const Annoucements = () => {

  const [isComposeVisible, setComposeVisible] = useState(false);

  const toggleCompose = () => {
    setComposeVisible(!isComposeVisible);
  };
  return (
    <div className='container'>
     <div className="row my-2">
        <div className="col-md-4">
             <Typography variant="h4" gutterBottom>
              Announcements
            </Typography>
        </div>

        <div className="col-md-2">

        <FormControl fullWidth>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>C6 Photoshop</option>
          <option value={20}>Learn Photshop</option>
          <option value={30}>Software Evelopment</option>
        </NativeSelect>
      </FormControl>

        </div>

      </div>
   
   
    <Card>
      

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
     {/* Education Announcement */}
      <>

      <div>

        <div className='d-flex align-items-center my-3'>
        <p className='float-end m-lg-3' >
            <i className='mx-1'><b> 2 of 2 </b></i> left this month
        </p>

        {isComposeVisible ? (
          <Button size="sm" variant="outline-danger" className='float-end' onClick={toggleCompose}>
         <i class="fa-solid fa-xmark"></i> Cancel
        </Button>
        ) :(
            <Button size="sm" variant="danger" className='float-end' onClick={toggleCompose}>
             <i class="fa-solid fa-plus"></i>  Compose
            </Button>
        )}
            
        </div>

            {isComposeVisible && (
              <div>
                <div>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Content</Form.Label>
                      <Form.Control type="text" placeholder="Announcement and email title (55 character max)" />
                    </Form.Group>

                  <RichTextEditor />
                  <br></br>
                  <Button variant="danger" className='mb-3'><i class="fa-regular fa-paper-plane"></i> Send</Button>
                </div>
              </div>
            )}
          </div>

          {!isComposeVisible && (
                <p>
                Support your students' learning by sending up to four educational announcements a
                      month. <br/> Your students get these announcements both by email and within their
                      Aethenos accounts.
                </p>
          )}

      <MaterialTable
            title=""
            columns={[
              { title: 'Announcement Title', field: 'title' },
              { title: 'Announcement Content', field: 'content' },
              { title: 'Created Date', field: 'date' },
              
            ]}
            data={[
              { title: 'New Course Update', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....", date: '2023-10-13'},
              { title: 'New Course Update', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....", date: '2023-10-13'},
            ]}        
            options={{
              exportButton: true
            }}
          />

      </>

      </Tab>
      <Tab
        eventKey="profile"
        title={
          <div className="tab-title">
            <div>Promotional emails</div>
          </div>
        }>

<div>

<div className='d-flex align-items-center my-3'>
<p className='float-end m-lg-3' >
    <i className='mx-1'><b> 1 of 2 </b></i> left this month
</p>

{isComposeVisible ? (
  <Button size="sm" variant="outline-danger" className='float-end' onClick={toggleCompose}>
 <i class="fa-solid fa-xmark"></i> Cancel
</Button>
) :(
    <Button size="sm" variant="danger" className='float-end' onClick={toggleCompose}>
     <i class="fa-solid fa-plus"></i>  Compose
    </Button>
)}
    
</div>

    {isComposeVisible && (
      <div>
        <div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Announcement and email title (55 character max)" />
            </Form.Group>

          <RichTextEditor />
          <br></br>
          <Button variant="danger" className='mb-3'><i class="fa-regular fa-paper-plane"></i> Send</Button>
        </div>
      </div>
    )}
  </div>

        <Card className='py-2'>
        <p>Promote your courses by sending up to two promotional emails a month.</p>
        <MaterialTable
            title=""
            columns={[
              { title: 'Announcement Title', field: 'title' },
              { title: 'Announcement Content', field: 'content' },
              { title: 'Created Date', field: 'date' },
              
            ]}
            data={[
              { title: 'New Course Update', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged....", date: '2023-10-13'}
            ]}        
            options={{
              exportButton: true
            }}
          />
        </Card>
      </Tab>

     
      
    
    </Tabs>
 


</Card>
</div>
  )
}

export default Annoucements