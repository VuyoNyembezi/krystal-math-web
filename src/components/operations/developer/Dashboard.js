import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Nav,
  ProgressBar,
  Row,
  Tab,
  Table,
  Tabs,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import CountUp from "react-countup";
import { Input, Label } from "reactstrap";
import "chart.js/auto";


import { Doughnut } from "react-chartjs-2";
import {
  FcDownload,
  FcInfo,
  FcApproval,
  FcHighPriority,
  FcCircuit,
} from "react-icons/fc";


import { URL } from "../../../server_connections/server";

function DashBoardDev() {
  const history = useNavigate();

  // Toast Alerts State Controller
  const [success_updated, set_success_updated] = useState(false);
  const handleShowsuccessUpdate = () => set_success_updated(true);
  const handleCloseSuccessUpdate = () => set_success_updated(false);
//   // Toast Alerts State Controller
  const [success_completed, set_success_completed] = useState(false);
  const handleShowsuccessComplete = () => set_success_completed(true);
  const handleCloseSuccessComplete = () => set_success_completed(false);

  // update  error toast controller
const [duplicate_updated,set_duplicate_live_updated] = useState(false); 
const handleShowDuplicateUpdate = () => set_duplicate_live_updated(true);
const handleCloseDuplicateUpdate = () => set_duplicate_live_updated(false);

  // update  error toast controller
  const [error_updated, set_error_updated] = useState(false);
  const handleShowErrorUpdate = () => set_error_updated(true);
  const handleCloseErrorUpdate = () => set_error_updated(false);
  // server error toast controller
  const [server_error, set_server_error_updated] = useState(false);
  const handleShowServerError = () => set_server_error_updated(true);
  const handleCloseServerError = () => set_server_error_updated(false);
  // Http Request Data Holders for Counters

  // user Task
  const [TaskOverviewCounter, setTaskOverviewCounter] = useState([]);

  const [UserAllTasksData, setUserAllTasksData] = useState([]);
  const [UserCompletedTasksData, setUserCompletedTasksData] = useState([]);
  const [UserOverDueTasksData, setUserOverDueTasksData] = useState([]);
  const [UserOpenTasksData, setUserOpenTasksData] = useState([]);

  // search state 
  const [search_key,set_search_key] = useState({
    task_search:null,

  });
    // Complete Confirmation Live Issue
    const [show_Complete_Task, setCompleteTask] = useState(false);
    const handleCompleteTaskShow = () => setCompleteTask(true);
    const handleCloseSuccessCompleted = () => {setCompleteTask(false);
      setTaskValue({
        id: 0,
        name: "",
        team_id: localStorage.getItem("team"),
        user_id: 0,
        task_status_id: 0,
        environment_id: 0,
        due_date: "",
        due_time: "",
        kickoff_date: "",
        kickoff_time: "",
        task_comment: "",
        days_left: 0,
        task_duration: 0,
        active: true,
      });};
  // user overview task status
  const [user_task_statuses, set_user_task_statuses] = useState([]);

  // assigned members State
  const [assigned_members_projects, set_assigned_members_projects_ProjectData] =
    useState([]);
  const [projectData, set_project] = useState([]);
  // projects Data

  const [assign_projectData, set_assign_ProjectData] = useState({});
  const [assign_bet_projectData, set_assign_bet_ProjectData] = useState([]);
  const [assign_bet_partners_projectData, set_assign_bet_partners_ProjectData] =
    useState([]);
  const [assign_country_projectData, set_assign_country_ProjectData] = useState(
    []
  );
  const [
    assign_customer_journey_projectData,
    set_assign_customer_journey_ProjectData,
  ] = useState([]);
  const [
    assign_digital_marketing_projectData,
    set_assign_digital_marketing_ProjectData,
  ] = useState([]);
  const [assign_integrations_projectData, set_assign_integrations_ProjectData] =
    useState([]);
  const [
    assign_payment_methods_projectData,
    set_assign_payment_methods_ProjectData,
  ] = useState([]);
  const [assign_all_projects, set_assign_all_projects_ProjectData] = useState(
    []
  );
  // for update  project assignemnt record
  const [showUpdateProjectAssign, setUpdateProjectAssign] = useState(false);
  const handleShowUpdateProjectAssign = () => setUpdateProjectAssign(true);
  const handleCloseUpdateProjectAssign = () => {
    setUpdateProjectAssign(false);
    setProjectAssignment({
      id: 0,
      due_date: "",
      due_time: "",
      team_id: localStorage.getItem("team"),
      kickoff_date: "",
      kickoff_time: "",
      status_id: 0,
      active: true,
      assign_name: "",
      project_name: "",
      project_id: 0,
      last_update: "",
      days_left: 0,
      assignment_duration: 0,
    });
    setProjectAssignmentForm({
      id: 0,
      user_status_id: 0,
    });
  };

  // Task State Values Holder
  const [taskValue, setTaskValue] = useState({
    id: 0,
    name: "",
    team_id: localStorage.getItem("team"),
    user_id: 0,
    task_status_id: 0,
    environment_id: 0,
    due_date: "",
    due_time: "",
    kickoff_date: "",
    kickoff_time: "",
    task_comment: "",
    days_left: 0,
    task_duration: 0,
    active: true,
  });
  const [taskFormValue, setTaskFormValue] = useState({
    id: 0,
    name: "",
    team_id: localStorage.getItem("team"),
    user_id: 0,
    task_status_id: 0,
    environment_id: 0,
    due_date: "",
    due_time: "",
    kickoff_date: "",
    kickoff_time: "",
    task_comment: "",
    active: true,
  });
  // Project State Values Holder
  const [projectAssignmentValue, setProjectAssignment] = useState({
    id: 0,
    due_date: "",
    due_time: "",
    team_id: localStorage.getItem("team"),
    kickoff_date: "",
    kickoff_time: "",
    status_id: 0,
    active: true,
    assign_name: "",
    project_name: "",
    project_id: 0,
    last_update: "",
    days_left: 0,
    assignment_duration: 0,
  });
  // Project State Form Values Holder
  const [projectAssignmentFormValue, setProjectAssignmentForm] = useState({
    id: 0,
    user_status_id: 0,
  });
  const [projectValue, setProject] = useState({
    name: "",
    business_request_document_link: "",
    business_request_document_status: false,
    inserted_at: "",
    project_type: "",
    priority_type: "",
    project_category: "",
    status: "",
    progress: 0,
    last_update: "",
    pm: "",
    level: "",
  });

  // projects modal
  const [show, setProjectsShow] = useState(false);
  const handleProjectsClose = () => {
    setProjectsShow(false);
    setProjectAssignment({
      id: 0,
      due_date: "",
      due_time: "",
      team_id: localStorage.getItem("team"),
      kickoff_date: "",
      kickoff_time: "",
      status_id: 0,
      active: true,
      assign_name: "",
      project_name: "",
      project_id: 0,
      last_update: "",
      days_left: 0,
      assignment_duration: 0,
    });
    setProjectAssignmentForm({
      id: 0,
      user_status_id: 0,
    });
  };
  const handleProjectsShow = () => setProjectsShow(true);

  // member tasks modal
  const [show_member_task, setShow_Member_task] = useState(false);
  const handleClose_Member_task = () => {setShow_Member_task(false);
    set_search_key({
      task_search:null,
  
    });};
  const handleShow_Members_task = () => {
    set_search_key({
      task_search:null,
  
    });
    setShow_Member_task(true);};

  // member tasks progress chart
  const [show_member_progress_chart, setShow_Member_progress_chart] =
    useState(false);
  const handleClose_Member_Chart_task = () =>
    setShow_Member_progress_chart(false);
  const handleShow_Members_Chart_task = () =>
    setShow_Member_progress_chart(true);

  //update task  modal
  const [show_Update_task, setShow_Update_task] = useState(false);
  const handleClose_Update_task = () => setShow_Update_task(false);
  const handleShow_update_Task = () => setShow_Update_task(true);

  const [TaskStatus, setTaskStatus] = useState([]);
  const [UserStatus, setUserStatus] = useState([]);

  // For DropDown Population
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // fetch for task statuses
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTaskStatus(results.data));

    // fetch for user statuses
    fetch(`${URL}/api/auth/user_status/all`, requestOptions)
      .then((response) => response.json())
      .then((results) => setUserStatus(results.data));
  }, []);
  // User Or Dev Effect
  useEffect(() => {
   
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (search_key.task_search === null){

  // fetch user tasks
  fetch(`${URL}/api/auth/user/tasks?id=${localStorage.getItem("team")}&user_id=${localStorage.getItem('SUID')}`,requestOptions)
  .then((response) => response.json())
  .then((Result) => {
    setUserOpenTasksData(Result.open_tasks)
    setUserAllTasksData(Result.all_tasks);
    setUserOverDueTasksData(Result.over_due_tasks);
    setUserCompletedTasksData(Result.completed_tasks)
  });
    }
 
  }, [search_key.task_search]);

  //Mmeber  COUNTERS
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // Completed Tasks
    fetch(
      `${URL}/api/auth/task/user/count?team_id=${localStorage.getItem(
        "team"
      )}&id=${localStorage.getItem("SUID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => setTaskOverviewCounter(Result));

    // Member Status Value
    // not started
    fetch(
      `${URL}/api/auth/user/tasks_status?team_id=${localStorage.getItem(
        "team"
      )}&id=${localStorage.getItem("SUID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_user_task_statuses(Result));
  }, [user_task_statuses, TaskOverviewCounter]);

  // Project Assignments
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
     //fecth team  project assignments 
     fetch(
      `${URL}/api/auth/project_assignment/dev/all?team_id=${localStorage.getItem('team')}&id=${localStorage.getItem("SUID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((results) => {
        set_assign_ProjectData(results)
        set_assign_bet_ProjectData(results.bet_projects)
        set_assign_bet_partners_ProjectData(results.bet_project_partners_projects)
        set_assign_country_ProjectData(results.country_projects)
        set_assign_customer_journey_ProjectData(results.customer_journey_projects)
        set_assign_digital_marketing_ProjectData(results.digital_marketing_projects)
        set_assign_integrations_ProjectData(results.integrations_projects)
        set_assign_payment_methods_ProjectData(results.payment_method_projects)
      });
      // fecth all project assignments
    fetch(
      `${URL}/api/auth/project_assignment/dev?team_id=${localStorage.getItem(
        "team"
      )}&id=${localStorage.getItem("SUID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => set_assign_all_projects_ProjectData(res.data));
   
  }, [assign_projectData]);


  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    //fecth project assignments to Bet projects
    fetch(
      `${URL}/api/auth/project_assignment/details?team_id=${localStorage.getItem(
        "team"
      )}&id=${projectAssignmentValue.project_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => set_assigned_members_projects_ProjectData(res.data));

    //fecth project assignments to Bet projects
    fetch(
      `${URL}/api/auth/project?&id=${projectAssignmentValue.project_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => set_project(res.data));
  }, [projectAssignmentValue.project_id]);

  const handleChange = (event) => {
    setProjectAssignment({
      ...projectAssignmentValue,
      [event.target.name]: event.target.value,
    });

    setProject({
      ...projectValue,
      [event.target.name]: event.target.value,
    });

    setProjectAssignmentForm({
      ...projectAssignmentFormValue,
      [event.target.name]: event.target.value,
    });

    setTaskFormValue({
      ...taskFormValue,
      [event.target.name]: event.target.value,
    });

    set_search_key ({
      ...search_key,
      [event.target.name]: event.target.value
    })
  };
  function selectTask(task) {
    const now_date = new Date();
    const due_date = new Date(task.due_date);
    const kick_off = new Date(task.kickoff_date);
    const last_updates = new Date(task.updated_at);
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    //  Calculate  Task Days Left
    const task_time_due_difference = due_date.getTime() - now_date.getTime();
    const Task_due_in = Math.round(task_time_due_difference / oneDay);
    // kickoff,due date Last Updated right Formart
    const task_duedate = due_date.toDateString();
    const task_updated = last_updates.toDateString();
    const task_kick_off = kick_off.toDateString();

    setTaskValue({
      id: task.id,
      name: task.name,
      environment_id: task.environment.id,
      task_status_id: task.task_status.id,
      kickoff_date: task_kick_off,
      last_update: task_updated,
      due_date: task_duedate,
      task_comment: task.task_comment,
      created_at: task.inserted_at,
      environment: task.environment.name,
      task_status: task.task_status.name,
      days_left: Task_due_in,
      team_id: task.team.id,
      active: task.active,
      user: task.user.name
    });

    setTaskFormValue({
      id: task.id,
      name: task.name,
      task_status_id: task.task_status.id,
     
    });
  }

  function selectProjectAssignment(project) {
    const now_date = new Date();
    const due_date = new Date(project.due_date);
    const kick_off = new Date(project.kickoff_date);
    const last_updates = new Date(project.updated_at);
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    //  Calculate  Task Days Left
    const assignment_time_due_difference =
      due_date.getTime() - now_date.getTime();
    const project_assignment_due_in = Math.round(
      assignment_time_due_difference / oneDay
    );
    // kickoff,due date Last Updated right Formart
    const project_assignment_due_date = due_date.toDateString();
    const project_assignment_updated = last_updates.toDateString();
    const project_assignment_kick_off = kick_off.toDateString();
    setProjectAssignment({
      id: project.id,
      due_date: project_assignment_due_date,
      team_id: localStorage.getItem("team"),
      kickoff_date: project_assignment_kick_off,
      status_id: project.user_status.id,
      user_status: project.user_status.name,
      active: project.active,
      assign_name: project.user.name,
      project_name: project.project.name,
      project_id: project.project.id,
      last_update: project_assignment_updated,
      days_left: project_assignment_due_in,
      assignment_duration: assignment_time_due_difference,
    });
    setProjectAssignmentForm({
      id: project.id,
      user_status_id: project.user_status.id,
    });

    const project_last_updates = new Date(projectData.updated_at);
    const project_updated = project_last_updates.toDateString();
    setProject({
      name: projectData.name,
      business_request_document_link:
        projectData.business_request_document_link,
      business_request_document_status:
        projectData.business_request_document_status,
      inserted_at: projectData.inserted_at,
      project_type: projectData.project_type.name,
      project_category: projectData.project_category_type.name,
      status: projectData.project_status.name,
      progress: projectData.project_status.effect,
      last_update: project_updated,
      pm: projectData.user.name,
      level: projectData.project_status.level,
      priority_type: projectData.priority_type.name,
    });
  }

  // Update Task Status
  function handleSubmitTaskUpdate(event) {
    event.preventDefault();
const completed_task = "5";

if(taskFormValue.task_status_id === completed_task){
  handleCompleteTaskShow();
  handleClose_Update_task();
}
else if (taskFormValue.task_status_id === taskValue.task_status_id){
  handleClose_Update_task();
  handleShowDuplicateUpdate();
}
else {
     fetch(`${URL}/api/auth/task/dev/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: taskValue.id,
        task: {
          task_status_id: taskFormValue.task_status_id,
          active: taskValue.active,
        },
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowsuccessUpdate();
          handleClose_Update_task();
        } else if (response.status === 422) {
          handleShowErrorUpdate();
        } else if (response.status === 500) {
          handleShowServerError();
          handleClose_Update_task();
        } else if (response.status === 401) {
          alert("session expired");
          history("/");
        }
      })
      .then((results) => results.json());
  }
}
    // Complete Task Status
    function handle_Complete_Task(event) {
      event.preventDefault();
  
      fetch(`${URL}/api/auth/task/dev/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          id: taskValue.id,
          task: {
            task_status_id: taskFormValue.task_status_id,
            active: false,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 200) {
            handleShowsuccessComplete();
            handleCloseSuccessCompleted();
            handleClose_Update_task();
          } else if (response.status === 422) {
            handleShowErrorUpdate();
          } else if (response.status === 500) {
            handleShowServerError();
            handleClose_Update_task();
          } else if (response.status === 401) {
            alert("session expired");
            history("/");
          }
        })
        .then((results) => results.json());
    }

  // Update Assignment Details
  function handleSubmitUpdateProject(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/project_assignment/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: projectAssignmentFormValue.id,
        projects_assignment: {
          user_status_id: projectAssignmentFormValue.user_status_id,
        },
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowsuccessUpdate();
          handleCloseUpdateProjectAssign();
        } else if (response.status === 422) {
          handleShowErrorUpdate();
          handleCloseUpdateProjectAssign();
        } else if (response.status === 500) {
          handleShowServerError();
        } else if (response.status === 401) {
          alert("session expired");
          history("/");
        }
      })
      .then((results) => results.json());
  }
