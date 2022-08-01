import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Table,
  Tab,
  Button,
  Form,
  Modal,
  Col,
  Tabs,
  Toast,
  ToastContainer,
  InputGroup,
  FormControl,
  Nav,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";

import { FcApproval } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import "chart.js/auto";

import { URL } from "../../../server_connections/server";

import AssignProject from "./AssignProject";
import { Pie } from "react-chartjs-2";

function ManageTeam() {
  // search state
  const [search_key, set_search_key] = useState({
    task_search: null,
  });
  // create date condition toasts
  // Kick off date less than today/now
  const [kickoff_date_less_now, set_kickoff_date_less_now] = useState(false);
  const handleShowKODateLessNow = () => set_kickoff_date_less_now(true);
  const handleCloseKODateLessNow = () => set_kickoff_date_less_now(false);
  // Kick off date less than due date
  const [kickoff_date_less_due_date, set_kickoff_date_less_due_date] =
    useState(false);
  const handleShowKODateLessDue = () => set_kickoff_date_less_due_date(true);
  const handleCloseKODateLessDue = () => set_kickoff_date_less_due_date(false);
  // Due  date less than now
  const [due_date_less_now, set_due_date_less_now] = useState(false);
  const handleShowDueDateLessNOW = () => set_due_date_less_now(true);
  const handleCloseDueDateLessNOW = () => set_due_date_less_now(false);
  // Due off date less than kickoff
  const [due_date_less_kickoff, set_due_date_less_kickoff] = useState(false);
  const handleShowDueDateLessKO = () => set_due_date_less_kickoff(true);
  const handleCloseDueDateLessKO = () => set_due_date_less_kickoff(false);

  // Toast Alerts State Controller
  const [success_create, set_success_create] = useState(false);
  const handleShowsuccessCreate = () => set_success_create(true);
  const handleCloseSuccessCreate = () => set_success_create(false);
  // Create Toaster Error
  const [error_create, set_error_create] = useState(false);
  const handleShowErrorCreate = () => set_error_create(true);
  const handleCloseErrorCreate = () => set_error_create(false);

  // Create Toaster Error
  const [limit_reached, set_limit_reached] = useState(false);
  const handleShowLimitReached = () => set_limit_reached(true);
  const handleCloseLimitReached = () => set_limit_reached(false);

  // Update Toaster
  const [success_updated, set_success_updated] = useState(false);
  const handleShowsuccessUpdate = () => set_success_updated(true);
  const handleCloseSuccessUpdate = () => set_success_updated(false);
  // update  error toast controller
  const [error_updated, set_error_updated] = useState(false);
  const handleShowErrorUpdate = () => set_error_updated(true);
  const handleCloseErrorUpdate = () => set_error_updated(false);
  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);
  // delete success toast controller
  const [success_delete, set_success_delete] = useState(false);
  const handleShowSuccessDelete = () => set_success_delete(true);
  const handleCloseSuccessDelete = () => set_success_delete(false);
  // delete success toast controller
  const [error_delete, set_error_delete] = useState(false);
  const handleShowErrorDelete = () => set_error_delete(true);
  const handleCloseErrorDelete = () => set_error_delete(false);
  // Active Toaster
  const [success_active, set_success_active] = useState(false);
  const handleShowsuccessActive = () => set_success_active(true);
  const handleCloseSuccessActive = () => set_success_active(false);
  //No Active Toaster
  const [success_de_activated, set_success_de_activated] = useState(false);
  const handleShowsuccessDeActive = () => set_success_de_activated(true);
  const handleCloseSuccessDeActive = () => set_success_de_activated(false);
  //Error Toaster
  const [error_occured, set_error] = useState(false);
  const handleShowError = () => set_error(true);
  const handleCloseError = () => set_error(false);
  // ############################################################
  const [loader, setloader] = useState(true);
  const handleLoaderClose = () => setloader(false);

  setTimeout(() => {
    handleLoaderClose();
  }, 4000);

  const history = useNavigate();
  const [TeamMembers, setTeamMembers] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [TaskStatus, setTaskStatus] = useState([]);

  // Team Task States
  const [teamOpenTasksData, setTeamOpenTasksData] = useState([]);
  const [teamAllTasksData, setTeamAllTasksData] = useState([]);
  const [TeamNotActiveTasksData, setTeamNotActiveTasksData] = useState([]);
  const [teamActiveTasksData, setTeamActiveTasksData] = useState([]);
  const [teamCompletedTasksData, setTeamCompletedTasksData] = useState([]);
  const [teamOverDueTasksData, setTeamOverDueTasksData] = useState([]);
  // User or Dev Task States
  const [UserAllTasksData, setUserAllTasksData] = useState([]);
  const [UserCompletedTasksData, setUserCompletedTasksData] = useState([]);
  const [UserNotActiveTasksData, setUserNotActiveTasksData] = useState([]);
  const [UserActiveTasksData, setUserActiveTasksData] = useState([]);
  const [UserOverDueTasksData, setUserOverDueTasksData] = useState([]);
  const [UserOpenTasksData, setUserOpenTasksData] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    name: " ",
    last_name: "",
    team_id: 0,
  });
  const [environmentValue, setEnvironmentValue] = useState([]);

  // assignement state Data
  //project assignemnt Data
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
  const [assign_all_projectData, set_assign_all_ProjectData] = useState([]);

  //over due project assignemnt Data
  const [over_due_assign_projectData, set_over_due_assign_ProjectData] =
    useState({});
  const [over_due_assign_bet_projectData, set_over_due_assign_bet_ProjectData] =
    useState([]);
  const [
    over_due_assign_bet_partners_projectData,
    set_over_due_assign_bet_partners_ProjectData,
  ] = useState([]);
  const [
    over_due_assign_country_projectData,
    set_over_due_assign_country_ProjectData,
  ] = useState([]);
  const [
    over_due_assign_customer_journey_projectData,
    set_over_due_assign_customer_journey_ProjectData,
  ] = useState([]);
  const [
    over_due_assign_digital_marketing_projectData,
    set_over_due_assign_digital_marketing_ProjectData,
  ] = useState([]);
  const [
    over_due_assign_integrations_projectData,
    set_over_due_assign_integrations_ProjectData,
  ] = useState([]);
  const [
    over_due_assign_payment_methods_projectData,
    set_over_due_assign_payment_methods_ProjectData,
  ] = useState([]);
  const [over_due_assign_all_projectData, set_over_due_assign_all_ProjectData] =
    useState([]);

  //  ########## MODALS ##########3
  // for update modal Task List
  const [showMemberTaskList, setMemberTaskList] = useState(false);
  const handleMemberTaskListShow = () => setMemberTaskList(true);
  const handleMemberTaskListClose = () => setMemberTaskList(false);
  // for update modal
  const [showUpdateTask, setUpdateTaskShow] = useState(false);
  const handleUpdateTaskShow = () => setUpdateTaskShow(true);
  const handleUpdateTaskClose = () => {
    setUpdateTaskShow(false);
    setAssignProjectFormValue({
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
    });
    setTaskFormValue({
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
      id: 0,
    });
  };
  // for activate modal
  const [showactivateTask, setActiveTaskShow] = useState(false);
  const handleShowActivateTask = () => setActiveTaskShow(true);
  const handleCloseActivateTask = () => setActiveTaskShow(false);
  // for activate modal
  const [showdeactivateTask, setDeActiveTaskShow] = useState(false);
  const handleShowDeActivateTask = () => setDeActiveTaskShow(true);
  const handleCloseDeActivateTask = () => setDeActiveTaskShow(false);

  // // for Add Modal Task
  const [show_Add_task, setAddTask] = useState(false);
  const handleAddTaskShow = () => setAddTask(true);
  const handleAddTaskClose = () => {
    setAddTask(false);
    setAssignProjectFormValue({
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
    });
    setTaskFormValue({
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
      id: 0,
    });
  };
  // // for Delete Task
  const [show_Delete_task, setDeleteTask] = useState(false);
  const handleDeleteTaskShow = () => setDeleteTask(true);
  const handleDeleteTaskClose = () => setDeleteTask(false);

  // For Add Project Assignment
  const [show_Add_Assignment, setAddAssignmnet] = useState(false);
  const handleAddAssignmentShow = () => setAddAssignmnet(true);
  const handleAddAssignmentClose = () => setAddAssignmnet(false);
  // Overview  modal
  const [show_member_Overview, setshow_member_Overview] = useState(false);
  const handleOverviewShow = () => setshow_member_Overview(true);
  const handleOverviewClose = () => {
    setshow_member_Overview(false);
    setUser({
      id: 0,
      name: " ",
      last_name: "",
      team_id: 0,
    });
  };

  // ### UPDATE ASSIGN MODAL STATES CONTROLLERS
  // for update  project assignemnt record
  const [showUpdateProjectAssign, setUpdateProjectAssign] = useState(false);
  const handleShowUpdateProjectAssign = () => setUpdateProjectAssign(true);
  const handleCloseUpdateProjectAssign = () => {
    setUpdateProjectAssign(false);
    setAssignProjectFormValue({
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
      due_date_Date_value: "",
      due_date_time_value: "",
    });
  };

  // ### UN ASSIGN MODAL STATES CONTROLLERS
  // remove record for assign member confirmation modal bet projects
  const [showconfirmDelete, setshowconfirmDelete] = useState(false);
  const handleShowConfirmationDelete = () => setshowconfirmDelete(true);
  const handleCloseConfirmationDelete = () => setshowconfirmDelete(false);

  // user over task status
  const [user_task_statuses, set_user_task_statuses] = useState([]);
  const [AssignProjectFormValue, setAssignProjectFormValue] = useState({
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
    due_date_Date_value: "",
    due_date_time_value: "",
  });

  //Task Assign And Form States
  const [taskFormValue, setTaskFormValue] = useState({
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
    id: 0,
  });
  // Keeps track of changes in the database
  const [
    old_team_projects_assignment_data,
    set_old_team_projects_assignment_data,
  ] = useState([]);
  const [
    old_team_over_due_projects_assignment_data,
    set_old_team_over_due_projects_assignment_data,
  ] = useState([]);
  const [old_team_tasks_data, set_old_team_tasks_data] = useState([]);
  const [old_user_tasks_data, set_old_user_tasks_data] = useState([]);
  function OldData() {
    set_old_team_projects_assignment_data(assign_projectData);
    set_old_team_over_due_projects_assignment_data(over_due_assign_projectData);
    set_old_team_tasks_data(teamAllTasksData);
    set_old_user_tasks_data(UserAllTasksData);
  }

  const latest_over_due_project_assignment_data = useMemo(
    () => old_team_over_due_projects_assignment_data,
    [old_team_over_due_projects_assignment_data]
  );
  const latest_project_assignment_data = useMemo(
    () => old_team_projects_assignment_data,
    [old_team_projects_assignment_data]
  );

  const latest_team_tasks_data = useMemo(
    () => old_team_tasks_data,
    [old_team_tasks_data]
  );
  const latest_user_tasks_data = useMemo(
    () => old_user_tasks_data,
    [old_user_tasks_data]
  );

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    const activeoverview = setInterval(() => {
      //fecth team  project assignments
      fetch(
        `${URL}/api/auth/project_assignment/team/all?team_id=${localStorage.getItem(
          "team"
        )}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((results) => {
          set_assign_ProjectData(results);
          set_assign_bet_ProjectData(results.bet_projects);
          set_assign_bet_partners_ProjectData(
            results.bet_project_partners_projects
          );
          set_assign_country_ProjectData(results.country_projects);
          set_assign_customer_journey_ProjectData(
            results.customer_journey_projects
          );
          set_assign_digital_marketing_ProjectData(
            results.digital_marketing_projects
          );
          set_assign_integrations_ProjectData(results.integrations_projects);
          set_assign_payment_methods_ProjectData(
            results.payment_method_projects
          );
          set_assign_all_ProjectData(results.all_projects);
        });
    }, 3000);
    return () => clearInterval(activeoverview);
  }, [latest_project_assignment_data]);
  // Over due  Assignment
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
    const activeoverview = setInterval(() => {
      //fecth over due team  project assignments

      fetch(
        `${URL}/api/auth/project_assignment/over_due/team/all?team_id=${localStorage.getItem(
          "team"
        )}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((results) => {
          set_over_due_assign_ProjectData(results);
          set_over_due_assign_bet_ProjectData(results.bet_projects);
          set_over_due_assign_bet_partners_ProjectData(
            results.bet_project_partners_projects
          );
          set_over_due_assign_country_ProjectData(results.country_projects);
          set_over_due_assign_customer_journey_ProjectData(
            results.customer_journey_projects
          );
          set_over_due_assign_digital_marketing_ProjectData(
            results.digital_marketing_projects
          );
          set_over_due_assign_integrations_ProjectData(
            results.integrations_projects
          );
          set_over_due_assign_payment_methods_ProjectData(
            results.payment_method_projects
          );
          set_over_due_assign_all_ProjectData(results.all_projects);
        });
    }, 3000);
    return () => clearInterval(activeoverview);
  }, [latest_over_due_project_assignment_data]);

  useEffect(() => {
    // All team Members
    fetch(`${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((Result) => {
        setTeamMembers(Result.data.users);
      });
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all teams (for form use)
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));

    // fetch for environments (for form use)
    fetch(`${URL}/api/auth/environments`, requestOptions)
      .then((response) => response.json())
      .then((results) => setEnvironmentValue(results.data));

    // fetch for task statuses  (for form use)
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTaskStatus(results.data));
  }, []);
  // Team Task Effect
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (search_key.task_search === null || search_key.task_search === "") {
      const activeoverview = setInterval(() => {
        // fetch team tasks
        fetch(
          `${URL}/api/auth/team/tasks?id=${localStorage.getItem("team")}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((Result) => {
            setTeamOpenTasksData(Result.open_tasks);
            setTeamAllTasksData(Result.all_tasks);
            setTeamOverDueTasksData(Result.over_due_tasks);
            setTeamActiveTasksData(Result.active_tasks);
            setTeamCompletedTasksData(Result.completed_tasks);
            setTeamNotActiveTasksData(Result.not_active_tasks);
          });
      }, 3000);
      return () => clearInterval(activeoverview);
    }
  }, [latest_team_tasks_data, search_key.task_search]);

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
    if (search_key.task_search === null || search_key.task_search === "") {
      const activeoverview = setInterval(() => {
        // fetch team tasks
        fetch(
          `${URL}/api/auth/user/tasks?id=${localStorage.getItem(
            "team"
          )}&user_id=${user.id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((Result) => {
            setUserOpenTasksData(Result.open_tasks);
            setUserAllTasksData(Result.all_tasks);
            setUserOverDueTasksData(Result.over_due_tasks);
            setUserActiveTasksData(Result.active_tasks);
            setUserCompletedTasksData(Result.completed_tasks);
            setUserNotActiveTasksData(Result.not_active_tasks);
          });
      }, 3000);
      return () => clearInterval(activeoverview);
    }
  }, [user.id, latest_user_tasks_data, search_key.task_search]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // Member Status Value
    // user task Counter
    fetch(
      `${URL}/api/auth/user/tasks_status?team_id=${localStorage.getItem(
        "team"
      )}&id=${user.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_user_task_statuses(Result));
  }, [user.id]);
  // Time Stamp concatenation
  const dueDate = `${taskFormValue.due_date + " " + taskFormValue.due_time}`;
  const kickoffDate = `${
    taskFormValue.kickoff_date + " " + taskFormValue.kickoff_time
  }`;
  // Create Task
  function handleSubmitTaskCreate(event) {
    event.preventDefault();
    const today = new Date().toISOString();
    var kickoffValue = new Date(kickoffDate).toISOString();
    var due_dateValue = new Date(dueDate).toISOString();

    if (kickoffValue < today) {
      handleShowKODateLessNow();
    } else if (kickoffDate > due_dateValue) {
      handleShowKODateLessDue();
    } else if (due_dateValue < today) {
      handleShowDueDateLessNOW();
    } else if (due_dateValue < kickoffDate) {
      handleShowDueDateLessKO();
    } else {
      fetch(`${URL}/api/auth/task/create`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          task: {
            name: taskFormValue.name,
            team_id: taskFormValue.team_id,
            user_id: taskFormValue.user_id,
            task_status_id: taskFormValue.task_status_id,
            environment_id: taskFormValue.environment_id,
            due_date: dueDate,
            kickoff_date: kickoffDate,
            task_comment: taskFormValue.task_comment,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 201) {
            handleShowsuccessCreate();
            handleAddTaskClose();
            OldData();
          } else if (response.status === 422) {
            handleShowErrorCreate();
          } else if (response.status === 412) {
            handleShowLimitReached();
          } else if (response.status === 500) {
            handleShowServerError();
            handleAddTaskClose();
          } else if (response.status === 401) {
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }
  // Update , Activate and Deactivate Task
  function handleSubmitTaskUpdate(event) {
    event.preventDefault();
    const today = new Date().toISOString();
    var kickoffValue = new Date(kickoffDate).toISOString();
    var due_dateValue = new Date(dueDate).toISOString();

    if (kickoffValue < today) {
      handleShowKODateLessNow();
    } else if (kickoffDate > due_dateValue) {
      handleShowKODateLessDue();
    } else if (due_dateValue < today) {
      handleShowDueDateLessNOW();
    } else if (due_dateValue < kickoffDate) {
      handleShowDueDateLessKO();
    } else {
      fetch(`${URL}/api/auth/task/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          id: taskFormValue.id,
          task: {
            name: taskFormValue.name,
            team_id: taskFormValue.team_id,
            user_id: taskFormValue.user_id,
            task_status_id: taskFormValue.task_status_id,
            environment_id: taskFormValue.environment_id,
            due_date: dueDate,
            kickoff_date: kickoffDate,
            task_comment: taskFormValue.task_comment,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 200) {
            handleShowsuccessUpdate();
            handleUpdateTaskClose();
            OldData();
          } else if (response.status === 422) {
            handleShowErrorUpdate();
          } else if (response.status === 500) {
            handleShowServerError();
            handleUpdateTaskClose();
          } else if (response.status === 401) {
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }

  function handleSubmitActivateTask(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/task/activate`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: taskFormValue.id,
        task: {},
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowsuccessActive();
          handleCloseActivateTask();
          OldData();
        } else if (response.status === 422) {
          handleShowError();
        } else if (response.status === 500) {
          alert("server error occured");
          handleCloseActivateTask();
        } else if (response.status === 401) {
          alert("session expired");
          history("/");
        }
      })
      .then((results) => results.json());
  }

  function handleSubmitDeActivateTask(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/task/deactivate`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: taskFormValue.id,
        task: {},
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowsuccessDeActive();
          handleCloseDeActivateTask();
          OldData();
        } else if (response.status === 422) {
          handleShowError();
        } else if (response.status === 500) {
          handleShowServerError();
          handleCloseDeActivateTask();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }

  // Delete Task
  function handleSubmitDeleteTask(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/task/delete`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: taskFormValue.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handleDeleteTaskClose();
          OldData();
        } else if (response.status !== 200) {
          handleShowErrorDelete();
          handleDeleteTaskClose();
        } else if (response.status === 500) {
          handleShowServerError();
          handleDeleteTaskClose();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }
  // Search Task
  function handle_Search_Task_Submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //search for Team Tasks
    fetch(
      `${URL}/api/auth/team/search?team_id=${localStorage.getItem(
        "team"
      )}&search=${search_key.task_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => {
        setTeamAllTasksData(Result.all_tasks);
        setTeamNotActiveTasksData(Result.not_active_tasks);
        setTeamOverDueTasksData(Result.over_due_tasks);
        setTeamOpenTasksData(Result.open_tasks);
        setTeamActiveTasksData(Result.active_tasks);
      });
  }
  // Search Member Task
  function handle_Search_Member_Task_Submit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //search for Team Tasks
    fetch(
      `${URL}/api/auth/user/search?team_id=${localStorage.getItem(
        "team"
      )}&user_id=${user.id}&search=${search_key.task_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => {
        setUserAllTasksData(Result.all_tasks);
        setUserNotActiveTasksData(Result.not_active_tasks);
        setUserOverDueTasksData(Result.over_due_tasks);
        setUserOpenTasksData(Result.open_tasks);
        setUserActiveTasksData(Result.active_tasks);
      });
  }

  const AssigndueDate = `${
    AssignProjectFormValue.due_date + " " + AssignProjectFormValue.due_time
  }`;

  if (!TeamMembers) {
    return <p>no user</p>;
  }
  // Update Assignment Details
  function handleSubmitUpdateProject(event) {
    event.preventDefault();
    const today = new Date().toISOString();

    var due_dateValue = new Date(AssigndueDate).toISOString();
    if (due_dateValue < today) {
      handleShowDueDateLessNOW();
    } else if (due_dateValue < kickoffDate) {
      handleShowDueDateLessKO();
    } else {
      fetch(`${URL}/api/auth/project_assignment/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
          id: AssignProjectFormValue.id,
          projects_assignment: {
            due_date: AssigndueDate,
            active: AssignProjectFormValue.active,
          },
        }),
      })
        .then((response) => {
          response.json();
          if (response.status === 200) {
            handleCloseUpdateProjectAssign();
            handleShowsuccessUpdate();
            OldData();
          } else if (response.status === 422) {
            handleShowErrorUpdate();
          } else if (response.status === 500) {
            handleShowServerError();
          } else if (response.status === 401) {
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }
  // Remove Assign Record
  function handleSubmitRemoveMemberProject(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/project_assignment/delete`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: AssignProjectFormValue.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handleCloseConfirmationDelete();
          OldData();
        } else if (response.status !== 200) {
          handleShowErrorDelete();
          handleCloseConfirmationDelete();
        } else if (response.status === 500) {
          handleShowServerError();
          handleCloseConfirmationDelete();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }

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

  const handleChange = (event) => {
    setAssignProjectFormValue({
      ...AssignProjectFormValue,
      [event.target.name]: event.target.value,
    });
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    setTaskFormValue({
      ...taskFormValue,
      [event.target.name]: event.target.value,
    });

    set_search_key({
      ...search_key,
      [event.target.name]: event.target.value,
    });
  };
  function selectUser(user) {
    setUser({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      team_id: user.team_id,
    });
  }
  function selectTask(task) {
    setTaskFormValue({
      id: task.id,
      name: task.name,
      environment_id: task.environment.id,
      task_status_id: task.task_status.id,
      team_id: task.team.id,
      kickoff_date: task.kickoff_date,
      last_update: task.updated_at,
      due_date: task.due_date,
      task_comment: task.task_comment,
      created_at: task.inserted_at,
      user_id: task.user.id,
    });
  }

  function selectProject(project) {
    const due_date = new Date(project.due_date);
    const due_date__date_value = due_date.toISOString();
    const due_date__time_value = due_date.toLocaleTimeString();

    setAssignProjectFormValue({
      id: project.id,
      due_date: project.due_date,
      team_id: localStorage.getItem("team"),
      kickoff_date: project.kickoff_date,
      status_id: project.user_status.id,
      active: project.active,
      assign_name: project.user.name,
      project_name: project.project.name,
      due_date_Date_value: due_date__date_value,
      due_date_time_value: due_date__time_value,
    });
  }

  return (
    <div>
      <Container fluid>
        <Card>
          <Card.Header> Projects & Tasks Portal</Card.Header>
          <Card.Body className="teamlead-task-manager">
            <Row>
              <Col sm={4}>
                <Card className="shadow">
                  <Card.Header>Members:</Card.Header>
                  <Card.Body className="teamlead-member-display">
                    <Table size="sm" striped bordered hover>
                      <thead>
                        <tr>
                          <th> Name </th>
                          <th> Last name </th>
                          <th> email </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {TeamMembers.map((user, Index) => {
                          return (
                            <tr key={Index}>
                              <th scope="row">{user.name}</th>
                              <td>{user.last_name}</td>
                              <td>{user.email}</td>

                              <td className="text-center">
                                {/* <button onClick={() => selectUser(user)}><Button variant="outline-success"  onClick={handleAddTaskShow}>Add</Button></button> */}
                                {"  "} {"  "}
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectUser(user)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleMemberTaskListShow}
                                  >
                                    Manage
                                  </Button>
                                </button>
                                {"  "} {"  "}
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectUser(user)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleOverviewShow}
                                  >
                                    Overview
                                  </Button>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={8}>
                <Card className="shadow">
                  <Card.Body className="teamlead-member-management-display">
                    <Tabs
                      defaultActiveKey="tasks"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="tasks" title="Tasks">
                        <Card.Header>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={handleAddTaskShow}
                          >
                            Add Task
                          </Button>
                        </Card.Header>

                        <Card.Body>
                          <Nav className="justify-content-end">
                            <div className="col-md-3 col-sm-9">
                              <Form
                                onSubmit={handle_Search_Task_Submit}
                                className="d-flex"
                              >
                                <FormControl
                                  type="search"
                                  name="task_search"
                                  placeholder="Search"
                                  required
                                  onChange={handleChange}
                                  className="mr-3"
                                  aria-label="Search"
                                />
                                <Button
                                  variant="outline-success"
                                  type="submit"
                                  size="sm"
                                >
                                  Search
                                </Button>
                              </Form>
                            </div>
                          </Nav>
                          <Tabs
                            defaultActiveKey="open"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                          >
                            <Tab eventKey="open" title="Open">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {teamOpenTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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

                            <Tab eventKey="active" title="Active">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {teamActiveTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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
                            <Tab eventKey="over due" title="Over-Due">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {teamOverDueTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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
                            <Tab eventKey="not active" title="Not Active">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {TeamNotActiveTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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
                            <Tab eventKey="completed" title="Completed">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {teamCompletedTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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
                            <Tab eventKey="all" title="All">
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th> Name </th>
                                    <th> enviroment</th>
                                    <th> Status </th>
                                    <th> Due date </th>
                                    <th> Kickoff date </th>
                                    <th> Assigned To </th>
                                    <th>action </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {" "}
                                  {teamAllTasksData.map((task, Index) => {
                                    return (
                                      <tr key={Index}>
                                        <td>{task.name}</td>
                                        <td>{task.environment.name}</td>
                                        <td>{task.task_status.name}</td>
                                        <td>
                                          {new Date(
                                            task.due_date
                                          ).toDateString()}
                                        </td>
                                        <td>
                                          {new Date(
                                            task.kickoff_date
                                          ).toDateString()}
                                        </td>
                                        <td>{task.user.name}</td>
                                        <td className="text-center">
                                          <button
                                            size="sm"
                                            className="btn"
                                            onClick={() => selectTask(task)}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline-success"
                                              onClick={handleUpdateTaskShow}
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
                          </Tabs>
                        </Card.Body>
                      </Tab>
                      <Tab
                        eventKey="project_assignments"
                        title="Project Assignment"
                      >
                        <Card.Header>
                          {" "}
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={handleAddAssignmentShow}
                          >
                            Add Assignmnet
                          </Button>
                        </Card.Header>

                        <Tabs defaultActiveKey="open" className="mb-3">
                          <Tab eventKey="open" title="Open">
                            <Tabs
                              defaultActiveKey="bet_projects"
                              className="mb-3"
                            >
                              <Tab eventKey="bet_projects" title="Bet Projects">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>

                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_bet_projectData.map(
                                      (project, Index) => {
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="country" title="Country">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_country_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="customerJourney" title="Customer">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_customer_journey_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="integrations" title="Integrations">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_integrations_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="pay_methods" title="Payments">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_payment_methods_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="digital" title="Digital Marketing">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_digital_marketing_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab
                                eventKey="betsoftware"
                                title="Bet Software Partners"
                              >
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_bet_partners_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="all" title="All">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {assign_all_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                            </Tabs>
                          </Tab>
                          <Tab eventKey="over due" title="Over due">
                            <Tabs
                              defaultActiveKey="bet_projects"
                              className="mb-3"
                            >
                              <Tab eventKey="bet_projects" title="Bet Projects">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>

                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_bet_projectData.map(
                                      (project, Index) => {
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="country" title="Country">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_country_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="customerJourney" title="Customer">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_customer_journey_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="integrations" title="Integrations">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_integrations_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="pay_methods" title="Payments">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_payment_methods_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="digital" title="Digital Marketing">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_digital_marketing_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab
                                eventKey="betsoftware"
                                title="Bet Software Partners"
                              >
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_bet_partners_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab eventKey="all" title="All">
                                <Table size="sm" striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th> Due Date </th>
                                      <th> Kickoff Date </th>
                                      <th>Assigned</th>
                                      <th>click</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {over_due_assign_all_projectData.map(
                                      (project, Index) => {
                                        return (
                                          <tr key={Index}>
                                            <td>{project.project.name}</td>
                                            <td>
                                              {" "}
                                              {project.project_type.name}
                                            </td>
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
                                            <td>{project.user.name}</td>
                                            <td className="text-center">
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
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
                                              <button
                                                size="sm"
                                                className="btn"
                                                onClick={() =>
                                                  selectProject(project)
                                                }
                                              >
                                                <Button
                                                  size="sm"
                                                  variant="outline-warning"
                                                  onClick={
                                                    handleShowConfirmationDelete
                                                  }
                                                >
                                                  un-assign
                                                </Button>
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </Tab>
                            </Tabs>
                          </Tab>
                        </Tabs>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* modal for updating record details  */}
      <Modal
        show={showMemberTaskList}
        onHide={handleMemberTaskListClose}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update {user.name}'s Tasks</Modal.Title>
        </Modal.Header>{" "}
        <Nav className="justify-content-end">
          <div className="col-md-3 col-sm-9 me-3">
            <Form
              onSubmit={handle_Search_Member_Task_Submit}
              className="d-flex"
            >
              <FormControl
                type="search"
                name="task_search"
                placeholder="Search"
                required
                onChange={handleChange}
                className="mr-3"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit" size="sm">
                Search
              </Button>
            </Form>
          </div>
        </Nav>
        <Modal.Body>
          <Tabs
            defaultActiveKey="open"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="open" title="Open">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th> Action </th>
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
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={handleShowDeActivateTask}
                            >
                              Deactivate
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
                            </Button>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="active" title="Active">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th>action </th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {UserActiveTasksData.map((task, Index) => {
                    return (
                      <tr key={Index}>
                        <td>{task.name}</td>
                        <td>{task.environment.name}</td>
                        <td>{task.task_status.name}</td>
                        <td>{new Date(task.due_date).toDateString()}</td>
                        <td>{new Date(task.kickoff_date).toDateString()}</td>
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={handleShowDeActivateTask}
                            >
                              Deactivate
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
                            </Button>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="not active" title="Not Active">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th>action </th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {UserNotActiveTasksData.map((task, Index) => {
                    return (
                      <tr key={Index}>
                        <td>{task.name}</td>
                        <td>{task.environment.name}</td>
                        <td>{task.task_status.name}</td>
                        <td>{new Date(task.due_date).toDateString()}</td>
                        <td>{new Date(task.kickoff_date).toDateString()}</td>
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleShowActivateTask}
                            >
                              Activate
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
                            </Button>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="over due" title="Over-Due">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th>action </th>
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
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
                            </Button>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="completed" title="Completed">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th>action </th>
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
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
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
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th> Name </th>
                    <th> enviroment</th>
                    <th> Status </th>
                    <th> Due date </th>
                    <th> Kickoff date </th>
                    <th> Assigned To </th>
                    <th>action </th>
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
                        <td>{task.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleUpdateTaskShow}
                            >
                              Update
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={handleShowDeActivateTask}
                            >
                              Deactivate
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={handleShowActivateTask}
                            >
                              Activate
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectTask(task)}
                          >
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={handleDeleteTaskShow}
                            >
                              Delete
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
          <label className="text-center">update user task record</label>
        </Modal.Footer>
        {/* Toast Arlets */}
        <ToastContainer className="p-3" position={"top-end"}>
          {/* Successfully Create */}
          <Toast
            onClose={handleCloseSuccessCreate}
            show={success_create}
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
              <strong className="me-auto">{<FcApproval />} Successfully</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Assigned Successfully
            </Toast.Body>
          </Toast>
          {/* Error Create */}
          <Toast
            onClose={handleCloseErrorCreate}
            show={error_create}
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
              <strong className="me-auto">Error Occured</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              please check input or Record already exists
            </Toast.Body>
          </Toast>

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
              <strong className="me-auto">{<FcApproval />} Successfully</strong>
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
              please check input or value already assigned
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

          {/* Successfully Deleted */}
          <Toast
            onClose={handleCloseSuccessDelete}
            show={success_delete}
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
              <strong className="me-auto">
                {<FcApproval />} Successfully{" "}
              </strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Deleted Successfully
            </Toast.Body>
          </Toast>
          {/* Error Delete  */}
          <Toast
            onClose={handleCloseErrorDelete}
            show={error_delete}
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
              error occurd please refresh the page to confirm if the record
              removed
            </Toast.Body>
          </Toast>

          {/* Successfully Active */}
          <Toast
            onClose={handleCloseSuccessActive}
            show={success_active}
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
              <strong className="me-auto">{<FcApproval />} Successfully</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              Successfully Activate{" "}
            </Toast.Body>
          </Toast>
          {/* Successfully Deactived */}
          <Toast
            onClose={handleCloseSuccessDeActive}
            show={success_de_activated}
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
              <strong className="me-auto">{<FcApproval />} Successfully</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Successfully De activate{" "}
            </Toast.Body>
          </Toast>

          {/* Error   */}
          <Toast
            onClose={handleCloseError}
            show={error_occured}
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
            <Toast.Body className="text-white">error occured</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
      {/* Update Task */}
      <Modal show={showUpdateTask} onHide={handleUpdateTaskClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update{" "}
            <b>
              <u>{taskFormValue.name}</u>{" "}
            </b>{" "}
            Details{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitTaskUpdate}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                {" "}
                Name:{" "}
              </InputGroup.Text>

              <Input
                name="name"
                placeholder="with a Project Or Task Name"
                type="text"
                onChange={handleChange}
                value={taskFormValue.name}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="task_status_id">
                {" "}
                Task Status:{" "}
              </InputGroup.Text>
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
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="environment_id">
                {" "}
                Enviroment:{" "}
              </InputGroup.Text>

              <Form.Select
                name="environment_id"
                id="environment_id"
                onChange={handleChange}
                value={taskFormValue.environment_id}
                required
              >
                <option value="">Select Enviroment</option>
                {environmentValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="team_id">
                {" "}
                Team:{" "}
              </InputGroup.Text>

              <Form.Select
                name="team_id"
                id="team_id"
                onChange={handleChange}
                value={taskFormValue.team_id}
                disabled
                required
              >
                <option value="">Select Team</option>
                {teamValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="user_id">
                {" "}
                Assign To:{" "}
              </InputGroup.Text>
              <Form.Select
                name="user_id"
                id="user_id"
                onChange={handleChange}
                value={taskFormValue.user_id}
                readOnly
                required
              >
                <option value="">Select select</option>
                {TeamMembers.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project-name">
                {" "}
                Start Date:{" "}
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="kickoff_date"
                onChange={handleChange}
                value={taskFormValue.date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="kickoff_time"
                onChange={handleChange}
                value={taskFormValue.time}
                placeholder="time placeholder"
                type="time"
                defaultValue={"23:59"}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project-name">
                {" "}
                Due Date:{" "}
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="due_date"
                onChange={handleChange}
                value={taskFormValue.dueDate}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="due_time"
                onChange={handleChange}
                value={taskFormValue.dueDate}
                placeholder="time placeholder"
                type="time"
                defaultValue={"23:59"}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text className="col-4">Comment :</InputGroup.Text>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="task_comment"
                maxLength={200}
                onChange={handleChange}
                value={taskFormValue.task_comment}
              />
            </InputGroup>
            <br />
            <Button variant="success" size="sm" type="submit">
              Submit
            </Button>{" "}
            <Button variant="warning" size="sm" onClick={handleUpdateTaskClose}>
              Close
            </Button>
          </Form>

          <ToastContainer className="p-3" position={"top-end"}>
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
                please check input or value already assigned
              </Toast.Body>
            </Toast>

            {/* Date Alerts Toast */}
            {/* KIck off Date less than Today */}
            <Toast
              onClose={handleCloseKODateLessNow}
              show={kickoff_date_less_now}
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
                <strong className="me-auto">KICK OFF DATE ERROR</strong>
              </Toast.Header>
              <Toast.Body className="text-white">
                {" "}
                kick off date can't be set to previous dates
              </Toast.Body>
            </Toast>
            {/* Kick off greater than Due Date */}
            <Toast
              onClose={handleCloseKODateLessDue}
              show={kickoff_date_less_due_date}
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
                <strong className="me-auto">KICK OFF DATE ERROR</strong>
              </Toast.Header>
              <Toast.Body className="text-white">
                {" "}
                kick off date can't be set ahead of due date
              </Toast.Body>
            </Toast>
            {/* Due Date  less Than Today*/}
            <Toast
              onClose={handleCloseDueDateLessNOW}
              show={due_date_less_now}
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
                <strong className="me-auto">DUE DATE ERROR</strong>
              </Toast.Header>
              <Toast.Body className="text-white">
                {" "}
                due date can't be set to previous date
              </Toast.Body>
            </Toast>
            {/* Due Date less Than Kick Off */}
            <Toast
              onClose={handleCloseDueDateLessKO}
              show={due_date_less_kickoff}
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
                <strong className="me-auto">DUE DATE ERROR</strong>
              </Toast.Header>
              <Toast.Body className="text-white">
                {" "}
                due date can't be set before kick off date
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">update user record</label>
        </Modal.Footer>
      </Modal>
      {/* De activate and Activate Task */}

      {/* UNASSIGN/Delete Member Assignment MODALS */}

      {/*  Acticvate */}
      <Modal
        show={showactivateTask}
        onHide={handleCloseActivateTask}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Activate Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about activate <b>{taskFormValue.name}</b>
          this task will be displayed to the dev/user interface
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCloseActivateTask}
          >
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitActivateTask}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* de activate  */}
      <Modal
        show={showdeactivateTask}
        onHide={handleCloseDeActivateTask}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>De Activate Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about de activate <b>{taskFormValue.name}</b>
          the user will not be able to access this task.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCloseDeActivateTask}
          >
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitDeActivateTask}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* memeber modal for overview  */}
      <Modal show={show_member_Overview} onHide={handleOverviewClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name}'s Task Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Pie data={task_overview_data} />
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">member overview task report</label>
        </Modal.Footer>
      </Modal>

      {/* Update Assignment MODALS */}

      <Modal
        show={showUpdateProjectAssign}
        onHide={handleCloseUpdateProjectAssign}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update{" "}
            <u>
              <i>{AssignProjectFormValue.project_name}</i>{" "}
            </u>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdateProject}>
            {/* <FormGroup>
                        <Label > Start Date: </Label> <br />
                        <Input  name="kickoff_date" onChange={handleChange} value={AssignProjectFormValue.kickoff_date }  defaultValue={AssignkickoffDate} placeholder="date placeholder" type="date" />
                        <Input  name="kickoff_time" onChange={handleChange} value={AssignProjectFormValue.kickoff_time} placeholder="time placeholder" type="time" />
                    </FormGroup> */}

            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project-name">
                {" "}
                Due Date:{" "}
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="due_date"
                onChange={handleChange}
                value={AssignProjectFormValue.due_date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="due_time"
                onChange={handleChange}
                value={AssignProjectFormValue.due_time}
                placeholder="time placeholder"
                type="time"
                defaultValue={"23:59"}
              />
            </InputGroup>
            <Button variant="primary" size="sm" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <label className="text-center">
            update project assignment record
          </label>
        </Modal.Footer>
        <ToastContainer className="p-3" position={"top-end"}>
          {/* Date Alerts Toast */}
          {/* KIck off Date less than Today */}
          <Toast
            onClose={handleCloseKODateLessNow}
            show={kickoff_date_less_now}
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
              <strong className="me-auto">KICK OFF DATE ERROR</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              kick off date can't be set to previous dates
            </Toast.Body>
          </Toast>
          {/* Kick off greater than Due Date */}
          <Toast
            onClose={handleCloseKODateLessDue}
            show={kickoff_date_less_due_date}
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
              <strong className="me-auto">KICK OFF DATE ERROR</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              kick off date can't be set ahead of due date
            </Toast.Body>
          </Toast>
          {/* Due Date  less Than Today*/}
          <Toast
            onClose={handleCloseDueDateLessNOW}
            show={due_date_less_now}
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
              <strong className="me-auto">DUE DATE ERROR</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              due date can't be set to previous date
            </Toast.Body>
          </Toast>
          {/* Due Date less Than Kick Off */}
          <Toast
            onClose={handleCloseDueDateLessKO}
            show={due_date_less_kickoff}
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
              <strong className="me-auto">DUE DATE ERROR</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {" "}
              due date can't be set before kick off date
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
      {/* Add task */}
      <Modal
        show={show_Add_task}
        onHide={handleAddTaskClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitTaskCreate}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                {" "}
                Name:{" "}
              </InputGroup.Text>

              <Input
                name="name"
                placeholder="with a Project Or Task Name"
                type="text"
                onChange={handleChange}
                value={taskFormValue.name}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="task_status_id">
                {" "}
                Task Status:{" "}
              </InputGroup.Text>

              <Form.Select
                name="task_status_id"
                id="task_status_id"
                onChange={handleChange}
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
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="environment_id">
                {" "}
                Enviroment:{" "}
              </InputGroup.Text>

              <Form.Select
                name="environment_id"
                id="environment_id"
                onChange={handleChange}
                required
              >
                <option value="">Select Enviroment</option>
                {environmentValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="team_id">
                {" "}
                Team:{" "}
              </InputGroup.Text>

              <Form.Select
                name="team_id"
                id="team_id"
                onChange={handleChange}
                value={taskFormValue.team_id}
                disabled
                required
              >
                <option value="">Select Team</option>
                {teamValue.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="user_id">
                {" "}
                Assign To:{" "}
              </InputGroup.Text>

              <Form.Select
                name="user_id"
                id="user_id"
                onChange={handleChange}
                readOnly
                required
              >
                <option value="">Select select</option>
                {TeamMembers.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project-name">
                {" "}
                Start Date:{" "}
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="kickoff_date"
                onChange={handleChange}
                value={taskFormValue.date}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="kickoff_time"
                onChange={handleChange}
                value={taskFormValue.time}
                placeholder="time placeholder"
                type="time"
                defaultValue={"23:59"}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project-name">
                {" "}
                Due Date:{" "}
              </InputGroup.Text>
              <FormControl
                aria-label="Name"
                aria-describedby="project-name"
                name="due_date"
                onChange={handleChange}
                value={taskFormValue.dueDate}
                placeholder="date placeholder"
                type="date"
              />
              <FormControl
                name="due_time"
                onChange={handleChange}
                value={taskFormValue.dueDate}
                placeholder="time placeholder"
                type="time"
                defaultValue={"23:59"}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text className="col-4">Comment :</InputGroup.Text>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                name="task_comment"
                maxLength={200}
                onChange={handleChange}
              />
            </InputGroup>
            <br />
            <Button variant="success" size="sm" type="submit">
              Create Task
            </Button>{" "}
            <Button variant="warning" size="sm" onClick={handleAddTaskClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer className="p-3" position={"top-end"}>
        {/* Date Alerts Toast */}
        {/* KIck off Date less than Today */}
        <Toast
          onClose={handleCloseKODateLessNow}
          show={kickoff_date_less_now}
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
            <strong className="me-auto">KICK OFF DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            kick off date can't be set to previous dates
          </Toast.Body>
        </Toast>
        {/* Kick off greater than Due Date */}
        <Toast
          onClose={handleCloseKODateLessDue}
          show={kickoff_date_less_due_date}
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
            <strong className="me-auto">KICK OFF DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            kick off date can't be set ahead of due date
          </Toast.Body>
        </Toast>
        {/* Due Date  less Than Today*/}
        <Toast
          onClose={handleCloseDueDateLessNOW}
          show={due_date_less_now}
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
            <strong className="me-auto">DUE DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            due date can't be set to previous date
          </Toast.Body>
        </Toast>
        {/* Due Date less Than Kick Off */}
        <Toast
          onClose={handleCloseDueDateLessKO}
          show={due_date_less_kickoff}
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
            <strong className="me-auto">DUE DATE ERROR</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            due date can't be set before kick off date
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal
        show={show_Add_Assignment}
        onHide={handleAddAssignmentClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignProject />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddAssignmentClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* UNASSIGN/Delete Member Assignment MODALS */}

      {/*  Projects Assignment */}
      <Modal
        show={showconfirmDelete}
        onHide={handleCloseConfirmationDelete}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Assigned Member </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove{" "}
          <b>{AssignProjectFormValue.assign_name}</b> from{" "}
          <b>{AssignProjectFormValue.project_name} </b>
          this action can not be undone you will be required to assign the
          member again, if required
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCloseConfirmationDelete}
          >
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitRemoveMemberProject}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  Task */}
      <Modal
        show={show_Delete_task}
        onHide={handleDeleteTaskClose}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{taskFormValue.name}</b> from the
          system this action can not be undone you will be required to create a
          new task
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleDeleteTaskClose}>
            No
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmitDeleteTask}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Arlets */}

      <ToastContainer className="p-3" position={"top-end"}>
        {/* Successfully Create */}
        <Toast
          onClose={handleCloseSuccessCreate}
          show={success_create}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Assigned Successfully</Toast.Body>
        </Toast>
        {/* Error Create */}
        <Toast
          onClose={handleCloseErrorCreate}
          show={error_create}
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
            <strong className="me-auto">Error Occured</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            please check input or Record already exists
          </Toast.Body>
        </Toast>

        {/* Limit Reached */}
        <Toast
          onClose={handleCloseLimitReached}
          show={limit_reached}
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
            <strong className="me-auto">Error Occured</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Limit Reached Can't Assign more projects on This User
          </Toast.Body>
        </Toast>

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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Updated Successfully</Toast.Body>
        </Toast>

        {/* Error Update  */}
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
            please check input or value already assigned
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

        {/* Successfully Deleted */}
        <Toast
          onClose={handleCloseSuccessDelete}
          show={success_delete}
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
            <strong className="me-auto">{<FcApproval />} Successfully </strong>
          </Toast.Header>
          <Toast.Body className="text-white"> Deleted Successfully</Toast.Body>
        </Toast>
        {/* Error Delete  */}
        <Toast
          onClose={handleCloseErrorDelete}
          show={error_delete}
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
            error occurd please refresh the page to confirm if the record
            removed
          </Toast.Body>
        </Toast>

        {/* Successfully Active */}
        <Toast
          onClose={handleCloseSuccessActive}
          show={success_active}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {" "}
            Successfully Activated{" "}
          </Toast.Body>
        </Toast>
        {/* Successfully Deactived */}
        <Toast
          onClose={handleCloseSuccessDeActive}
          show={success_de_activated}
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
            <strong className="me-auto">{<FcApproval />} Successfully</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Successfully De Activate{" "}
          </Toast.Body>
        </Toast>

        {/* Error   */}
        <Toast
          onClose={handleCloseError}
          show={error_occured}
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
          <Toast.Body className="text-white">error occured</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <Modal
          className="loadermodal"
          fullscreen={true}
          show={loader}
          onHide={handleLoaderClose}
          backdrop="static"
          keyboard={false}
        >
          <Spinner animation="grow" className="theSpiner" variant="info" />
        </Modal>
      </Container>
    </div>
  );
}
export default ManageTeam;
