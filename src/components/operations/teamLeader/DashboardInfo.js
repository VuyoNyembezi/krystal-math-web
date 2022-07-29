import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Nav,
  Offcanvas,
  ProgressBar,
  Row,
  Tab,
  Table,
  Tabs,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import CountUp from "react-countup";
import { Label } from "reactstrap";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { FcDownload, FcApproval, FcSearch } from "react-icons/fc";

import { URL } from "../../../server_connections/server";
import AssignProject from "./AssignProject";
import ProjectOverviewChart from "./charts/projects/ProjectOverViewChart";
import TeamLiveIssuesOverviewChart from "./charts/projects/TeamLiveIssueOverViewChart";
import TaskOverviewChart from "./charts/tasks/TasksOverViewChart";
import { Calendar } from "react-calendar";
import { CircularProgressbar } from "react-circular-progressbar";
function DashBoardInfo() {
  const history = useNavigate();
  // Calender state Controller
  const [date, setDate] = useState(new Date());

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

  // Update Toaster
  const [success_live_updated, set_success_live_updated] = useState(false);
  const handleShowsuccessLiveUpdate = () => set_success_live_updated(true);
  const handleCloseSuccessLiveUpdate = () => set_success_live_updated(false);
  // update  error toast controller
  const [error_live_updated, set_error_live_updated] = useState(false);
  const handleShowErrorLiveUpdate = () => set_error_live_updated(true);
  const handleCloseErrorLiveUpdate = () => set_error_live_updated(false);
  // server error toast controller
  const [server_live_error, set_server_live_error] = useState(false);
  const handleShowServerLiveError = () => set_server_live_error(true);
  const handleCloseServerLiveError = () => set_server_live_error(false);
  // Create Toaster Error
  const [limit_reached, set_limit_reached] = useState(false);
  const handleShowLimitReached = () => set_limit_reached(true);
  const handleCloseLimitReached = () => set_limit_reached(false);
  // Toast Alerts State Controller
  const [success_create, set_success_create] = useState(false);
  const handleShowsuccessCreate = () => set_success_create(true);
  const handleCloseSuccessCreate = () => set_success_create(false);
  // Create Toaster Error
  const [error_create, set_error_create] = useState(false);
  const handleShowErrorCreate = () => set_error_create(true);
  const handleCloseErrorCreate = () => set_error_create(false);
  // update  error toast controller
  const [duplicate_live_updated, set_duplicate_live_updated] = useState(false);
  const handleShowDuplicateLiveUpdate = () => set_duplicate_live_updated(true);
  const handleCloseDuplicateLiveUpdate = () =>
    set_duplicate_live_updated(false);

  // completed  live issue toast controller
  const [live_completed, set_live_completed] = useState(false);
  const handleShowLiveCompleted = () => {
    set_live_completed(true);
    handleCompleteLiveIssueClose();
  };
  const handleCloseLiveCompleted = () => set_live_completed(false);

  // server error toast controller
  const [server_error, set_server_error] = useState(false);
  const handleShowServerError = () => set_server_error(true);
  const handleCloseServerError = () => set_server_error(false);

  // Canvas for Live issues control
  const [showLiveIssues, setShowLiveIssues] = useState(false);
  const handleLiveIssuesClose = () => {
    setShowLiveIssues(false);
    setLiveIssueValue({
      name: "",
      business_request_document_link: "",
      business_request_document_status: false,
      inserted_at: "",
      last_update: "",
      pm: "",
      project_status_id: 0,
      project_status: "",
      project_progress: 0,
      project_status_level: "",
      last_status_update: "",
      priority_level: "",
      priority_name: "",
      team_id: 0,
      team_name: "",
      last_status_change: "",
      assigned_date: "",
      id: 0,
    });
    setShowLiveIssuesDetails(false);
    set_search_key({
      live_issue_search: null,
    });
  };
  const handleLiveIssuesShow = () => setShowLiveIssues(true);
  // Canvas for Live Issues Details
  const [showLiveIssuesDetails, setShowLiveIssuesDetails] = useState(false);
  const handleLiveIssuesDetailsClose = () => {
    setShowLiveIssuesDetails(false);
    setLiveIssueValue({
      name: "",
      business_request_document_link: "",
      business_request_document_status: false,
      inserted_at: "",
      last_update: "",
      pm: "",
      project_status_id: 0,
      project_status: "",
      project_progress: 0,
      project_status_level: "",
      last_status_update: "",
      priority_level: "",
      priority_name: "",
      team_id: 0,
      team_name: "",
      last_status_change: "",
      assigned_date: "",
      id: 0,
    });
  };
  const handleLiveIssuesDetailsShow = () => setShowLiveIssuesDetails(true);

  // Complete Confirmation Live Issue
  const [show_Complete_Live_issue, setCompleteLiveIssue] = useState(false);
  const handleCompleteLiveIssueShow = () => setCompleteLiveIssue(true);
  const handleCompleteLiveIssueClose = () => {
    setCompleteLiveIssue(false);
    setLiveIssueValue({
      name: "",
      business_request_document_link: "",
      business_request_document_status: false,
      inserted_at: "",
      last_update: "",
      pm: "",
      project_status_id: 0,
      project_status: "",
      project_progress: 0,
      project_status_level: "",
      last_status_update: "",
      priority_level: "",
      priority_name: "",
      team_id: 0,
      team_name: "",
      last_status_change: "",
      assigned_date: "",
      id: 0,
    });
  };
  // Update Live Issue
  const [showUpdateLiveIssue, setShowUpdateLiveIssue] = useState(false);
  const handleUpdateLiveIssueClose = () => {
    setShowUpdateLiveIssue(false);
    setLiveIssueFormValue({
      name: "",
      team_id: 0,
      pm_id: 0,
      business_request_document_status: false,
      project_status_id: 0,
      business_request_document_link: "",
      priority_type_id: 0,
      last_status_change: "",
      assigned_date: "",
    });
  };
  const handleUpdateLiveShow = () => setShowUpdateLiveIssue(true);

  // Members Assigned stats
  const [showMemberAssignStats, setShowMemberAssignStats] = useState(false);
  const handleMemberAssignStatsClose = () => setShowMemberAssignStats(false);
  const handleShow_Members_assign_stats = () => setShowMemberAssignStats(true);
  // Members Progress stats
  const [showMemberTaskProgress, setShowMemberTaskProgress] = useState(false);
  const handleMemberTaskProgressClose = () => setShowMemberTaskProgress(false);
  const handleShow_MemberTaskProgress = () => setShowMemberTaskProgress(true);
  // Members Progress stats
  const [showMemberCalender, setShowMemberCalender] = useState(false);
  const handleMemberCalenderClose = () => setShowMemberCalender(false);
  const handleShow_MemberCalender = () => setShowMemberCalender(true);

  //  Http Request Data Holders

  const [memberTask, setMemberTask] = useState([]);
  const [userData, setUserData] = useState([]);
  // Http Request Data Holders for Counters

  // user Task Counter
  const [UserTaskCounterOverview, setTaskCounterOverview] = useState([]);

  const [statusData, setStatus] = useState([]);
  // Team tasks overview state handler
  const [team_tasks_overview, set_team_tasks_overview] = useState([]);
  // Team projects overview state handler
  const [Team_Projects_CounterData, set_Team_Projects_Counter_Data] = useState(
    []
  );
  // Project Assignments
  // Operational
  const [
    user_Operational_Projects_Assignment,
    set_user_Operational_Projects_Assignment,
  ] = useState([]);
  // Strategic
  const [
    user_Strategic_Projects_Assignment,
    set_user_Strategic_Projects_Assignment,
  ] = useState([]);

  // user over task status
  const [user_task_statuses, set_user_task_statuses] = useState([]);

  // projects Data
  const [all_projectData, set_all_ProjectData] = useState([]);
  const [projectData, set_ProjectData] = useState({});
  const [bet_projectData, set_bet_ProjectData] = useState([]);
  const [bet_partners_projectData, set_bet_partners_ProjectData] = useState([]);
  const [country_projectData, set_country_ProjectData] = useState([]);
  const [payment_methods_projectData, set_payment_methods_ProjectData] =
    useState([]);
  const [customer_journey_projectData, set_customer_journey_ProjectData] =
    useState([]);
  const [digital_marketing_projectData, set_digital_marketing_ProjectData] =
    useState([]);
  const [integrations_projectData, set_integrations_ProjectData] = useState([]);
  // Live issues Data

  // all
  const [LiveIssueData, setLiveIssueData] = useState([]);
  // completed
  const [CompletedLiveIssueData, setCompletedLiveIssueData] = useState([]);
  // live view overview
  const [LiveIssueOverviewData, setActiveOverviewLiveIssue] = useState([]);
  //project assignemnt Data
  const [assign_projectData, set_assign_ProjectData] = useState([]);
  // For Addidng Task
  const [TeamMembers, setTeamMembers] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [TaskStatus, setTaskStatus] = useState([]);
  const [environmentValue, setEnvironmentValue] = useState([]);
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
  const [liveIssueFormValue, setLiveIssueFormValue] = useState({
    id: 0,
    name: "",
    team_id: 0,
    pm_id: 0,
    business_request_document_status: false,
    project_status_id: 0,
    business_request_document_link: "",
    priority_type_id: 0,
    last_status_change: "",
    assigned_date: "",
  });
  const [live_issue_Value, setLiveIssueValue] = useState({
    status_days_passed: 0,
    name: "",
    business_request_document_link: "",
    business_request_document_status: false,
    inserted_at: "",
    last_update: "",
    pm: "",
    project_status_id: 0,
    project_status: "",
    project_progress: 0,
    project_status_level: "",
    last_status_change: "",
    priority_level: "",
    priority_name: "",
    team_id: 0,
    team_name: "",
    assigned_date: "",
    id: 0,
    is_active: null,
  });
  // Team member State Values Holder
  const [memberValue, setMemberValue] = useState({
    id: 0,
    name: "",
  });
  // Task State Values Holder
  const [taskValue, setTaskValue] = useState({
    name: "",
    environment_id: 0,
    environment: "",
    task_status_id: 0,
    kickoff_date: "",
    last_update: "",
    due_date: "",
    task_comment: "",
    created_at: "",
    days_left: 0,
    task_duration: 0,
  });
  // Project State Values Holder
  const [projectValue, setProject] = useState({
    id: 0,
    name: "",
    business_request_document_link: "",
    business_request_document_status: false,
    inserted_at: "",
    project_type: "",
    project_status: "",
    project_category_type: "",
    progress: 0,
    last_update: "",
    pm: "",
    level: "",
    priority_type: "",
    priority_level: "",
    last_status_change: "",
  });
  // Team State Value Holde
  const [team, setteam] = useState({
    id: 1,
    name: "",
  });

  // search state
  const [search_key, set_search_key] = useState({
    live_issue_search: null,
    task_search: null,
  });
  // projects modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // task  modal
  const [show_Add_task, setShow_Add_task] = useState(false);
  const handleClose_Add_task = () => {
    setShow_Add_task(false);
    setTaskValue({
      name: "",
      environment_id: 0,
      environment: "",
      task_status_id: 0,
      kickoff_date: "",
      last_update: "",
      due_date: "",
      task_comment: "",
      created_at: "",
      days_left: 0,
      task_duration: 0,
      last_status_change: "",
    });
    setTaskFormValue({
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
  };
  const handleShow_add_Task = () => setShow_Add_task(true);
  // member tasks modal
  const [show_member_task, setShow_Member_task] = useState(false);
  const handleClose_Member_task = () => setShow_Member_task(false);
  const handleShow_Members_task = () => setShow_Member_task(true);

  // assign members to  team projects
  const [show_assign_project, setShow_assign_project] = useState(false);
  const handleClose_assign_project = () => setShow_assign_project(false);
  const handleShow_assign_project = () => setShow_assign_project(true);

  // Keeps track of changes in the database
  const [old_team_projects_data, set_old_team_projects_data] = useState([]);
  const [old_team_live_issue_data, set_old_team_live_issue_data] = useState([]);
  const [old_team_tasks_data, set_old_team_tasks_data] = useState([]);
  function OldData() {
    set_old_team_projects_data(projectData);
    set_old_team_live_issue_data(LiveIssueData);
  }

  const latest_project_data = useMemo(
    () => old_team_projects_data,
    [old_team_projects_data]
  );

  const latest_ive_ssue_data = useMemo(
    () => old_team_live_issue_data,
    [old_team_live_issue_data]
  );
  const latest_team_task_data = useMemo(
    () => old_team_tasks_data,
    [old_team_tasks_data]
  );

  function TaskData() {
    set_old_team_tasks_data(memberTask);
  }
  // Team Members List
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch team members
    fetch(
      `${URL}/api/auth/team/members?id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => setUserData(Result.data.users));
  }, []);

  //Member Tasks
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
      fetch(
        `${URL}/api/auth/user/tasks?id=${localStorage.getItem(
          "team"
        )}&user_id=${memberValue.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((Result) => {
          setMemberTask(Result.open_tasks);
        });
    }
  }, [latest_team_task_data, memberValue.id, search_key]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${URL}/api/auth/project_assignment/details?team_id=${localStorage.getItem(
        "team"
      )}&id=${projectValue.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_assign_ProjectData(Result.data));
  }, [projectValue.id]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch all statuses
    fetch(`${URL}/api/auth/project_status/all`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setStatus(Result.data));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${URL}/api/auth/live_issues/team/count/overview?team_id=${localStorage.getItem(
        "team"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((results) => {
        setActiveOverviewLiveIssue(results);
      });
  }, [LiveIssueOverviewData]);

  //Members COUNTERS

  // project assignment Counters
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    const catgeory_key = {
      operational: 1,
      strategic: 2,
    };
    //########### member project assignment #######
    // operational Project assignment
    fetch(
      `${URL}/api/auth/project_assignments/user/count?team_id=${localStorage.getItem(
        "team"
      )}&category_id=${catgeory_key.operational}&user_id=${memberValue.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_user_Operational_Projects_Assignment(Result));

    // strategic Project assignment
    fetch(
      `${URL}/api/auth/project_assignments/user/count?team_id=${localStorage.getItem(
        "team"
      )}&category_id=${catgeory_key.strategic}&user_id=${memberValue.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_user_Strategic_Projects_Assignment(Result));
  }, [memberValue.id]);
  // user task counters
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    // Pending Tasks

    // Member Task Overview
    fetch(
      `${URL}/api/auth/task/user/count?team_id=${localStorage.getItem(
        "team"
      )}&id=${memberValue.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => setTaskCounterOverview(Result));

    // user task Counter
    fetch(
      `${URL}/api/auth/user/tasks_status?team_id=${localStorage.getItem(
        "team"
      )}&id=${memberValue.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_user_task_statuses(Result));
  }, [memberValue.id]);

  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    //fecth team  projects

    fetch(
      `${URL}/api/auth/team/projects?team_id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((results) => {
        set_ProjectData(results);
        set_bet_ProjectData(results.bet_projects);
        set_bet_partners_ProjectData(results.bet_project_partners_projects);
        set_country_ProjectData(results.country_projects);
        set_customer_journey_ProjectData(results.customer_journey_projects);
        set_digital_marketing_ProjectData(results.digital_marketing_projects);
        set_integrations_ProjectData(results.integrations_projects);
        set_payment_methods_ProjectData(results.payment_method_projects);
        set_all_ProjectData(results.all_projects);
      });
  }, [latest_project_data]);
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // team overview Tasks
    fetch(
      `${URL}/api/auth/task/team/count?id=${localStorage.getItem("team")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_team_tasks_overview(Result));
    // All  Projects Overview
    fetch(
      `${URL}/api/auth/team/project/count?team_id=${localStorage.getItem(
        "team"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => set_Team_Projects_Counter_Data(Result));
  }, [latest_project_data]);
  // Live Issues
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    if (
      search_key.live_issue_search === null ||
      search_key.live_issue_search === ""
    ) {
      // fetch all live issues active projects assigned to the team
      fetch(
        `${URL}/api/auth/team/live_issues?team_id=${localStorage.getItem(
          "team"
        )}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          setLiveIssueData(res.all_live_issues);
          setCompletedLiveIssueData(res.completed_live_issues);
        });
    }
  }, [latest_ive_ssue_data, showLiveIssues, search_key]);

  //  Fetch All Data States(Team Members, Teams, Environment, Task Statuses)
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    // Fetch Team Members
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

    // fetch all teams
    fetch(`${URL}/api/auth/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamValue(res.data));

    // fetch for environments
    fetch(`${URL}/api/auth/environments`, requestOptions)
      .then((response) => response.json())
      .then((results) => setEnvironmentValue(results.data));

    // fetch for task statuses
    fetch(`${URL}/api/auth/task_statuses`, requestOptions)
      .then((response) => response.json())
      .then((results) => setTaskStatus(results.data));
  }, []);

  const [project_assignments, setproject_assignments] = useState({
    project_assignments: 0,
    max_value: 0,
  });
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    if (memberValue.id !== 0) {
      fetch(
        `${URL}/api/auth/project_assignments/user/check?team_id=${localStorage.getItem(
          "team"
        )}&user_id=${memberValue.id}`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((Result) => {
          setproject_assignments(Result);
        });
    }
  }, [memberValue.id]);

  // User Task Capacity Monitor
  const [task_assignments, settask_assignments] = useState({
    tasks_assigned: 0,
    max_value: 0,
  });
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    if (memberValue.id !== 0) {
      fetch(
        `${URL}/api/auth/task_assignent/user/check?team_id=${localStorage.getItem(
          "team"
        )}&user_id=${memberValue.id}`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((Result) => {
          settask_assignments(Result);
        });
    }
  }, [memberValue.id]);

  const dueDate = `${taskFormValue.due_date + " " + taskFormValue.due_time}`;
  const kickoffDate = `${
    taskFormValue.kickoff_date + " " + taskFormValue.kickoff_time
  }`;
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
            handleClose_Add_task();
            TaskData();
          } else if (response.status === 412) {
            handleShowLimitReached();
          } else if (response.status === 422) {
            handleShowErrorCreate();
          } else if (response.status === 500) {
            handleShowServerError();
          } else if (response.status === 401) {
            alert("session expired");
            history("/");
          }
        })
        .then((results) => results.json());
    }
  }

  // Search
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
      `${URL}/api/auth/user/search?team_id=${localStorage.getItem(
        "team"
      )}&user_id=${memberValue.id}&search=${search_key.task_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => {
        setMemberTask(Result.open_tasks);
      });
  }

  // update live issue
  function handle_Update_Live_Issue(event) {
    event.preventDefault();
    var completion_key = "8";
    var date = new Date();

    // var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    //  date.getHours(), date.getMinutes(), date.getSeconds());
    liveIssueFormValue.last_status_change = date.toISOString();

    if (
      liveIssueFormValue.project_status_id ===
      live_issue_Value.project_status_id
    ) {
      handleShowDuplicateLiveUpdate();
      handleUpdateLiveIssueClose();
    } else if (
      liveIssueFormValue.project_status_id !==
      live_issue_Value.project_status_id
    ) {
      if (liveIssueFormValue.project_status_id === completion_key) {
        fetch(`${URL}/api/auth/live_issue/update`, {
          method: "put",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("key")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: live_issue_Value.id,
            live_issue: {
              project_status_id: liveIssueFormValue.project_status_id,
              last_status_change: liveIssueFormValue.last_status_change,
              is_active: false,
            },
          }),
        }).then((Response) => {
          Response.json();
          if (Response.status === 200) {
            handleUpdateLiveIssueClose();
            handleCompleteLiveIssueShow();
            OldData();
          } else if (Response.status === 422) {
            handleShowErrorLiveUpdate();
          } else if (Response.status === 500) {
            handleShowServerLiveError();
          }
        });
      } else if (liveIssueFormValue.project_status_id !== completion_key) {
        fetch(`${URL}/api/auth/live_issue/update`, {
          method: "put",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("key")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: live_issue_Value.id,
            live_issue: {
              project_status_id: liveIssueFormValue.project_status_id,
              last_status_change: liveIssueFormValue.last_status_change,
              is_active: live_issue_Value.is_active,
            },
          }),
        }).then((Response) => {
          Response.json();
          if (Response.status === 200) {
            handleShowsuccessLiveUpdate();
            handleUpdateLiveIssueClose();
            OldData();
          } else if (Response.status === 422) {
            handleShowErrorLiveUpdate();
          } else if (Response.status === 500) {
            handleShowServerLiveError();
          }
        });
      }
    }
  }

  function handle_Complete_Live_Issue(event) {
    event.preventDefault();
    var date = new Date();
    // var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    //  date.getHours(), date.getMinutes(), date.getSeconds());
    liveIssueFormValue.last_status_change = date.toISOString();

    fetch(`${URL}/api/auth/live_issue/update`, {
      method: "put",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: live_issue_Value.id,
        live_issue: {
          project_status_id: live_issue_Value.project_status_id,
          last_status_change: liveIssueFormValue.last_status_change,
          is_active: true,
        },
      }),
    }).then((Response) => {
      Response.json();
      if (Response.status === 200) {
        handleShowsuccessLiveUpdate();
        handleCompleteLiveIssueClose();
        handleUpdateLiveIssueClose();
        OldData();
      } else if (Response.status === 422) {
        handleShowErrorLiveUpdate();
      } else if (Response.status === 500) {
        handleShowServerLiveError();
      }
    });
  }

  // Search Task
  function handle_Search_Live_Issues_Submit(event) {
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
      `${URL}/api/auth/live_issues/team/search?team_id=${localStorage.getItem(
        "team"
      )}&search=${search_key.live_issue_search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((Result) => {
        setCompletedLiveIssueData(Result.completed_live_issues);
        setLiveIssueData(Result.all_live_issues);
      });
  }

  if (!TeamMembers) {
    return <p>no member loaded </p>;
  }
  if (!all_projectData) {
    return <p>no projects loaded</p>;
  }
  const handleChange = (event) => {
    setLiveIssueFormValue({
      ...liveIssueFormValue,
      [event.target.name]: event.target.value,
    });
    setteam({
      ...team,
      [event.target.name]: event.target.value,
    });
    setMemberValue({
      ...memberValue,
      [event.target.name]: event.target.value,
    });

    setTaskValue({
      ...taskValue,
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

  function selectTask(task) {
    var last_update = new Date(task.updated_at).toDateString();
    var kick_off_date = new Date(task.inserted_at).toDateString();

    const now_date = new Date();
    const kick_off = new Date(task.kickoff_date);
    const due_date = new Date(task.due_date);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    // Calcualte Task Duration
    const task_time_difference = due_date.getTime() - kick_off.getTime();
    const Task_Duration = Math.round(task_time_difference / oneDay);
    //  Calculate  Task Days Left
    const task_time_due_difference = due_date.getTime() - now_date.getTime();
    const Task_due_in = Math.round(task_time_due_difference / oneDay);
    setTaskValue({
      name: task.name,
      environment_id: task.environment.id,
      task_status_id: task.task_status.id,
      kickoff_date: kick_off_date,
      last_update: last_update,
      due_date: task.due_date,
      task_comment: task.task_comment,
      created_at: task.inserted_at,
      environment: task.environment.name,
      task_status: task.task_status.name,
      days_left: Task_due_in,
      task_duration: Task_Duration,
    });
  }

  function selectProject(project) {
    var last_status = new Date(project.last_status_change).toDateString();
    var last_update = new Date(project.updated_at).toDateString();
    var created_project_at = new Date(project.inserted_at).toDateString();

    setProject({
      id: project.id,
      name: project.name,
      user_id: project.user.id,
      business_request_document_link: project.business_request_document_link,
      business_request_document_status:
        project.business_request_document_status,
      inserted_at: created_project_at,
      project_type: project.project_type.name,
      project_category_type: project.project_category_type.name,
      last_status_change: last_status,

      last_update: last_update,
      pm: project.user.name,

      level: project.project_status.level,
      project_status: project.project_status.name,
      progress: project.project_status.effect,

      priority_type: project.priority_type.name,
      priority_level: project.priority_type.level,
    });
  }

  function selectLiveIssue(project) {
    var assigned_status = new Date(project.assigned_date).toDateString();
    var last_status = new Date(project.last_status_change).toDateString();
    var last_update = new Date(project.updated_at).toDateString();
    var created_project_at = new Date(project.inserted_at).toDateString();

    var last_status_value = new Date(project.last_status_change);
    const now_date = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    var time_difference = now_date.getTime() - last_status_value.getTime();

    var last_status_value_date = Math.round(time_difference / oneDay);
    setLiveIssueFormValue({
      id: project.id,
      name: project.name,
      team_id: project.team.id,
      pm_id: project.user.id,
      business_request_document_status:
        project.business_request_document_status,
      project_status_id: project.project_status.id,
      business_request_document_link: project.business_request_document_link,
      priority_type_id: project.priority_type.id,
    });
    setLiveIssueValue({
      id: project.id,
      name: project.name,
      business_request_document_link: project.business_request_document_link,
      business_request_document_status:
        project.business_request_document_status,
      inserted_at: created_project_at,
      last_update: last_update,
      pm: project.user.name,

      project_status: project.project_status.name,
      project_status_id: project.project_status.id,
      project_progress: project.project_status.effect,
      project_status_level: project.project_status.level,

      priority_name: project.priority_type.name,
      priority_level: project.priority_type.level,

      team_id: project.team.id,
      team_name: project.team.name,

      last_status_change: last_status,
      status_days_passed: last_status_value_date,
      assigned_date: assigned_status,

      is_active: project.is_active,
    });
  }
  // Charts
  const data = {
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
    <div className="mt-3">
      <Card className="shadow">
        <Card.Header>
          <Nav className="justify-content-end">
            <div className="col-md-1 col-sm-9">
              <Button
                variant="info"
                size="sm"
                onClick={handleLiveIssuesShow}
                className="position-relative"
              >
                Live Issue
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <CountUp
                    start={0}
                    end={LiveIssueOverviewData.active}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </span>
              </Button>
            </div>
          </Nav>
        </Card.Header>
        <Card.Body className="teamlead-dashboard">
          <Tabs defaultActiveKey="projects" transition={true} className="mb-3">
            <Tab eventKey="projects" title="Projects">
              <Row>
                <Col>
                  <Card className="shadow">
                    <Card.Body className="teamlead-dashboard-project-tab">
                      <Tabs
                        defaultActiveKey="bet_projects"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="bet_projects" title="Bet Projects">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bet_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="country" title="Country">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {country_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>
                                  {/* 
                                      <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="customerJourney" title="Customer">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {customer_journey_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="integrations" title="Integrations">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {integrations_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="pay_methods" title="Payments">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {payment_methods_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="digital" title="Digital Marketing">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {digital_marketing_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab
                          eventKey="betsoftware parteners"
                          title="Bet Software Partners"
                        >
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bet_partners_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="all" title="All">
                          <Row md={9}>
                            <Col>
                              <Table size="sm" striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Priority </th>
                                    <th> To Complete</th>
                                    <th>click</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {all_projectData
                                    .slice(0, 8)
                                    .map((project, Index) => {
                                      return (
                                        <tr key={Index}>
                                          <td>{project.name}</td>
                                          <td>
                                            {" "}
                                            {project.project_category_type.name}
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              bg={project.priority_type.level}
                                              size="sm"
                                            >
                                              <p>
                                                {project.priority_type.name}
                                              </p>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Badge
                                              style={{ height: "25px" }}
                                              pill
                                              bg={project.project_status.level}
                                            >
                                              <CountUp
                                                start={0}
                                                end={
                                                  100 -
                                                  project.project_status.effect
                                                }
                                                delay={0}
                                              >
                                                {({ countUpRef }) => (
                                                  <div>
                                                    <span ref={countUpRef} />%
                                                  </div>
                                                )}
                                              </CountUp>
                                            </Badge>
                                          </td>
                                          <td className="text-center">
                                            <Button
                                              variant="outline-success"
                                              size="sm"
                                              onClick={() =>
                                                selectProject(project)
                                              }
                                            >
                                              Select
                                            </Button>{" "}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col>
                              <Card>
                                <Card.Header>Project Details</Card.Header>
                                <Card.Body fluid>
                                  <Row>
                                    <Col>Name :</Col>
                                    <Col>
                                      <p>{projectValue.name}</p>
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
                                          {assign_projectData
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
                                    <Col>PM</Col>
                                    <Col>
                                      <Label>{projectValue.pm}</Label>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                      <p>{projectValue.project_status}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Status Update</Col>
                                    <Col>
                                      <p>{projectValue.last_status_change}</p>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>Last Update</Col>
                                    <Col>
                                      <Label>{projectValue.last_update}</Label>
                                    </Col>
                                  </Row>
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
                                        {" "}
                                        <h4>
                                          <FcDownload />
                                        </h4>{" "}
                                      </a>
                                    </Col>
                                  </Row>

                                  {/* <Row>
                                        <Col>Progress:</Col>
                                        <Col>
                                          <ProgressBar
                                            now={projectValue.progress}
                                            variant={projectValue.level}
                                            label={`${projectValue.progress}%`}
                                          />
                                        </Col>
                                      </Row> */}
                                  {/* <Row>
                                  <Col>
                                To Completition :
                                </Col>  
                                <Col>
                                <Badge pill bg={projectValue.level}><CountUp start={0} end={100 - projectValue.progress} delay={0}>
                                          {({ countUpRef }) => (
                                              <div>
                                              <span ref={countUpRef}  />%
                                              </div>
                                          )}
                                          </CountUp>
                                          </Badge>
                                </Col>     
                                </Row> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab>
                      </Tabs>
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={handleShow_assign_project}
                      >
                        Assign Member
                      </Button>{" "}
                      <Button variant="success" size="sm" onClick={handleShow}>
                        All
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="members" title="Members">
              <Card>
                <Card.Body className="teamlead-dashboard-member-tab">
                  <Row>
                    <Col>
                      {" "}
                      <Col>
                        <Card className="shadow">
                          <Card.Header>Team Members </Card.Header>
                          <Card.Body className="teamlead-dashboard-team-member-card">
                            <Row>
                              <Col sm={12} md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Select
                                    name="id"
                                    onChange={handleChange}
                                    id="id"
                                    required
                                  >
                                    <option value={0}>Select Member</option>
                                    {userData.map((user, key) => {
                                      return (
                                        <option key={key} value={user.id}>
                                          {user.name}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </Form.Group>
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={handleShow_Members_assign_stats}
                                >
                                  Assign Stats{" "}
                                </Button>{" "}
                                <Button
                                  variant="info"
                                  size="sm"
                                  onClick={handleShow_MemberTaskProgress}
                                >
                                  Task Progress{" "}
                                </Button>{" "}
                                <Button
                                  variant="info"
                                  size="sm"
                                  onClick={handleShow_MemberCalender}
                                >
                                  Calender{" "}
                                </Button>{" "}
                              </Col>
                              <Col sm={12} md={6}>
                                <Tabs
                                  defaultActiveKey="tasks_capacity"
                                  id=""
                                  className="mb-3"
                                >
                                  <Tab
                                    eventKey="tasks_capacity"
                                    title="Task Capacity"
                                  >
                                    <div style={{ width: "100px" }}>
                                      <CircularProgressbar
                                        value={task_assignments.tasks_assigned}
                                        text={`${task_assignments.tasks_assigned} of ${task_assignments.max_value}`}
                                        maxValue={task_assignments.max_value}
                                      />
                                    </div>
                                  </Tab>
                                  <Tab
                                    eventKey="project_capacity"
                                    title="Project Capacity"
                                  >
                                    <div style={{ width: "100px" }}>
                                      <CircularProgressbar
                                        value={
                                          project_assignments.project_assignments
                                        }
                                        text={`${project_assignments.project_assignments} of ${project_assignments.max_value}`}
                                        maxValue={project_assignments.max_value}
                                      />
                                    </div>
                                  </Tab>
                                </Tabs>
                              </Col>
                            </Row>
                            <br />
                            <Card.Header>
                              Details for <b>{taskValue.name}</b>{" "}
                            </Card.Header>
                            <Row>
                              <Col>Kick Off Date</Col>
                              <Col>
                                <p>{taskValue.kickoff_date}</p>
                              </Col>
                            </Row>
                            {/* <Row>
                    <Col>
                    Due Date
                    </Col>     
                    <Col>
                    <p>{taskValue.due_date}</p>
                    </Col>
                    </Row> */}
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
                            <Row>
                              <Col>Task Duration :</Col>
                              <Col>
                                <Badge pill bg="success">
                                  <CountUp
                                    start={0}
                                    end={taskValue.task_duration}
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
                            <Row>
                              <Col>Task Comment :</Col>
                              <Col>
                                <Form.Control
                                  readOnly
                                  as="textarea"
                                  placeholder="task comment here"
                                  style={{ height: "auto" }}
                                  value={taskValue.task_comment}
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Col>

                    <Col>
                      <Card className="shadow">
                        <Card.Header>
                          <b>{memberValue.name}</b> Task list{" "}
                        </Card.Header>{" "}
                        <Nav className="justify-content-end">
                          <div className="col-md-3 col-sm-9 me-3">
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
                        <Card.Body className="teamlead-dashboard-task-list-card">
                          {/* style={{height:"calc(100vh - 563px)"}} */}
                          <Table size="sm" striped bordered hover>
                            <thead>
                              <tr>
                                <th>Name </th>
                                <th>Status </th>
                                <th>Completion Date</th>
                                <th> Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {memberTask.map((task, Index) => {
                                return (
                                  <tr key={Index}>
                                    <td>{task.name}</td>
                                    <td>{task.task_status.name}</td>
                                    <td>
                                      {new Date(task.due_date).toDateString()}
                                    </td>
                                    <td className="text-center">
                                      <Button
                                        size="sm"
                                        variant="outline-success"
                                        onClick={() => selectTask(task)}
                                      >
                                        Select
                                      </Button>
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
                            </Button>{" "}
                            <Button
                              variant="info"
                              size="sm"
                              onClick={handleShow_add_Task}
                            >
                              Add Task
                            </Button>
                          </>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="team_overview" title="Team Overview">
              <Container fluid>
                <Row>
                  <Col>
                    <Card className="shadow">
                      <Card.Body className="teamlead-dashboard-overview-tab">
                        <Row>
                          <Col>
                            <Card>
                              <Card.Body className="teamlead-dashboard-overview-tab-project-overview-card ">
                                <Tabs
                                  defaultActiveKey="projects"
                                  transition={true}
                                  className="mb-3"
                                >
                                  <Tab eventKey="projects" title="Projects">
                                    <ProjectOverviewChart />
                                    <Row>
                                      <Card.Header>Project Stats</Card.Header>

                                      <Row>
                                        <Col>Not Completed</Col>
                                        <Col>
                                          <Badge pill bg="danger">
                                            <CountUp
                                              start={0}
                                              end={
                                                Team_Projects_CounterData.pending
                                              }
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
                                        <Col>Completed</Col>
                                        <Col>
                                          <Badge pill bg="success">
                                            <CountUp
                                              start={0}
                                              end={
                                                Team_Projects_CounterData.completed
                                              }
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
                                        <Col>Assigned</Col>
                                        <Col>
                                          <Badge pill bg="warning">
                                            <CountUp
                                              start={0}
                                              end={
                                                Team_Projects_CounterData.all_project
                                              }
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
                                    </Row>
                                  </Tab>
                                  <Tab
                                    eventKey="live_issues"
                                    title="Live Issues"
                                  >
                                    <div
                                      style={{ widht: "30%", heigth: "30%" }}
                                    >
                                      <TeamLiveIssuesOverviewChart />
                                    </div>
                                    <Row>
                                      <Card.Header>Project Stats</Card.Header>

                                      <Row>
                                        <Col>Not Completed</Col>
                                        <Col>
                                          <Badge pill bg="danger">
                                            <CountUp
                                              start={0}
                                              end={
                                                LiveIssueOverviewData.pending
                                              }
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
                                        <Col>Completed</Col>
                                        <Col>
                                          <Badge pill bg="success">
                                            <CountUp
                                              start={0}
                                              end={
                                                LiveIssueOverviewData.completed
                                              }
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
                                        <Col>Assigned</Col>
                                        <Col>
                                          <Badge pill bg="warning">
                                            <CountUp
                                              start={0}
                                              end={
                                                LiveIssueOverviewData.all_project
                                              }
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
                                    </Row>
                                  </Tab>
                                </Tabs>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card className="shadow">
                              <Card.Header>Task Overview</Card.Header>
                              <Card.Body className="teamlead-dashboard-overview-tab-task-overview-card">
                                <div style={{ widht: "30%", heigth: "30%" }}>
                                  <TaskOverviewChart />
                                </div>
                                <Row>
                                  <Col>Not Completed</Col>
                                  <Col>
                                    <Badge pill bg="secondary">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.not_completed}
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
                                  <Col>Over Due</Col>
                                  <Col>
                                    <Badge pill bg="danger">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.over_due}
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
                                  <Col>Completed</Col>
                                  <Col>
                                    <Badge pill bg="success">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.completed}
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
                                  <Col>Total</Col>
                                  <Col>
                                    <Badge pill bg="info">
                                      <CountUp
                                        start={0}
                                        end={team_tasks_overview.all_tasks}
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
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
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
        <Modal show={show} onHide={handleClose} size="xl">
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
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bet_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab eventKey="country" title="Country">
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab eventKey="customerJourney" title="Customer">
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer_journey_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab eventKey="integrations" title="Integrations">
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrations_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab eventKey="pay_methods" title="Payments">
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment_methods_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab eventKey="digital" title="Digital Marketing">
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {digital_marketing_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
              <Tab
                eventKey="betsoftware partners"
                title="Bet Software Partners"
              >
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bet_partners_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
                <Table size="sm" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Priority </th>
                      <th> To Complete</th>
                      <th>click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {all_projectData.map((project, Index) => {
                      return (
                        <tr key={Index}>
                          <td>{project.name}</td>
                          <td> {project.project_category_type.name}</td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              bg={project.priority_type.level}
                              size="sm"
                            >
                              <p>{project.priority_type.name}</p>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Badge
                              style={{ height: "25px" }}
                              pill
                              bg={project.project_status.level}
                            >
                              <CountUp
                                start={0}
                                end={100 - project.project_status.effect}
                                delay={0}
                              >
                                {({ countUpRef }) => (
                                  <div>
                                    <span ref={countUpRef} />%
                                  </div>
                                )}
                              </CountUp>
                            </Badge>
                          </td>
                          <td className="text-center">
                            <button
                              size="sm"
                              className="btn"
                              onClick={handleClose}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => selectProject(project)}
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
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Team Add Task  */}
        <Modal show={show_Add_task} onHide={handleClose_Add_task} size="md">
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitTaskCreate}>
              <InputGroup className="mb-3">
                <InputGroup.Text className="col-4" id="project-name">
                  {" "}
                  Name:{" "}
                </InputGroup.Text>
                <FormControl
                  aria-label="Name"
                  aria-describedby="project-name"
                  name="name"
                  placeholder="Task Name"
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
                  Team :{" "}
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
                <InputGroup.Text className="col-4">Comment:</InputGroup.Text>
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
            </Form>
            <ToastContainer className="p-3" position={"top-end"}>
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
                  Limit Reached Can't Assign more Tasks on This User
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
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose_Add_task}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
            <Table size="sm" striped bordered hover>
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Status </th>
                  <th>Completion Date</th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                {memberTask.map((task, Index) => {
                  return (
                    <tr key={Index}>
                      <td>{task.name}</td>
                      <td>{task.task_status_id}</td>
                      <td>{new Date(task.due_date).toDateString()}</td>
                      <td className="text-center">
                        <button
                          size="sm"
                          className="btn"
                          onClick={() => selectTask(task)}
                        >
                          <Button
                            variant="outline-success"
                            size="sm"
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose_Member_task}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Assign Members to Project  */}
        <Modal
          show={show_assign_project}
          onHide={handleClose_assign_project}
          size="md"
        >
          <Modal.Header style={{ backgroundColor: "#90CAF9" }} closeButton>
            <Modal.Title>Assign Member To Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AssignProject />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose_assign_project}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Live Issues Control Panel */}
      <Offcanvas
        show={showLiveIssues}
        className="justify-content-end"
        style={{ width: "60%" }}
        onHide={handleLiveIssuesClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Team Live Issues</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end">
            <div className="col-md-5 col-sm-9">
              <Form
                onSubmit={handle_Search_Live_Issues_Submit}
                className="d-flex"
              >
                <FormControl
                  type="search"
                  name="live_issue_search"
                  placeholder="Search"
                  required
                  onChange={handleChange}
                  className="mr-3"
                  aria-label="Search"
                />
                <Button variant="outline-success" type="submit" size="sm">
                  <h6>
                    <FcSearch />
                  </h6>
                </Button>
              </Form>
            </div>
          </Nav>
          <Tabs defaultActiveKey="active" className="mb-3">
            <Tab eventKey="active" title="Active">
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status </th>
                    <th>Priority</th>

                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {LiveIssueData.slice(0, 5).map((project, Index) => {
                    return (
                      <tr key={Index}>
                        <td>{project.name}</td>
                        <td> {project.project_status.name}</td>
                        <td>
                          <Badge
                            style={{ height: "20px" }}
                            bg={project.priority_type.level}
                            size="sm"
                          >
                            <p>{project.priority_type.name}</p>
                          </Badge>
                        </td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectLiveIssue(project)}
                          >
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={handleLiveIssuesDetailsShow}
                            >
                              Select
                            </Button>
                          </button>{" "}
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectLiveIssue(project)}
                          >
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={handleUpdateLiveShow}
                            >
                              update
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
                    <th>Name</th>
                    <th>Status </th>
                    <th>Priority</th>
                    <th> PM</th>
                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CompletedLiveIssueData.slice(0, 5).map((project, Index) => {
                    return (
                      <tr key={Index}>
                        <td>{project.name}</td>
                        <td> {project.project_status.name}</td>
                        <td>
                          <Badge
                            style={{ height: "20px" }}
                            bg={project.priority_type.level}
                            size="sm"
                          >
                            <p>{project.priority_type.name}</p>
                          </Badge>
                        </td>

                        <td>{project.user.name}</td>
                        <td className="text-center">
                          <button
                            size="sm"
                            className="btn"
                            onClick={() => selectLiveIssue(project)}
                          >
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={handleLiveIssuesDetailsShow}
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
        </Offcanvas.Body>

        <ToastContainer className="p-3" position={"top-end"}>
          {/* Successfully Updated */}
          <Toast
            onClose={handleCloseSuccessLiveUpdate}
            show={success_live_updated}
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
            onClose={handleCloseErrorLiveUpdate}
            show={error_live_updated}
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

          {/* Live Issues Server Error  */}
          <Toast
            onClose={handleCloseServerLiveError}
            show={server_live_error}
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

          {/* Live Issue Completed  */}
          <Toast
            onClose={handleCloseLiveCompleted}
            show={live_completed}
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
              <strong className="me-auto">Solved</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Live Issues resolved{" "}
            </Toast.Body>
          </Toast>

          <Toast
            onClose={handleCloseDuplicateLiveUpdate}
            show={duplicate_live_updated}
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
              status already assigned
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Offcanvas>

      {/* Off canvas to display details */}
      <Offcanvas
        show={showLiveIssuesDetails}
        placement="end"
        style={{ width: "40%" }}
        onHide={handleLiveIssuesDetailsClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col>Name :</Col>
            <Col>
              <p>{live_issue_Value.name}</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>Priority :</Col>
            <Col>
              <Badge
                style={{ height: "25px" }}
                bg={live_issue_Value.priority_level}
                size="sm"
              >
                <p>{live_issue_Value.priority_name}</p>
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col>Assigned Date :</Col>
            <Col>
              <p>{live_issue_Value.assigned_date}</p>
            </Col>
          </Row>
          <Row>
            <Col>Status :</Col>
            <Col>
              <p>{live_issue_Value.project_status}</p>
            </Col>
          </Row>

          <Row>
            <Col>Progress :</Col>
            <Col>
              <ProgressBar
                now={live_issue_Value.project_progress}
                striped
                variant={live_issue_Value.project_status_level}
                label={`${live_issue_Value.project_progress}%`}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>Last Status Update :</Col>
            <Col>
              <p>{live_issue_Value.last_status_change}</p>
            </Col>
          </Row>
          <Row>
            <Col>Days Since Last Status Update:</Col>
            <Col>
              <Badge pill bg="info">
                <CountUp
                  start={0}
                  end={live_issue_Value.status_days_passed}
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
            <Col>Created :</Col>
            <Col>
              <p>{live_issue_Value.inserted_at}</p>
            </Col>
          </Row>
          <Row>
            <Col>Last Update</Col>
            <Col>
              <p>{live_issue_Value.last_update}</p>
            </Col>
          </Row>
          <Row>
            <Col>PM :</Col>
            <Col>
              <p>{live_issue_Value.pm}</p>
            </Col>
          </Row>
          <Row>
            <Col>Team :</Col>
            <Col>
              <p>{live_issue_Value.team_name}</p>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Update Modal  Live Issue*/}
      <Modal
        show={showUpdateLiveIssue}
        onHide={handleUpdateLiveIssueClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Live Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Update_Live_Issue}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project_status_id">
                {" "}
                Status:{" "}
              </InputGroup.Text>
              <Form.Select
                name="project_status_id"
                onChange={handleChange}
                id="project_status_id"
                value={liveIssueFormValue.project_status_id}
                required
              >
                <option value="">Assign</option>

                {statusData.map((status, key) => {
                  return (
                    <option key={key} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <br />
            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleUpdateLiveIssueClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Member Assigned Stats */}
      <Modal
        show={showMemberAssignStats}
        onHide={handleMemberAssignStatsClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment stats </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table size="sm" striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Operational Projects</td>
                <td className="text-center">
                  <Badge pill bg="secondary">
                    <CountUp
                      start={0}
                      end={user_Operational_Projects_Assignment.all_assignments}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="success">
                    <CountUp
                      start={0}
                      end={user_Operational_Projects_Assignment.completed}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="warning">
                    <CountUp
                      start={0}
                      end={user_Operational_Projects_Assignment.pending}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>Strategic Projects</td>
                <td className="text-center">
                  <Badge pill bg="secondary">
                    <CountUp
                      start={0}
                      end={user_Strategic_Projects_Assignment.all_assignments}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="success">
                    <CountUp
                      start={0}
                      end={user_Strategic_Projects_Assignment.completed}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="warning">
                    <CountUp
                      start={0}
                      end={user_Strategic_Projects_Assignment.pending}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>Tasks</td>
                <td className="text-center">
                  <Badge pill bg="secondary">
                    <CountUp
                      start={0}
                      end={UserTaskCounterOverview.all_tasks}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="success">
                    <CountUp
                      start={0}
                      end={UserTaskCounterOverview.completed}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge pill bg="warning">
                    <CountUp
                      start={0}
                      end={UserTaskCounterOverview.not_completed}
                      delay={0}
                    >
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMemberAssignStatsClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Member Task progress */}
      <Modal
        show={showMemberTaskProgress}
        onHide={handleMemberTaskProgressClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Member Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "70%" }}>
            <Doughnut data={data} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMemberTaskProgressClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Member Calender */}
      <Modal
        show={showMemberCalender}
        onHide={handleMemberCalenderClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Member Calender</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar readOnly onChange={setDate} value={date} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMemberCalenderClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Completed Confirmation Live Issue */}
      {/*  Task */}
      <Modal
        show={show_Complete_Live_issue}
        onHide={handleCompleteLiveIssueClose}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          confirm that <b>{live_issue_Value.team_name} completed </b>
          <b>{live_issue_Value.name}</b> the live issue project/task. Are you
          Sure?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handle_Complete_Live_Issue}
          >
            No
          </Button>
          <Button variant="primary" size="sm" onClick={handleShowLiveCompleted}>
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
  );
}

export default DashBoardInfo;
