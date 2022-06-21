import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Form, FormControl, InputGroup, Modal, Tab, Table, Tabs, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { URL } from '../../server_connections/server';
import { FcApproval } from "react-icons/fc";

function MainProjectTools(){
    const history = useNavigate()
    // Data Storage States
      const [projectTypeData, setProjectTypeData] = useState([]);
      const [projectCategoryTypeData, setProjectCategoryTypeData] = useState([]);
      const [statusData,set_Project_Status] = useState([]);
      const [priorityData, set_Project_Priority_Data] = useState([])
      
// status create modal controller
const [showProjectStatus,setShowStatus] = useState(false)
const handleCloseProjectStatus = () => {setShowStatus(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
const handleShowStatus = () => setShowStatus(true)
//status update modal control
const [show_update_status, set_update_Show_status] = useState(false);
const handle_update_Show_status = () => set_update_Show_status(true);
const handle_update_Close_status= () => {set_update_Show_status(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
//status delete modal control
const [show_delete_status, set_delete_Show_status] = useState(false);
const handle_delete_Show_status = () => set_delete_Show_status(true);
const handle_delete_Close_status= () => set_delete_Show_status(false);


// priority  create modal controller
const [showPriority,setPriority] = useState(false)
const handleClosePriority = () => {setPriority(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
const handleShowPriority = () => setPriority(true)
//priority update modal control
const [show_update_priority, set_update_Show_priority] = useState(false);
const handle_update_Show_priority = () => set_update_Show_priority(true);
const handle_update_Close_priority = () => {set_update_Show_priority(false);
  setToolFormValue({
    id:0,
     name:"",
   });};
//priority update modal control
const [show_delete_priority, set_delete_Show_priority] = useState(false);
const handle_delete_Show_priority = () => set_delete_Show_priority(true);
const handle_delete_Close_priority = () => set_delete_Show_priority(false);

// project type create modal control
const [showProjectType, setShowProjectType] = useState(false);
const handle_Close_Project_type = () => {setShowProjectType(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
const handleShowProjectType = () => setShowProjectType(true);
  //project update modal control
const [show_update_project_type, set_update_Show_project_type] = useState(false);
const handle_update_Show_project_type = () => set_update_Show_project_type(true);
const handle_update_Close_project_type= () =>{ set_update_Show_project_type(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
 //project type update modal control
 const [show_delete_project_type, set_delete_Show_project_type] = useState(false);
 const handle_delete_Show_project_type = () => set_delete_Show_project_type(true);
 const handle_delete_Close_project_type= () => set_delete_Show_project_type(false);

// project category type create modal control
const [show_Project_Category_Type, setShowProjectCategory] = useState(false);
const handle_Project_Category_Close = () => setShowProjectCategory(false);
const handleShowProjectCategory = () => setShowProjectCategory(true);
  //project category update modal control
const [show_update_project_category_type, set_update_Show_project_category_type] = useState(false);
const handle_update_Show_project_category_type = () => set_update_Show_project_category_type(true);
const handle_update_Close_project_category_type= () => {set_update_Show_project_category_type(false);
  setToolFormValue({
    id:0,
     name:"",
   })
};
 //project category type update modal control
 const [show_delete_project_category_type, set_delete_Show_project_category_type] = useState(false);
 const handle_delete_Show_project_category_type = () => set_delete_Show_project_category_type(true);
 const handle_delete_Close_project_category_type= () => set_delete_Show_project_category_type(false);

const [toolFormValue, setToolFormValue] = useState({
 id:0,
  name:"",
  level: ""
})

// #################################################################

// Toast Alerts State Controller
const [success_create,set_success_create] = useState(false);
const handleShowsuccessCreate = () => set_success_create(true);
const handleCloseSuccessCreate = () => set_success_create(false);
// Create Toaster Error
const [error_create,set_error_create] = useState(false);
const handleShowErrorCreate = () => set_error_create(true);
const handleCloseErrorCreate = () => set_error_create(false);

// Update Toaster
const [success_updated,set_success_updated] = useState(false);
const handleShowsuccessUpdate = () => set_success_updated(true);
const handleCloseSuccessUpdate = () => set_success_updated(false);
// update  error toast controller
const [error_updated,set_error_updated] = useState(false); 
const handleShowErrorUpdate = () => set_error_updated(true);
const handleCloseErrorUpdate = () => set_error_updated(false);
// server error toast controller
const [server_error,set_server_error] = useState(false); 
const handleShowServerError = () => set_server_error(true);
const handleCloseServerError = () => set_server_error(false);
// delete success toast controller
const [success_delete,set_success_delete] = useState(false); 
const handleShowSuccessDelete = () => set_success_delete(true);
const handleCloseSuccessDelete = () => set_success_delete(false);
// delete success toast controller
const [error_delete,set_error_delete] = useState(false); 
const handleShowErrorDelete = () => set_error_delete(true);
const handleCloseErrorDelete = () => set_error_delete(false);



// #################################################################
const [old_project_type_data, set_old_project_type_data] = useState([]);
const [old_project_category_data, set_old_project_category_data] = useState([]);
const [old_project_status_data, set_old_project_status_data] = useState([]);
const [old_priority_type_data, set_old_priority_type_data] = useState([]);
function OldData(){
  set_old_project_type_data(projectTypeData);
  set_old_project_category_data(projectCategoryTypeData);
  set_old_project_status_data(statusData);
  set_old_priority_type_data(priorityData);
};


const latest_project_type_data = useMemo(() => old_project_type_data, [old_project_type_data]);
const latest_project_category_type_data = useMemo(() => old_project_category_data, [old_project_category_data]);
const latest_project_status_data = useMemo(() => old_project_status_data, [old_project_status_data]);
const latest_priority_type_data = useMemo(() => old_priority_type_data, [old_priority_type_data]);
// project type
useEffect(() =>{
  
  const requestOptions ={
  method:'Get',
  headers:{
      'Accept':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('key')}`
    ,'Content-Type': 'application/json'},
}

  // fetch all project types
      fetch(`${URL}/api/auth/project_type/all`,requestOptions)
      .then(response => response.json())
      .then(Result =>{ setProjectTypeData(Result.data)})
     
},[latest_project_type_data])
// project category
useEffect(() =>{
  
  const requestOptions ={
  method:'Get',
  headers:{
      'Accept':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('key')}`
    ,'Content-Type': 'application/json'},
}


      // fetch all project category types
     fetch(`${URL}/api/auth/project_category_type/all`,requestOptions)
     .then(response => response.json())
     .then(Result =>{ setProjectCategoryTypeData(Result.data)})

   

},[latest_project_category_type_data])
// project status
useEffect(() =>{
  
  const requestOptions ={
  method:'Get',
  headers:{
      'Accept':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('key')}`
    ,'Content-Type': 'application/json'},
}

    // fetch all statuses
    fetch(`${URL}/api/auth/project_status/all`,requestOptions)
    .then(response => response.json())
    .then(Result => set_Project_Status(Result.data))  


},[ latest_project_status_data])
// priority type
useEffect(() =>{
  
  const requestOptions ={
  method:'Get',
  headers:{
      'Accept':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('key')}`
    ,'Content-Type': 'application/json'},
}
  //fetch all priority records
  fetch(`${URL}/api/auth/priority_type/all`, requestOptions)
  .then(response => response.json())
  .then(Result =>{
    set_Project_Priority_Data(Result.data)
  })


},[latest_priority_type_data])


  function handleAddProjectTypeSubmit(event) {
    event.preventDefault()
        fetch(`${URL}/api/auth/project_type/create`,{
        method: 'post',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        },
        body: JSON.stringify({
            project_type_attrs:{
                name: toolFormValue.name,
        }
    })      
    })    
    .then((Response ) =>{ Response.json()
        
        if (Response.status === 201){
          handleShowsuccessCreate();
            handle_Close_Project_type();
            OldData();
        }
        else if(Response.status === 422){
          handleShowErrorCreate();
        }
        else if(Response.status === 500){
          handleShowServerError();
        }
        else if(Response.status === 401){
           
            history('/')
        }
    })
  }
  function handleAddProjectCategoryTypeSubmit(event) {
    event.preventDefault()
        fetch(`${URL}/api/auth/project_category_type/create`,{
        method: 'post',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        },
        body: JSON.stringify({
          project_category:{
                name: toolFormValue.name,
        }
    })      
    })    
    .then((Response ) =>{ Response.json()
        
        if (Response.status === 201){
          handleShowsuccessCreate();
            handle_Project_Category_Close();
            OldData();
        }
        else if(Response.status === 422){
          handleShowErrorCreate();
        }
        else if(Response.status === 500){
          handleShowServerError();
        }
        else if(Response.status === 401){
           
            history('/')
        }
    })
  }
  function handleAddProjectStatusSubmit(event) {
    event.preventDefault()
        fetch(`${URL}/api/auth/project_status/create`,{
        method: 'post',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        },
        body: JSON.stringify({
            status:{
             name: toolFormValue.name,  
           } 
        })      
    })    
    .then((Response ) => {Response.json()
        if (Response.status === 201){
          handleShowsuccessCreate();
            handleCloseProjectStatus();
            OldData();
        }
        else if(Response.status === 422){
          handleShowErrorCreate();
        }
        else if(Response.status === 500){
          handleShowServerError();
        }
        else if(Response.status === 401){
            history('/')
        }
    })
  }
  function handleAddPrioritySubmit(event) {
    event.preventDefault()
        fetch(`${URL}/api/auth/priority_type/create`,{
        method: 'post',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        },
        body: JSON.stringify({
            priority:{
             name: toolFormValue.name,  
           } 
        })      
    })    
    .then((Response ) => {Response.json()
        if (Response.status === 201){
          handleShowsuccessCreate();
            handleClosePriority();
            OldData();
        }
        else if(Response.status === 422){
          handleShowErrorCreate();
        }
        else if(Response.status === 500){
          handleShowServerError();
        }
        else if(Response.status === 401){
            history('/')
        }
    })
  }
 
  //Update functions
  function handle_Update_Status_Submit(event){
    event.preventDefault()
   
    fetch(`${URL}/api/auth/project_status/update`,{
        method: 'put',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('key')}`
            },
            body: JSON.stringify({
                id: toolFormValue.id,
                status:{
                    name: toolFormValue.name
                }
            })
    })
    .then((Response) => {
        Response.json()
        if(Response.status === 200){
          handleShowsuccessUpdate();
            handle_update_Close_status();
            OldData();
        } 
        else if(Response.status === 422){
          handleShowErrorUpdate();
          handle_update_Close_status();  
      } 
      else if(Response.status === 500){
        handleShowServerError();
      }
    })
}
function handle_Update_Priority_Submit(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/priority_type/update`,{
      method: 'put',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('key')}`
          },
          body: JSON.stringify({
              id: toolFormValue.id,
              priority:{
                  name: toolFormValue.name
              }
          })
  })
  .then((Response) => {
      Response.json()
      if(Response.status === 200){
        handleShowsuccessUpdate();
          handle_update_Close_priority();
          OldData();
      } 
      else if(Response.status === 422){
        handleShowErrorUpdate();
      } 
      else if(Response.status === 500){
        handleShowServerError();
      }
  })
}
function handle_Update_Project_Type_Submit(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/project_type/update`,{
      method: 'put',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('key')}`
          },
          body: JSON.stringify({
              id: toolFormValue.id,
              project_type_attrs:{
                  name: toolFormValue.name
              }
          })
  })
  .then((Response) => {
      Response.json()
      if(Response.status === 200){
        handleShowsuccessUpdate();
          handle_update_Close_project_type();
          OldData();
      } 
      else if(Response.status === 422){
        handleShowErrorUpdate();
      } 
      else if(Response.status === 500){
        handleShowServerError();
      }
  })
}
function handle_Update_Project_Category_Type_Submit(event){
  event.preventDefault()
 
  fetch(`${URL}/api/auth/project_category_type/update`,{
      method: 'put',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('key')}`
          },
          body: JSON.stringify({
              id: toolFormValue.id,
              project_category:{
                  name: toolFormValue.name
              }
          })
  })
  .then((Response) => {
      Response.json()
      if(Response.status === 200){
        handleShowsuccessUpdate();
        handle_update_Close_project_category_type();
        OldData();
      } 
      else if(Response.status === 422){
        handleShowErrorUpdate();
      }
      else if(Response.status === 500){
        handleShowServerError();
      }
  })
}

// Delete Functions 
function handleSubmitDeleteProjectType(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/project_type/delete`,{
      method: 'delete',
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
      },
      body: JSON.stringify({
          id: toolFormValue.id
      })
  })
  .then((response) =>
  {response.json()
      if(response.status === 200){
        handleShowSuccessDelete();
        handle_delete_Close_project_type();
        OldData();
      }
      else if(response.status === 422){
        handleShowErrorDelete();
        handle_delete_Close_project_type();
      }
      else if(response.status === 500){
        handleShowServerError();
        handle_delete_Close_project_type();
      }
      else if(response.status === 401){
        history('/')
      }
  })
  .then((results) => results.json())
}
function handleSubmitDeleteProjectCategoryType(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/project_category_type/delete`,{
      method: 'delete',
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
      },
      body: JSON.stringify({
          id: toolFormValue.id
      })
  })
  .then((response) =>
  {response.json()
      if(response.status === 200){
        handleShowSuccessDelete();
        handle_delete_Close_project_category_type();
        OldData();
      }
      else if(response.status === 422){
        handleShowErrorDelete();
        handle_delete_Close_project_category_type()
      }
      else if(response.status === 500){
        handleShowServerError();
        handle_delete_Close_project_category_type()
      }
      else if(response.status === 401){
        history('/')
      }
  })
  .then((results) => results.json())
}
function handleSubmitDeleteProjectStatus(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/project_status/delete`,{
      method: 'delete',
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
      },
      body: JSON.stringify({
          id: toolFormValue.id
      })
  })
  .then((response) =>
  {response.json()
      if(response.status === 200){
        handleShowSuccessDelete();
        handle_delete_Close_status();
        OldData();
      }
      else if(response.status === 422){
        handleShowErrorDelete();
        handle_delete_Close_status()
      }
      else if(response.status === 500){
        handleShowServerError();
        handle_delete_Close_status()
      }
      else if(response.status === 401){
       
        history('/')
      }
  })
  .then((results) => results.json())
}
function handleSubmitDeletePriorityType(event){
  event.preventDefault()
  fetch(`${URL}/api/auth/priority_type/delete`,{
      method: 'delete',
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem('key')}`
      },
      body: JSON.stringify({
          id: toolFormValue.id
      })
  })
  .then((response) =>
  {response.json()
      if(response.status === 200){
        handleShowSuccessDelete();
        handle_delete_Close_priority();
        OldData();
      }
      else if(response.status === 422){
        handleShowErrorDelete();
        handle_delete_Close_priority()
      }
      else if(response.status === 500){
        handleShowServerError();
        handle_delete_Close_priority()
      }
      else if(response.status === 401){
        
        history('/')
      }
  })
  .then((results) => results.json())
}

  const handleChange =(event) => {
    setToolFormValue({
        ...toolFormValue,
        [event.target.name]: event.target.value
    })
    }

  function selectTool(tool){
   setToolFormValue({
     ...toolFormValue,
     id: tool.id,
     name: tool.name,
     level: tool.level
   })        
}
    return(
        <>
          <Card>
            <Card.Header>
        System Tools
            </Card.Header>
            <Card.Body>
              <Tabs defaultActiveKey="project types"  className="mb-3">
                  <Tab eventKey="project types" title="Project Types">
                  <Button variant="outline-success"  size='sm' onClick={handleShowProjectType}>
                                  Add new Project Type
                                </Button>             
                                <Table size='sm' striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>name</th>
                                    </tr>
                                  </thead>
                                  <tbody>{
                                    projectTypeData.map((tool, Index)=>{
                                      return <tr key={Index}>
                                        <th scope="row">{tool.id}</th>
                                        <td>{tool.name}</td>
                                        <td className="text-center">
                                          <button size='sm' className='btn'  onClick={() => selectTool(tool)}><Button variant="outline-success" size='sm' onClick={handle_update_Show_project_type}>Update</Button></button>  
                                        {' '} {' '}
                                      <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-danger" size='sm' onClick={handle_delete_Show_project_type}>Delete</Button></button>  </td> 
                                        
                                        
                                      </tr>
                                    }) 
                                    }        
                                  </tbody>
                                </Table>
                  </Tab>
                  <Tab eventKey="project category" title="Project Category">
                  <Button variant="outline-success" size='sm' onClick={handleShowProjectCategory}>
                                  Add Project Category
                                </Button>
                              
                                <Table size='sm' striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>name</th>
                                    </tr>
                                  </thead>
                                  <tbody>{
                                    projectCategoryTypeData.map((tool, Index)=>{
                                      return <tr key={Index}>
                                        <th scope="row">{tool.id}</th>
                                        <td>{tool.name}</td>
                                        <td className="text-center">
                                          <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-success" size='sm'  onClick={handle_update_Show_project_category_type}>Update</Button></button>  
                                          {' '} {' '}
                                      <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-danger" size='sm' onClick={handle_delete_Show_project_category_type}>Delete</Button></button>
                                          </td> 
                                      
                                      </tr>
                                    }) 
                                    }        
                                  </tbody>
                                </Table>
                  </Tab>
                  <Tab eventKey="status" title="Project Status">
                  <Button variant="outline-success"  size='sm' onClick={handleShowStatus}>
                                  Add Status
                                </Button>
                                <Table size='sm' striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>name</th>
                                    </tr>
                                  </thead>
                                  <tbody>{
                                    statusData.map((tool, key)=>{
                                      return <tr key={key}>
                                        <th scope="row">{tool.id}</th>
                                        <td>{tool.name}</td>
                                        <td className="text-center"><button className='btn' size='sm' onClick={() => selectTool(tool)}><Button variant="outline-success"  size='sm' onClick={handle_update_Show_status}>Update</Button></button>  
                                        {' '} {' '}
                                      <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-danger" size='sm' onClick={handle_delete_Show_status}>Delete</Button></button>  
                                        </td> 
                                      
                                      </tr>
                                    })
                                    
                                    }
                                  </tbody>
                                </Table>
                  </Tab>
                  <Tab eventKey="priority" title="Priority Type">
                  <Button variant="outline-success"  size='sm' onClick={handleShowPriority}>
                                  Add Priority
                                </Button>
                                <Table size='sm' striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>name</th>
                                    </tr>
                                  </thead>
                                  <tbody>{
                                    priorityData.map((tool, key)=>{
                                      return <tr key={key}>
                                        <th scope="row">{tool.id}</th>
                                        <td>{tool.name}</td>
                                  
                                        <td className="text-center">
                                          <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-success" size='sm' onClick={handle_update_Show_priority}>Update</Button></button>  
                                          {' '} {' '}
                                        <button size='sm' className='btn' onClick={() => selectTool(tool)}><Button variant="outline-danger" size='sm' onClick={handle_delete_Show_priority}>Delete</Button></button>  
                                        </td> 
                                    
                                      </tr>
                                    })
                                    
                                    }
                                  </tbody>
                                </Table>
                  </Tab>
              </Tabs>

            </Card.Body>
          </Card>
        {/* Modals */}
    
  
  {/* modal for status */}
        <Modal show={showProjectStatus} onHide={handleCloseProjectStatus}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New Status </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddProjectStatusSubmit}>
                               
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="Enter new status"
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note you can't add records with same name.
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handleCloseProjectStatus}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>create a new status</label>
                    </Modal.Footer>
                </Modal>
  
  {/* modal for priority */}
  <Modal show={showPriority} onHide={handleClosePriority}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New Priority </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddPrioritySubmit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="Enter new priority"
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note you can't add records with same name.
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handleClosePriority}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>create a new priority</label>
                    </Modal.Footer>
                </Modal>

    {/* Modal for project type control */}
      <Modal show={showProjectType} onHide={handle_Close_Project_type}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New  Project Type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddProjectTypeSubmit}>
          
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="Enter new type of project"
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note you can't add records with same name.
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handle_Close_Project_type}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>create a new project Type</label>
                    </Modal.Footer>
                </Modal>


                 {/* Modal for project category type control */}
                  <Modal show={show_Project_Category_Type} onHide={handle_Project_Category_Close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create New Project Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddProjectCategoryTypeSubmit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="Enter new project category"
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note you can't add records with same name.
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handle_Project_Category_Close}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>create a new project category</label>
                    </Modal.Footer>
                </Modal>

