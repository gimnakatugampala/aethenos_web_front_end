import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { Layout, Menu , Col, Row ,Button  ,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Card from '@mui/material/Card';
import ButtonMaterial from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DeleteRequirements, DeleteStudentLearns, DeleteWhos, GetIntendedLeaners } from '../../../../api';
import { AddIntendedLeaners } from '../../../../api';
import Typography from '@mui/material/Typography';
import ErrorAlert from '../../../../commonFunctions/Alerts/ErrorAlert';
import ButtonSpinner from '../../../../commonFunctions/loaders/Spinner/ButtonSpinner';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
    


  
  let getstudentsLearnLen;
  let getrequirementsLen;
  let getwhoDataLen;

const IntendedLearners = ({code}) => {

  const [studentsLearn, setstudentsLearn] = useState([])
  const [requirements, setrequirements] = useState([])
  const [whos, setwhos] = useState([])

  const [studentLearnExtra, setstudentLearnExtra] = useState([])
  const [requirementsExtra, setrequirementsExtra] = useState([])
  const [whosExtra, setwhosExtra] = useState([])



  const [loadingBtn, setloadingBtn] = useState(false)

const onFinish = (values) => {
  console.log('Received values of form:', values);
};

useEffect(() => {
 
  GetIntendedLeaners(code,setstudentsLearn,setrequirements,setwhos)

  getstudentsLearnLen =studentsLearn.length
  getrequirementsLen =requirements.length
  getwhoDataLen =whos.length

}, [code])

// ========================================
// Enter Data to Array - Students Learn
const handleInputChange = (index, value) => {
  const updatedValues = [...studentsLearn];
  updatedValues[index] = value;
  setstudentsLearn(updatedValues);
  console.log(value)
  console.log(index)
  console.log(studentsLearn.length)
  console.log(getstudentsLearnLen)
  console.log(updatedValues)

};

const handleInputChangeStudentLearnExtra = (index, value) => {
  const updatedValues = [...studentLearnExtra];
  updatedValues[index] = value;
  setstudentLearnExtra(updatedValues);
  // console.log(value)
  // console.log(index)
  // console.log(studentLearnExtra.length)
  // console.log(getstudentsLearnLen)
  // console.log(updatedValues)

};

// Remove Student Array Delete
const handleDeleteStudentLearnExtra = (item) => {
  console.log(item)
  console.log(code)

  DeleteStudentLearns(code,item,setstudentsLearn,setrequirements,setwhos)

}

// Remove Data to Array
const handleRemoveInput = (index) => {
  const updatedValues = [...studentsLearn];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setstudentsLearn(updatedValues);
};

// Remove Data From Extra Student Learn
const handleRemoveInputStudentLearnExtra = (index) => {
  const updatedValues = [...studentLearnExtra];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setstudentLearnExtra(updatedValues);
};

// ========================================


// ---------------------------------------------
// ========================================

// Enter Data to Array - Requirements
const handleRequirementInputChange = (index, value) => {
  const updatedValues = [...requirements];
  updatedValues[index] = value;
  setrequirements(updatedValues);
};

// Remove Data to Array - Requirements
const handleRequirementRemoveInput = (index) => {
  const updatedValues = [...requirements];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setrequirements(updatedValues);
};

// Add Extra Requirement
const handleInputChangeRequirementsExtra = (index,value) => {
  const updatedValues = [...requirementsExtra];
  updatedValues[index] = value;
  setrequirementsExtra(updatedValues);

};

// Remove Data From Extra Requirements
const handleRemoveInputRequirementsExtra = (index) => {
  const updatedValues = [...requirementsExtra];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setrequirementsExtra(updatedValues);
};


// Delete Requirements extra
const handleDeleteRequirementsExtra = (item) =>{

  // console.log(item)
  DeleteRequirements(code,item,setstudentsLearn,setrequirements,setwhos)


}


// ========================================
// ------------------------------------------------

// ===========================================
// Enter Data to Array - WHOS
const handleWhosInputChange = (index, value) => {
  const updatedValues = [...whos];
  updatedValues[index] = value;
  setwhos(updatedValues);
};

const handleInputChangeWhosExtra = (index, value) => {
  const updatedValues = [...whosExtra];
  updatedValues[index] = value;
  setwhosExtra(updatedValues);

};

const handleDeleteWhosExtra = (item) =>{
  DeleteWhos(code,item,setstudentsLearn,setrequirements,setwhos)
}

// Remove Data to Array - WHOS
const handleWhosRemoveInput = (index) => {
  const updatedValues = [...whos];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setwhos(updatedValues);
};

// Add Extra Whos
const handleInputChangeInputWhosExtra = (index,value) => {
  const updatedValues = [...whosExtra];
  updatedValues[index] = value;
  setwhosExtra(updatedValues);

};

// Remove Extra Whos
const handleRemoveInputWhosExtra = (index) => {
  const updatedValues = [...whosExtra];
  updatedValues.splice(index, 1); // Remove the input at the specified index
  setwhosExtra(updatedValues);
};



// ===========================================


const saveIntendedLeaners = (e) =>{

  e.preventDefault()

  // setloadingBtn(true)

  console.log(studentsLearn)
  // console.log(studentsLearnData)
  console.log("------")
  console.log(requirements)
  // console.log(requirementsData)
  console.log("------")
  console.log(whos)
  // console.log(whosData)

  // ist 3 values complusory
  if(studentsLearn.length < 3){
    ErrorAlert("Empty Field!","Please at least 3 inputs in what will students learn")
    setloadingBtn(false)
    return
  }else if(studentsLearn.some(value => value == "")){
    // ErrorAlert("Empty Field!","Please at least fill forms in what will students learn")
    // return
    setloadingBtn(false)
    setstudentsLearn([])

  }else if(requirements.length < 3){
    ErrorAlert("Empty Field!","Please at least 3 inputs in requirements or prerequisites")
    setloadingBtn(false)
    return
  }else if(requirements.some(value => value == "")){
    // ErrorAlert("Empty Field!","Please at least fill forms in requirements or prerequisites")
    // return
    setloadingBtn(false)
    setrequirements([])
  }else if(whos.length < 1){
    ErrorAlert("Empty Field!","Please at least 1 input in Who is this course for")
    setloadingBtn(false)
    return
  }else if(whos.some(value => value == "")){
    // ErrorAlert("Empty Field!","Please at least fill forms in Who is this course for")
    // return
    setwhos([])
    setloadingBtn(false)
  }

  for (let i = studentsLearn.length - 1; i >= 0; i--) {
    if (studentsLearn[i] == undefined || studentsLearn[i] == "") {
      studentsLearn.splice(i, 1);
    }
  }

  for (let i = requirements.length - 1; i >= 0; i--) {
    if (requirements[i] === undefined || requirements[i] == "") {
      requirements.splice(i, 1);
    }
  }

  for (let i = whos.length - 1; i >= 0; i--) {
    if (whos[i] == undefined || whos[i] == "") {
      whos.splice(i, 1);
    }
  }


  const item = {
    course_code:code,
    studentsLearn:[...studentsLearn,...studentLearnExtra],
    requirements:[...requirements,...requirementsExtra],
    who:[...whos,...whosExtra]
  }

  AddIntendedLeaners(item,code,setloadingBtn,setstudentsLearn,setrequirements,setwhos)

  console.log(studentsLearn)
  console.log(requirements)
  console.log(whos)

  console.log(item)

}


  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2 p-4"> 

    <div className='d-flex justify-content-between'>

      <Typography className='my-2' variant="h4" >
          Target Audience
      </Typography>
      {loadingBtn ? <ButtonMaterial variant="contained"><ButtonSpinner /></ButtonMaterial> : <ButtonMaterial onClick={saveIntendedLeaners} variant="contained"><AddIcon /> SAVE</ButtonMaterial> }
      
      
    </div>


       <hr />

       <div className='managec-container'>


      <div className='section-1'>
          <div className='mt-1 mb-2'>
          <Typography variant="h6" ><b>What will be taught in your course ?</b></Typography>
          <p>Enter at least 3 learning objectives/outcomes.</p>
          </div>

      </div>


      {/* Form 1 */}
      <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div className="input-group mb-3">
            <input value={studentsLearn[0] != null ? studentsLearn[0] : ""} maxLength={160} onChange={(e) => handleInputChange(0,e.target.value)} type="text" className="form-control" placeholder="Example: Excel Basics" />
            {/* <span className="input-group-text" id="res-1">160</span> */}
          </div>


            {/* 2 */}
            <div className="input-group mb-3">
            <input value={studentsLearn[1] != null ? studentsLearn[1] : ""} maxLength={160} onChange={(e) => handleInputChange(1,e.target.value)} type="text" className="form-control" placeholder="Example: Excel Shortcuts" />
            {/* <span className="input-group-text" id="res-2">160</span> */}
          </div>

      

            {/* 3 */}
          <div className="input-group mb-3">
            <input value={studentsLearn[2] != null ? studentsLearn[2] : ""} maxLength={160} onChange={(e) => handleInputChange(2,e.target.value)} type="text" className="form-control" placeholder="Example: Budgeting in Excel" />
            {/* <span className="input-group-text" id="res-3">160</span> */}
          </div>

          {studentsLearn.length > 3 && (
            studentsLearn.slice(3).map((item,key) => (
            <div key={key} className="input-group mb-3">
            <input value={studentsLearn[key + 3]} maxLength={160} onChange={(e) => handleInputChange(key + 3,e.target.value)} type="text" className="form-control" placeholder="Example" />
            <span   onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteStudentLearnExtra(studentsLearn[key + 3])
                        }
                      });
                      }} className="input-group-text btn btn-danger text-white" id="res-3"> 
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                        />
                      </span>
            </div>
              
              ))
          )}



          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            // {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                       <div className="input-group">
                        <input onChange={(e) => {
                          handleInputChangeStudentLearnExtra(index,e.target.value)
                          }} maxLength={160} type="text" className="form-control" placeholder="Example" />
                        <span className="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name)
                            handleRemoveInputStudentLearnExtra(index)
                          }}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>

    {/* Section 2 */}
    <div className='section-2'>
    <div className='mt-4 mb-2'>
    <Typography variant="h6" ><b>What are the requirements/prerequisites for this course?</b></Typography>
      <p>Give details of any required experience, skills, equipment/tools that students should have prior to taking this course. Enter at least 3 requirements/prerequisites.</p>
      </div>

    </div>
       {/* Form 2 */}
       <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div className="input-group mb-3">
            <input value={requirements[0] != null ? requirements[0] : ""} maxLength={160} onChange={(e) => handleRequirementInputChange(0,e.target.value)} type="text" className="form-control" placeholder="Example: Excel Basics" />
            {/* <span className="input-group-text" id="res-1">{requirementsData[0] != null && 160 - requirementsData[0].length}</span> */}
          </div>


            {/* 2 */}
            <div className="input-group mb-3">
            <input value={requirements[1] != null ? requirements[1] : ""} maxLength={160} onChange={(e) => handleRequirementInputChange(1,e.target.value)} type="text" className="form-control" placeholder="Example: Basic Accounting" />
            {/* <span className="input-group-text" id="res-2">{requirementsData[1] != null ? 160 - requirementsData[1].length :}</span> */}
          </div>

      

            {/* 3 */}
            <div className="input-group mb-3">
            <input value={requirements[2] != null ? requirements[2] : ""} maxLength={160} onChange={(e) => handleRequirementInputChange(2,e.target.value)} type="text" className="form-control" placeholder="Example: Basic Mathematics" />
            {/* <span className="input-group-text" id="res-3">{requirementsData[2] != null && 160 - requirementsData[2].length}</span> */}
          </div>

          {requirements.length > 3 && (
            requirements.slice(3).map((item,key) => (
            <div key={key} className="input-group mb-3">
            <input value={requirements[key + 3]} maxLength={160} onChange={(e) => handleRequirementInputChange(key + 3,e.target.value)} type="text" className="form-control" placeholder="Example: Identity and Manage project risks" />
            <span onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                              if (result.isConfirmed) {
                            
                                handleDeleteRequirementsExtra(requirements[key + 3])
                              }
                            });
                          }}
                         className="input-group-text btn btn-danger text-white" id="res-3"> 
                        <MinusCircleOutlined
                          className="dynamic-delete-button" />
                      </span>
            </div>
              
              ))
          )}

        
     

          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>

                       <div className="input-group">
                        <input onChange={(e) => handleInputChangeRequirementsExtra(index,e.target.value)} maxLength={160} type="text" className="form-control" placeholder="Example" />
                        <span className="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            handleRemoveInputRequirementsExtra(index)
                            remove(field.name)
                          }}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>


      </div>

    {/* Section 3 */}
    <div className='section-3'>
    <div className='mt-4 mb-2'>
    <Typography variant="h6" ><b>Who is this course for ?</b></Typography>
    <p>
    Describe the target audience for the course to help students decide if this course is suitable for them.
    </p>
      </div>
    </div>

   {/* Form 3 */}
   <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div className="input-group mb-3">
            <input value={whos[0] != null ? whos[0] : ""} maxLength={160} onChange={(e) => handleWhosInputChange(0,e.target.value)} type="text" className="form-control" placeholder="Example: Accounting students interested in developing their Excel skills " />
            {/* <span className="input-group-text" id="res-1">160</span> */}
          </div>

          {whos.length > 1 && (
            whos.slice(1).map((item,key) => (
            <div key={key} className="input-group mb-3">
            <input value={item} maxLength={160} onChange={(e) => handleWhosInputChange(key + 1,e.target.value)} type="text" className="form-control" placeholder="Example: " />
            <span onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleDeleteWhosExtra(whos[key + 1])
                    }
                  });
                  }}
                      className="input-group-text btn btn-danger text-white" id="res-3"> 
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                        />
                      </span>
            </div>
              
              ))
          )}
          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            // {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>

                       <div className="input-group">
                        <input onChange={(e) => handleInputChangeInputWhosExtra(index,e.target.value)} maxLength={160} type="text" className="form-control" placeholder="Example" />
                        <span className="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            handleRemoveInputWhosExtra(index)
                            remove(field.name)
                          }}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>


    </Card>
    
    </div>
  )
}

export default IntendedLearners