// search Dev Tasks 
     
     function handle_Search_Task_Submit(event){
      event.preventDefault();
      const requestOptions ={
        method:'Get',
        headers:{
            'Accept':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
          ,'Content-Type': 'application/json'},
      }
    //search for Team Tasks
     fetch(`${URL}/api/auth/team/tasks/search?team_id=${localStorage.getItem('team')}&user_id=${localStorage.getItem('SUID')}&search=${search_key.task_search}`,requestOptions)
     .then(response => response.json())
     .then(Result => setUserOpenTasksData(Result.data) )




  //search for Team Tasks
  fetch(`${URL}/api/auth/user/search?team_id=${localStorage.getItem('team')}&user_id=${localStorage.getItem('SUID')}&search=${search_key.task_search}`,requestOptions)
  .then(response => response.json())
  .then(Result => {
    setUserOpenTasksData(Result.open_tasks);
    })
    }



    function handle_Search_Task_Modal_Submit(event){
      event.preventDefault();
      const requestOptions ={
        method:'Get',
        headers:{
            'Accept':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('key')}`
          ,'Content-Type': 'application/json'},
      }
    //search for Team Tasks
    fetch(`${URL}/api/auth/user/search?team_id=${localStorage.getItem('team')}&user_id=${localStorage.getItem('SUID')}&search=${search_key.task_search}`,requestOptions)
     .then(response => response.json())
     .then(Result => {
      setUserAllTasksData(Result.all_tasks);
      setUserCompletedTasksData(Result.completed_tasks);
      setUserOverDueTasksData(Result.over_due_tasks);
       setUserOpenTasksData(Result.open_tasks);
       })
    }
  // Charts
  const task_overview_data = {
    labels: ["Not Started", "On Hold", "In Progress", "Testing", "Completed"],
    datasets: [
      {
        data: [
          user_task_statuses.not_started,
          user_task_statuses.on_hold,
          user_task_statuses.in_progress,
          user_task_statuses.testing,
          user_task_statuses.completed,
        ],
        backgroundColor: [
          "#BCB3AF",
          "#E6581B",
          "#1672EB",
          "#E4DD86",
          "#229577",
        ],
        borderColor: ["#BCB3AF", "#E6581B", "#1672EB", "#E4DD86", "#229577"],
      },
    ],
  };

  return (
    <div>
      <Card>

        <Card.Body>
            <Tabs defaultActiveKey="tasks" transition={true} className="mb-3">
        <Tab eventKey="tasks" title="Taks">
          <Container fluid>
            <Row>
              <Col sm={7}>
                <Card fluid className="flex shadow">
                  <Card.Header>Assign Stats </Card.Header>
                  <Card.Body>
                    <Row>
                      <div className="col-md-3 col-sm-11">
                        <Card
                          className="card text-white mb-3 py-3 shadow"
                          style={{ backgroundColor: "#010101" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col>
                                <span className="h6">Assigned </span>
                                <span className="h5 font-bold mb-0">
                                  <CountUp
                                    start={0}
                                    end={TaskOverviewCounter.all_tasks}
                                    delay={0}
                                  >
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                                </span>
                              </Col>
                              <Col>
                                <h1>
                                  <FcCircuit />
                                </h1>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-md-3 col-sm-12">
                        <Card
                          className="card text-white mb-3 py-3 shadow"
                          style={{ backgroundColor: "#010101" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col>
                                <span className="h6 ">Completed </span>
                                <span className="h5 font-bold mb-0">
                                  <CountUp
                                    start={0}
                                    end={TaskOverviewCounter.completed}
                                    delay={0}
                                  >
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                                </span>
                              </Col>
                              <Col>
                                <span className="h6 text-white">
                                  <h1>
                                    <FcApproval />
                                  </h1>
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-md-3 col-sm-12">
                        <Card
                          className="card text-white mb-3 py-3 shadow"
                          style={{ backgroundColor: "#1B1212" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col>
                                <span className="h6 ">Pending </span>
                                <span className="h5 font-bold mb-0">
                                  <CountUp
                                    start={0}
                                    end={TaskOverviewCounter.not_completed}
                                    delay={0}
                                  >
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                                </span>
                              </Col>
                              <Col>
                                <span className="h6 text-white ">
                                  <h1>
                                    <FcInfo />
                                  </h1>
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-md-3 col-sm-12">
                        <Card
                          className="card text-white mb-3 py-3"
                          style={{ backgroundColor: "#391A1A" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col>
                                <span className="h6 ">Over Due </span>
                                <span className="h5 font-bold mb-0">
                                  <CountUp
                                    start={0}
                                    end={TaskOverviewCounter.over_due}
                                    delay={0}
                                  >
                                    {({ countUpRef }) => (
                                      <div>
                                        <span ref={countUpRef} />
                                      </div>
                                    )}
                                  </CountUp>
                                </span>
                              </Col>
                              <Col>
                                <span className="h6 text-white ">
                                  <h1>
                                    <FcHighPriority />
                                  </h1>
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={7}>
                <Card className="shadow">
                  <Card.Header>
                    My Tasks{" "}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleShow_Members_Chart_task}
                    >
                      Task progress{" "}
                    </Button>{" "}
                  </Card.Header>
                  <Card.Body style={{ height: "367px" }}>
                  <Nav  className="justify-content-end">
                 <div  className="col-md-3 col-sm-9">
                   <Form onSubmit={handle_Search_Task_Submit} className="d-flex">
                      <FormControl type="search" name='task_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
                    <Table  size="sm" striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name </th>
                          <th>Status </th>
                          <th>Completion Date</th>
                          <th> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {UserOpenTasksData.slice(0, 5).map((task, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{task.name}</td>
                              <td>{task.task_status.name}</td>
                              <td>{new Date(task.due_date).toDateString()}</td>
                              <td className="text-center">
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  onClick={() => selectTask(task)}
                                >
                                  Select
                                </Button>{" "}
                                <button
                                  size="sm"
                                  onClick={() => selectTask(task)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleShow_update_Task}
                                  >
                                    Update
                                  </Button>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleShow_Members_task}
                      >
                        All{" "}
                      </Button>
                    </>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card fluid className="shadow">
                  <Card.Header>
                    Task Details for <b>{taskValue.name}</b>{" "}
                  </Card.Header>
                  <Card.Body style={{ height: "367px" }}>
                    <Row>
                      <Col>Enviroment :</Col>
                      <Col>
                        <p>{taskValue.environment}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Kick Off Date</Col>
                      <Col>
                        <p>{taskValue.kickoff_date}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Due Date</Col>
                      <Col>
                        <p>{taskValue.due_date}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Last Updated:</Col>
                      <Col>
                        <p>{taskValue.last_update}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Days Left :</Col>
                      <Col>
                        <Badge pill bg="success">
                          <CountUp
                            start={0}
                            end={taskValue.days_left}
                            delay={0}
                          >
                            {({ countUpRef }) => (
                              <div>
                                <span ref={countUpRef} />
                              </div>
                            )}
                          </CountUp>
                        </Badge>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>Task Comment :</Col>
                      <Col>
                        <Form.Control
                          readOnly
                          as="textarea"
                          placeholder="task comment here"
                          style={{ height: "100px" }}
                          value={taskValue.task_comment}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="text-center"></Card.Footer>
                </Card>
              </Col>
            </Row>
            -
          </Container>
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <Container fluid>
            <Row>
              <Col>
                <Card fluid className="shadow">
                  <Card.Header>Assigned projects</Card.Header>
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="bet_projects"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="bet_projects" title="Bet Projects">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_bet_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="country" title="Country">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_country_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="customerJourney" title="Customer">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_customer_journey_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="integrations" title="Integrations">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_integrations_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="pay_methods" title="Payments">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_payment_methods_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="digital" title="Digital Marketing">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_digital_marketing_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="betsoftware" title="Bet Software Partners">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Category</th>
                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_bet_partners_projectData.map(
                                  (project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.project.name}</td>
                                        <td> {project.project_type.name}</td>
                                        <td>{project.user_status.name}</td>
                                        <td>
                                          {new Date(
                                            project.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            project.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={
                                                handleShowUpdateProjectAssign
                                              }
                                            >
                                              update
                                            </Button>
                                          </button>{" "}
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() =>
                                              selectProjectAssignment(project)
                                            }
                                          >
                                            Select
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                      <Tab eventKey="all" title="All">
                        <Row md={9}>
                          <Col sm={8}>
                            <Table size='sm'  striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>

                                  <th>Status</th>
                                  <th> Due Date </th>
                                  <th> Kickoff Date </th>
                                  <th>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assign_all_projects.map((project, Index) => {
                                  return (
                                    <tr key={Index}>
                                      <td>{project.project.name}</td>
                                      <td>{project.user_status.name}</td>
                                      <td>
                                        {new Date(
                                          project.due_date
                                        ).toDateString()}
                                      </td>
                                      <td>
                                        {new Date(
                                          project.kickoff_date
                                        ).toDateString()}
                                      </td>
                                      <td className="text-center">
                                        <button
                                          size="sm"
                                          onClick={() =>
                                            selectProjectAssignment(project)
                                          }
                                        >
                                          <Button
                                            size="sm"
                                            variant="outline-success"
                                            onClick={
                                              handleShowUpdateProjectAssign
                                            }
                                          >
                                            update
                                          </Button>
                                        </button>{" "}
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={() =>
                                            selectProjectAssignment(project)
                                          }
                                        >
                                          Select
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </Col>
                          <Col>
                            <Card fluid className="shadow">
                              <Card.Header>Project Details</Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col>Name :</Col>
                                  <Col>
                                    <p>{projectValue.name}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Status :</Col>
                                  <Col>
                                    <p>{projectValue.status}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Last Update</Col>
                                  <Col>
                                    <p>{projectValue.last_update}</p>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Resources:</Col>
                                  <Col>
                                    {" "}
                                    <Table size="sm" striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>Name</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {assigned_members_projects
                                          .slice(0, 3)
                                          .map((project, Index) => {
                                            return (
                                              <tr key={Index}>
                                                <td>{project.user.name}</td>
                                                <td>
                                                  {" "}
                                                  {project.user_status.name}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                                <hr />
                                <Row>
                                  <Col>Progress:</Col>
                                  <Col>
                                    <ProgressBar
                                      now={projectValue.progress}
                                      variant={projectValue.level}
                                      label={`${projectValue.progress}%`}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>To Completition :</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={100 - projectValue.progress}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />%
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                                <br />
                                <Row>
                                  <Col>
                                    <Label>BRD: </Label>
                                  </Col>
                                  <Col>
                                    <a
                                      href={
                                        projectValue.business_request_document_link
                                      }
                                      download
                                    >
                                      <h3>
                                        <FcDownload />
                                      </h3>{" "}
                                    </a>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>PM</Col>
                                  <Col>
                                    <Label>{projectValue.pm}</Label>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>Priority :</Col>
                                  <Col>
                                    <Label>{projectValue.priority_type}</Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Due Date</Col>
                                  <Col>
                                    <Label>
                                      {projectAssignmentValue.due_date}
                                    </Label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>Days Left :</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={projectAssignmentValue.days_left}
                                        delay={0}
                                      >
                                        {({ countUpRef }) => (
                                          <div>
                                            <span ref={countUpRef} />
                                          </div>
                                        )}
                                      </CountUp>
                                    </Badge>
                                  </Col>
                                </Row>
                              </Card.Body>
                              <Card.Footer>
                                <small className="text-muted">.</small>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Row>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button variant="success" onClick={handleProjectsShow}>
                      All
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
        </Card.Body>
      </Card>
    
      <div>
        {/* Team Projects */}
        <Modal show={show} onHide={handleProjectsClose} fullscreen={true}>
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Team Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              defaultActiveKey="bet_projects"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="bet_projects" title="Bet Projects">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>

                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_bet_projectData.map((project, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{project.project.name}</td>
                              <td>{project.user_status.name}</td>
                              <td>
                                {new Date(project.due_date).toDateString()}
                              </td>
                              <td>
                                {new Date(project.kickoff_date).toDateString()}
                              </td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  <Button
                                    size="sm"
                                    variant="outline-success"
                                    onClick={handleShowUpdateProjectAssign}
                                  >
                                    Details
                                  </Button>
                                </button>{" "}
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="country" title="Country">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_country_projectData.map((project, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{project.project.name}</td>
                              <td> {project.project_type.name}</td>
                              <td>{project.user_status.name}</td>
                              <td>
                                {new Date(project.due_date).toDateString()}
                              </td>
                              <td>
                                {new Date(project.kickoff_date).toDateString()}
                              </td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  <Button
                                    size="sm"
                                    variant="outline-success"
                                    onClick={handleShowUpdateProjectAssign}
                                  >
                                    update
                                  </Button>
                                </button>{" "}
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="customerJourney" title="Customer">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_customer_journey_projectData.map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.project.name}</td>
                                <td> {project.project_type.name}</td>
                                <td>{project.user_status.name}</td>
                                <td>
                                  {new Date(project.due_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    project.kickoff_date
                                  ).toDateString()}
                                </td>
                                <td className="text-center">
                                  <button
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={handleShowUpdateProjectAssign}
                                    >
                                      update
                                    </Button>
                                  </button>{" "}
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    Select
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="integrations" title="Integrations">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_integrations_projectData.map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.project.name}</td>
                                <td> {project.project_type.name}</td>
                                <td>{project.user_status.name}</td>
                                <td>
                                  {new Date(project.due_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    project.kickoff_date
                                  ).toDateString()}
                                </td>
                                <td className="text-center">
                                  <button
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={handleShowUpdateProjectAssign}
                                    >
                                      update
                                    </Button>
                                  </button>{" "}
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    Select
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="pay_methods" title="Payments">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_payment_methods_projectData.map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.project.name}</td>
                                <td> {project.project_type.name}</td>
                                <td>{project.user_status.name}</td>
                                <td>
                                  {new Date(project.due_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    project.kickoff_date
                                  ).toDateString()}
                                </td>
                                <td className="text-center">
                                  <button
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={handleShowUpdateProjectAssign}
                                    >
                                      update
                                    </Button>
                                  </button>{" "}
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    Select
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="digital" title="Digital Marketing">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_digital_marketing_projectData.map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.project.name}</td>
                                <td> {project.project_type.name}</td>
                                <td>{project.user_status.name}</td>
                                <td>
                                  {new Date(project.due_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    project.kickoff_date
                                  ).toDateString()}
                                </td>
                                <td className="text-center">
                                  <button
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={handleShowUpdateProjectAssign}
                                    >
                                      update
                                    </Button>
                                  </button>{" "}
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    Select
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="betsoftware" title="Bet Software Partners">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm' striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_bet_partners_projectData.map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.project.name}</td>
                                <td> {project.project_type.name}</td>
                                <td>{project.user_status.name}</td>
                                <td>
                                  {new Date(project.due_date).toDateString()}
                                </td>
                                <td>
                                  {new Date(
                                    project.kickoff_date
                                  ).toDateString()}
                                </td>
                                <td className="text-center">
                                  <button
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      onClick={handleShowUpdateProjectAssign}
                                    >
                                      update
                                    </Button>
                                  </button>{" "}
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() =>
                                      selectProjectAssignment(project)
                                    }
                                  >
                                    Select
                                  </Button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="all" title="All">
                <Row md={9}>
                  <Col sm={8}>
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>

                          <th>Status</th>
                          <th> Due Date </th>
                          <th> Kickoff Date </th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assign_all_projects.map((project, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{project.project.name}</td>
                              <td>{project.user_status.name}</td>
                              <td>
                                {new Date(project.due_date).toDateString()}
                              </td>
                              <td>
                                {new Date(project.kickoff_date).toDateString()}
                              </td>
                              <td className="text-center">
                                <button
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  <Button
                                    size="sm"
                                    variant="outline-success"
                                    onClick={handleShowUpdateProjectAssign}
                                  >
                                    update
                                  </Button>
                                </button>{" "}
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() =>
                                    selectProjectAssignment(project)
                                  }
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Card fluid className="shadow">
                      <Card.Header>Project Details</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>Name :</Col>
                          <Col>
                            <p>{projectValue.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Status :</Col>
                          <Col>
                            <p>{projectValue.status}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Last Update</Col>
                          <Col>
                            <p>{projectValue.last_update}</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Resources:</Col>
                          <Col>
                            {" "}
                            <Table size="sm" striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assigned_members_projects
                                  .slice(0, 3)
                                  .map((project, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{project.user.name}</td>
                                        <td> {project.user_status.name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>Progress:</Col>
                          <Col>
                            <ProgressBar
                              now={projectValue.progress}
                              variant={projectValue.level}
                              label={`${projectValue.progress}%`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>To Completition :</Col>
                          <Col>
                            <Badge pill bg="danger">
                              <CountUp
                                start={0}
                                end={100 - projectValue.progress}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <Label>BRD: </Label>
                          </Col>
                          <Col>
                            <a
                              href={projectValue.business_request_document_link}
                              download
                            >
                              <h3>
                                <FcDownload />
                              </h3>{" "}
                            </a>
                          </Col>
                        </Row>
                        <Row>
                          <Col>PM</Col>
                          <Col>
                            <Label>{projectValue.pm}</Label>
                          </Col>
                        </Row>

                        <Row>
                          <Col>Priority :</Col>
                          <Col>
                            <Label>{projectValue.priority_type}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Due Date</Col>
                          <Col>
                            <Label>{projectAssignmentValue.due_date}</Label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Days Left :</Col>
                          <Col>
                            <Badge pill bg="success">
                              <CountUp
                                start={0}
                                end={projectAssignmentValue.days_left}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">.</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleProjectsClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Team Add Task  */}

        {/* Member Projects or Tasks*/}
        <Modal
          show={show_member_task}
          onHide={handleClose_Member_task}
          size="xl"
        >
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Tasks </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Nav  className="justify-content-end">
                 <div  className="col-md-3 col-sm-9">
                   <Form onSubmit={handle_Search_Task_Modal_Submit} className="d-flex">
                      <FormControl type="search" name='task_search' placeholder="Search" required onChange={handleChange} className="mr-3" aria-label="Search" />
                      <Button variant="outline-success" type='submit' size='sm'>Search</Button>
                    </Form>
                  </div>
                  </Nav>
            <Tabs
              defaultActiveKey="open"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="open" title="Open">
                <Table disabled striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> enviroment</th>
                      <th> Status </th>
                      <th> Due date </th>
                      <th> Kickoff date </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {UserOpenTasksData.map((task, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{task.name}</td>
                          <td>{task.environment.name}</td>
                          <td>{task.task_status.name}</td>
                          <td>{new Date(task.due_date).toDateString()}</td>
                          <td>{new Date(task.kickoff_date).toDateString()}</td>
                          <td className="text-center">
                            <button size="sm" onClick={() => selectTask(task)}>
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={handleClose_Member_task}
                              >
                                Select
                              </Button>{' '}
                              
                            </button>{' '}<button
                                  size="sm"
                                  onClick={() => selectTask(task)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleShow_update_Task}
                                  >
                                    Update
                                  </Button>
                                </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="over due" title="Over-due">
                <Table disabled striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> enviroment</th>
                      <th> Status </th>
                      <th> Due date </th>
                      <th> Kickoff date </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {UserOverDueTasksData.map((task, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{task.name}</td>
                          <td>{task.environment.name}</td>
                          <td>{task.task_status.name}</td>
                          <td>{new Date(task.due_date).toDateString()}</td>
                          <td>{new Date(task.kickoff_date).toDateString()}</td>
                          <td className="text-center">
                            <button size="sm" onClick={() => selectTask(task)}>
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={handleClose_Member_task}
                              >
                                Select
                              </Button>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="complete" title="Completed">
                <Table disabled striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> enviroment</th>
                      <th> Status </th>
                      <th> Due date </th>
                      <th> Kickoff date </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {UserCompletedTasksData.map((task, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{task.name}</td>
                          <td>{task.environment.name}</td>
                          <td>{task.task_status.name}</td>
                          <td>{new Date(task.due_date).toDateString()}</td>
                          <td>{new Date(task.kickoff_date).toDateString()}</td>
                          <td className="text-center">
                            <button size="sm" onClick={() => selectTask(task)}>
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={handleClose_Member_task}
                              >
                                Select
                              </Button>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="all" title="All">
                <Table size='sm'  striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> enviroment</th>
                      <th> Status </th>
                      <th> Due date </th>
                      <th> Kickoff date </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {UserAllTasksData.map((task, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{task.name}</td>
                          <td>{task.environment.name}</td>
                          <td>{task.task_status.name}</td>
                          <td>{new Date(task.due_date).toDateString()}</td>
                          <td>{new Date(task.kickoff_date).toDateString()}</td>
                          <td className="text-center">
                            <button size="sm" onClick={() => selectTask(task)}>
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={handleClose_Member_task}
                              >
                                Select
                              </Button>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleClose_Member_task}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Member Projects or Tasks*/}
        <Modal
          show={show_member_progress_chart}
          onHide={handleClose_Member_Chart_task}
          size="md"
        >
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Task Progress </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width: "400px" }}>
              <Doughnut data={task_overview_data} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose_Member_Chart_task}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show_Update_task}
          onHide={handleClose_Update_task}
          size="md"
        >
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitTaskUpdate}>
              <FormGroup>
                <Label> Name : </Label>
                <Input
                  name="name"
                  placeholder="with a Project Or Task Name"
                  type="text"
                  onChange={handleChange}
                  value={taskFormValue.name}
                  disabled
                  required
                />
              </FormGroup>

              <Form.Group className="mb-3">
                <Form.Label>Task Status</Form.Label>
                <Form.Select
                  name="task_status_id"
                  id="task_status_id"
                  onChange={handleChange}
                  value={taskFormValue.task_status_id}
                  required
                >
                  <option value="">Select Task Status</option>
                  {TaskStatus.map((task_status, key) => {
                    return (
                      <option key={key} value={task_status.id}>
                        {task_status.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <br />
              <Button variant="success" size="sm" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose_Update_task}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/*  Projects */}
        <Modal
          show={showUpdateProjectAssign}
          onHide={handleCloseUpdateProjectAssign}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <u>
                <i>{projectAssignmentValue.name}</i>{" "}
              </u>{" "}
              Details{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Header>
                Assign Details: <label className="text-end">w</label>
              </Card.Header>
              <Card.Body fluid>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    <p>{projectAssignmentValue.user_status}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Kickoff Date :</Col>
                  <Col>
                    <p>{projectAssignmentValue.kickoff_date}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Due Date :</Col>
                  <Col>
                    <p>{projectAssignmentValue.due_date}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Last Update :</Col>
                  <Col>
                    <p>{projectAssignmentValue.last_update}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Update Status:</Col>
                  <Col>
                    <Form onSubmit={handleSubmitUpdateProject}>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <Form.Group className="mb-3">
                            <Form.Select
                              name="user_status_id"
                              id="user_status_id"
                              onChange={handleChange}
                              value={projectAssignmentFormValue.user_status_id}
                              required
                            >
                              <option value="">Select Status</option>
                              {UserStatus.map((task_status, key) => {
                                return (
                                  <option key={key} value={task_status.id}>
                                    {task_status.name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="primary"
                            size="sm"
                            type="submit"
                            className="mb-3"
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Assigned With : <br />{" "}
                    <Table size='sm'  striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assigned_members_projects
                          .slice(0, 3)
                          .map((project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.user.name}</td>
                                <td> {project.user_status.name}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Header>Project Details</Card.Header>

              <Card.Body fluid>
                <Row>
                  <Col>Name</Col>
                  <Col>
                    <p>{projectValue.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>PM :</Col>
                  <Col>
                    <p>{projectValue.pm}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Project Category :</Col>
                  <Col>
                    <p>{projectValue.project_category}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Project Type:</Col>
                  <Col>
                    <p>{projectValue.project_type}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>BRD :</Col>
                  <Col>
                    <Form.Select
                      size="sm"
                      value={projectValue.business_request_document_status}
                      disabled
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <p>{projectValue.status}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Priority :</Col>
                  <Col>
                    <p>{projectValue.priority_type}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Last Update</Col>
                  <Col>
                    <p>{projectValue.last_update}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>Progress Effect</Col>
                  <Col>
                    <Badge pill bg="danger">
                      <CountUp start={0} end={projectValue.progress} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <span ref={countUpRef} />%
                          </div>
                        )}
                      </CountUp>
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <label className="text-center">
              update project assignment record
            </label>
          </Modal.Footer>
        </Modal>
{/* Completed Confirmation Live Issue */}
   {/*  Task */}
   <Modal  show={show_Complete_Task}  onHide={handleCloseSuccessCompleted} backdrop="static" size='md' keyboard={false}  >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  confirm that <b>{taskValue.user} completed </b><b>{taskValue.name}</b> task. 
                  Are you Sure?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" size='sm'  onClick={handleCloseSuccessCompleted}>
                      No
                    </Button>
                    <Button variant="primary" size='sm'  onClick={handle_Complete_Task}>Yes</Button>
                  </Modal.Footer>
                   {/*  Error Update  */}
          <Toast
            onClose={handleCloseErrorUpdate}
            show={error_updated}
            bg={"warning"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              please check input or task already assigned
            </Toast.Body>
          </Toast>
                </Modal>
        {/* Toast Arlets */}

        <ToastContainer className="p-3" position={"top-end"}>
          {/* Successfully Updated */}
          <Toast
            onClose={handleCloseSuccessUpdate}
            show={success_updated}
            bg={"success"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{<FcApproval/>}{' '}Successfully</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Updated Successfully
            </Toast.Body>
          </Toast>
          {/*  Error Update  */}
          <Toast
            onClose={handleCloseErrorUpdate}
            show={error_updated}
            bg={"warning"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              please check input or task already assigned
            </Toast.Body>
          </Toast>
                    {/* Duplicate Toast */}
          <Toast onClose={handleCloseDuplicateUpdate} show={duplicate_updated} bg={'warning'} delay={5000} autohide>
                              <Toast.Header>
                                <img
                                  src="holder.js/20x20?text=%20"
                                  className="rounded me-2"
                                  alt=""
                                />
                                <strong className="me-auto">Error</strong>
                              
                              </Toast.Header>
                              <Toast.Body className='text-white'>status already assigned</Toast.Body>
                            </Toast>
                              {/* Successfully Completed */}
          <Toast
            onClose={handleCloseSuccessComplete}
            show={success_completed}
            bg={"success"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{<FcApproval/>}{' '}Completed</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Task Completed Successfully
            </Toast.Body>
          </Toast>
          {/*  Server Error  */}
          <Toast
            onClose={handleCloseServerError}
            show={server_error}
            bg={"danger"}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Server Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">server error occured</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

export default DashBoardDev;