{/* ###UPDATE MODALS */}
                {/* modal for updating project type details  */}
                <Modal show={show_update_project_type} onHide={handle_update_Close_project_type}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update  Type of project Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handle_Update_Project_Type_Submit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="project type name"
                                    required
                                  />
                                </InputGroup>  
                                <br/>
                                <Button variant="secondary" onClick={handle_update_Close_project_type}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>update project type</label>
                    </Modal.Footer>
                </Modal>

                {/* modal for updating project category type details  */}

                <Modal show={show_update_project_category_type} onHide={handle_update_Close_project_category_type}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update  Project Category Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handle_Update_Project_Category_Type_Submit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="project category type name"
                                    required
                                  />
                                </InputGroup>  
                                <br/>
                                <Button variant="secondary" onClick={handle_update_Close_project_category_type}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>update project category</label>
                    </Modal.Footer>
                </Modal>

                     {/* modal for updating priority details  */}
                     <Modal show={show_update_priority} onHide={handle_update_Close_priority}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update  priority Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handle_Update_Priority_Submit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="priority name"
                                    required
                                  />
                                </InputGroup>  
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="level">Color :</InputGroup.Text>
                                  <FormControl
                                    aria-label="level"
                                    aria-describedby="level"
                                    name="level" 
                                    onChange={handleChange} 
                                    value={toolFormValue.level} 
                                    placeholder="color name" 
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note this is bg color 
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handle_update_Close_priority}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>update priority type</label>
                    </Modal.Footer>
                </Modal>

           {/* modal for updating status details  */}
           <Modal show={show_update_status} onHide={handle_update_Close_status}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update  Status Details </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handle_Update_Status_Submit}>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="name">Name :</InputGroup.Text>
                                  <FormControl
                                    aria-label="name"
                                    aria-describedby="name"
                                    name="name" 
                                    onChange={handleChange} 
                                    value={toolFormValue.name} 
                                    placeholder="status name"
                                    required
                                  />
                                </InputGroup>  
                                <InputGroup className="mb-3">
                                  <InputGroup.Text  className="col-4" id="level">Color :</InputGroup.Text>
                                  <FormControl
                                    aria-label="level"
                                    aria-describedby="level"
                                    name="level" 
                                    onChange={handleChange} 
                                    value={toolFormValue.level} 
                                    placeholder="color name" 
                                    required
                                  />
                                </InputGroup>  
                                <Form.Text className="text-muted">
                                    please note this is bg color 
                                    </Form.Text><br/>
                                <Button variant="secondary" onClick={handle_update_Close_status}>
                                    Close
                                </Button>{' '} {' '}
                                <Button variant="success" type="submit">
                                    Save 
                                </Button>
                            </Form>
                            </Modal.Body>
                    <Modal.Footer>
                    <label  className='text-center'>update status type</label>
                    </Modal.Footer>
                </Modal>


  {/* Delete Modals */}

              {/*  Project  Types */}
                <Modal  show={show_delete_project_type}  onHide={handle_delete_Close_project_type} backdrop="static"  keyboard={false}  >
                  <Modal.Header closeButton>
                    <Modal.Title>Remove Project Type </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  please note your are about remove <b>{toolFormValue.name} </b> from the system.
                  this action can not be undone
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handle_delete_Close_project_type}>
                      No
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteProjectType}>Yes</Button>
                  </Modal.Footer>
                </Modal>
              {/*  Project  Category Types */}
              <Modal  show={show_delete_project_category_type}  onHide={handle_delete_Close_project_category_type} backdrop="static"  keyboard={false}  >
                        <Modal.Header closeButton>
                          <Modal.Title>Remove Project Category  Type </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        please note your are about remove <b>{toolFormValue.name}</b>  from the system.
                        this action can not be undone
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handle_delete_Close_project_category_type}>
                            No
                          </Button>
                          <Button variant="primary" onClick={handleSubmitDeleteProjectCategoryType}>Yes</Button>
                        </Modal.Footer>
                      </Modal>

              {/*  Project  Priority Types */}
              <Modal  show={show_delete_priority}  onHide={handle_delete_Close_priority} backdrop="static"  keyboard={false}  >
                        <Modal.Header closeButton>
                          <Modal.Title>Remove Project Priority </Modal.Title>
                        </Modal.Header>
                        <Modal.Body> 
                        please note your are about remove <b>{toolFormValue.name}</b>  from the system.
                        this action can not be undone
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handle_delete_Close_priority}>
                            No
                          </Button>
                          <Button variant="primary" onClick={handleSubmitDeletePriorityType}>Yes</Button>
                        </Modal.Footer>
                      </Modal>
          {/*  Project  Status */}
          <Modal  show={show_delete_status}  onHide={handle_delete_Close_status} backdrop="static"  keyboard={false}  >
                  <Modal.Header closeButton>
                    <Modal.Title>Remove Project Status </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  please note your are about remove <b>{toolFormValue.name}</b> from the system.
                  this action can not be undone
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handle_delete_Close_status}>
                      No
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteProjectStatus}>Yes</Button>
                  </Modal.Footer>
                </Modal>



                        
              {/* Toast Arlets */}


              <ToastContainer className="p-3" position={'top-end'}>
              {/* Successfully Create */}
              <Toast onClose={handleCloseSuccessCreate} show={success_create} bg={'success'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>  Created Successfully</Toast.Body>
                      </Toast>
                      {/* Error Create */}
              <Toast onClose={handleCloseErrorCreate} show={error_create} bg={'warning'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Error Occured</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>  please check input or Record already exists</Toast.Body>
                      </Toast>

              {/* Successfully Updated */}
                        <Toast onClose={handleCloseSuccessUpdate} show={success_updated} bg={'success'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>  Updated Successfully</Toast.Body>
                      </Toast>

                {/*  Error Update  */}
                <Toast onClose={handleCloseErrorUpdate} show={error_updated} bg={'warning'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Error</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>please check input or value already assigned</Toast.Body>
                      </Toast>

                      {/*  Server Error  */}
                <Toast onClose={handleCloseServerError} show={server_error} bg={'danger'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Server Error</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>server error occured</Toast.Body>
                      </Toast>



              {/* Successfully Deleted */}
              <Toast onClose={handleCloseSuccessDelete} show={success_delete} bg={'warning'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">{<FcApproval/>}{' '}Successfully </strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>  Deleted Successfully</Toast.Body>
                      </Toast>
                      {/* Error Delete  */}
                <Toast onClose={handleCloseErrorDelete} show={error_delete} bg={'warning'} delay={5000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                          />
                          <strong className="me-auto">Error</strong>
                        
                        </Toast.Header>
                        <Toast.Body className='text-white'>error occurd please refresh the page to confirm if the record removed</Toast.Body>
                      </Toast>

        
                  </ToastContainer>
        </>
    )
}
export default MainProjectTools;