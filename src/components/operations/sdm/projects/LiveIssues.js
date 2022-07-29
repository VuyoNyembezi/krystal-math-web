import React, { useState, useEffect, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
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
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { FcSearch, FcApproval } from "react-icons/fc";

import { URL } from "../../../../server_connections/server";

function LiveIssues() {
  const history = useNavigate();

  // Toast Alerts State Controller
  const [success_live_create, set_success_live_create] = useState(false);
  const handleShowsuccessLiveCreate = () => set_success_live_create(true);
  const handleCloseSuccessLiveCreate = () => set_success_live_create(false);
  // Create Toaster Error
  const [error_live_create, set_error_live_create] = useState(false);
  const handleShowErrorLiveCreate = () => set_error_live_create(true);
  const handleCloseErrorLiveCreate = () => set_error_live_create(false);

  // Update Toaster
  const [success_live_updated, set_success_live_updated] = useState(false);
  const handleShowsuccessLiveUpdate = () => set_success_live_updated(true);
  const handleCloseSuccessLiveUpdate = () => set_success_live_updated(false);
  // update  error toast controller
  const [error_live_updated, set_error_live_updated] = useState(false);
  const handleShowErrorLiveUpdate = () => set_error_live_updated(true);
  const handleCloseErrorLiveUpdate = () => set_error_live_updated(false);

  // completed  live issue toast controller
  const [live_completed, set_live_completed] = useState(false);
  const handleShowLiveCompleted = () => set_live_completed(true);
  const handleCloseLiveCompleted = () => set_live_completed(false);
  // server error toast controller
  const [server_live_error, set_server_live_error] = useState(false);
  const handleShowServerLiveError = () => set_server_live_error(true);
  const handleCloseServerLiveError = () => set_server_live_error(false);

  // delete success toast controller
  const [success_delete, set_success_delete] = useState(false);
  const handleShowSuccessDelete = () => set_success_delete(true);
  const handleCloseSuccessDelete = () => set_success_delete(false);
  // delete success toast controller
  const [error_delete, set_error_delete] = useState(false);
  const handleShowErrorDelete = () => set_error_delete(true);
  const handleCloseErrorDelete = () => set_error_delete(false);

  // Add Live Issue
  const [showALLLiveIssue, setShowALLLiveIssue] = useState(false);
  const handleALLLiveIssueClose = () => {
    setShowALLLiveIssue(false);
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
  const handleALLLiveShow = () => setShowALLLiveIssue(true);
  // Add Live Issue
  const [showAddLiveIssue, setShowAddLiveIssue] = useState(false);
  const handleAddLiveIssueClose = () => {
    setShowAddLiveIssue(false);
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
  const handleAddLiveShow = () => setShowAddLiveIssue(true);

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
  const handleUpdateLiveShow = () => setShowUpdateLiveIssue(true);

  // // for Delete Task
  const [show_Delete_Live_issue, setDeleteLiveIssue] = useState(false);
  const handleDeleteLiveIssueShow = () => setDeleteLiveIssue(true);
  const handleDeleteLiveIssueClose = () => {
    setDeleteLiveIssue(false);
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

  const [statusData, setStatus] = useState([]);
  const [PriorityData, setPriorityData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  const [AllLiveIssuesData, setLiveIssuesData] = useState([]);
  const [AllActiveLiveIssuesData, setActiveLiveIssuesData] = useState([]);
  const [AllNotActiveLiveIssuesData, setNotActiveLiveIssuesData] = useState([]);
  const [AllComletedLiveIssuesData, setCompletedLiveIssuesData] = useState([]);

  const [live_issue_Value, setLiveIssueValue] = useState({
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
    is_active: null,
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
  // search team state
  // search state
  const [teamValue, setteam] = useState({
    team_id_search: 0,
  });
  const [status_value, setstatus_value] = useState({
    project_status_id_search: 0,
  });

  // search state
  const [search_key, set_search_key] = useState({
    project_search: null,
  });

  // Keeps track of changes in the database
  const [old_project_data, set_old_project_data] = useState([]);
  function OldData() {
    set_old_project_data(AllLiveIssuesData);
  }

  const latest_data = useMemo(() => old_project_data, [old_project_data]);
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };

    let pm_key = 6;
    // fetch all statuses
    fetch(`${URL}/api/auth/project_status/all`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setStatus(Result.data));

    // fetch all priority values
    fetch(`${URL}/api/auth/priority_type/all`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setPriorityData(Result.data));

    // fetch users
    fetch(`${URL}/api/auth/user/role?id=${pm_key}`, requestOptions)
      .then((response) => response.json())
      .then((Result) => setUserData(Result.data));

    // fetch all teams
    fetch(`${URL}/api/auth/active/teams`, requestOptions)
      .then((response) => response.json())
      .then((res) => setTeamsData(res.data));
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
    if (
      (search_key.project_search === null ||
        search_key.project_search === "") &&
      teamValue.team_id_search === 0 &&
      status_value.project_status_id_search === 0
    ) {
      // fetch  live issues
      fetch(`${URL}/api/auth/live_issues`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLiveIssuesData(result.all_live_issues);
          setActiveLiveIssuesData(result.active_live_issues);
          setNotActiveLiveIssuesData(result.not_active_live_issues);
          setCompletedLiveIssuesData(result.completed_live_issues);
        });
    }
  }, [
    latest_data,
    search_key.project_search,
    teamValue.team_id_search,
    status_value.project_status_id_search,
  ]);

  // filter effect  team
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (teamValue.team_id_search !== 0) {
      fetch(
        `${URL}/api/auth/team/live_issues?team_id=${teamValue.team_id_search}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setLiveIssuesData(result.all_live_issues);
          setActiveLiveIssuesData(result.active_live_issues);
          setNotActiveLiveIssuesData(result.not_active_live_issues);
          setCompletedLiveIssuesData(result.completed_live_issues);
        });
    }
  }, [latest_data, teamValue.team_id_search]);

  // filter status
  // filter effect
  useEffect(() => {
    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (status_value.project_status_id_search !== 0) {
      // fetch all projects for the team
      fetch(
        `${URL}/api/auth/live_issues/status/all?status_type=${status_value.project_status_id_search}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => setLiveIssuesData(res.data));
    }
  }, [status_value]);

  // filter both team and status
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
      teamValue.team_id_search !== 0 &&
      status_value.project_status_id_search !== 0
    ) {
      // fetch all projects for the team
      fetch(
        `${URL}/api/auth/team/live_issues/status/all?team_id=${teamValue.team_id_search}&status_type=${status_value.project_status_id_search}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => setLiveIssuesData(res.data));
    }
  }, [latest_data, status_value, teamValue]);

  // Search
  function handle_Search_Project_Submit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "Get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        "Content-Type": "application/json",
      },
    };
    if (search_key.project_search !== null) {
      fetch(
        `${URL}/api/auth/live_issues/search?search=${search_key.project_search}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          setLiveIssuesData(res.all_live_issues);
          setActiveLiveIssuesData(res.active_live_issues);
          setNotActiveLiveIssuesData(res.not_active_live_issues);
          setCompletedLiveIssuesData(res.completed_live_issues);
        });
    }
  }

  //   Create Live issue Project
  function handle_Add_Live_Issue(event) {
    event.preventDefault();
    const now_date = new Date();
    let default_team = 1;
    var date = new Date();

    liveIssueFormValue.assigned_date = date.toISOString();
    liveIssueFormValue.last_status_change = date.toISOString();

    if (liveIssueFormValue.team_id === default_team) {
      fetch(`${URL}/api/auth/create/live_issues`, {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            last_status_change: liveIssueFormValue.last_status_change,
          },
        }),
      }).then((Response) => {
        Response.json();
        if (Response.status === 201) {
          handleShowsuccessLiveCreate();
          handleAddLiveIssueClose();
          OldData();
        } else if (Response.status === 422) {
          handleShowErrorLiveCreate();
        } else if (Response.status === 401) {
          history("/");
        }
      });
    } else if (liveIssueFormValue.team_id !== default_team) {
      fetch(`${URL}/api/auth/create/live_issues`, {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            assigned_date: liveIssueFormValue.assigned_date,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            last_status_change: now_date.toISOString(),
          },
        }),
      }).then((Response) => {
        Response.json();
        if (Response.status === 201) {
          handleShowsuccessLiveCreate();
          handleAddLiveIssueClose();
          OldData();
        } else if (Response.status === 422) {
          handleShowErrorLiveCreate();
        } else if (Response.status === 401) {
          history("/");
        }
      });
    }
  }
  // Update Live Issues Project
  function handle_Update_Live_Issue(event) {
    event.preventDefault();

    let completion_key = "8";
    var date = new Date();
    // var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    //  date.getHours(), date.getMinutes(), date.getSeconds());
    liveIssueFormValue.assigned_date = date.toISOString();
    liveIssueFormValue.last_status_change = date.toISOString();

    if (liveIssueFormValue.project_status_id === completion_key) {
      handleCompleteLiveIssueShow();
    } else if (
      liveIssueFormValue.project_status_id !==
        live_issue_Value.project_status_id &&
      liveIssueFormValue.project_status_id !== completion_key
    ) {
      fetch(`${URL}/api/auth/live_issue/main/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: live_issue_Value.id,
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            last_status_change: liveIssueFormValue.last_status_change,
            assigned_date: null,
            is_active: true,
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
        }
      });
    } else if (
      liveIssueFormValue.team_id !== live_issue_Value.team_id &&
      liveIssueFormValue.project_status_id !== completion_key
    ) {
      fetch(`${URL}/api/auth/live_issue/main/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: live_issue_Value.id,
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            assigned_date: liveIssueFormValue.assigned_date,
            is_active: true,
          },
        }),
      }).then((Response) => {
        Response.json();
        if (Response.status === 200) {
          handleShowsuccessLiveUpdate();
          handleUpdateLiveIssueClose();
          OldData();
        } else if (Response.status === 422) {
          handleShowServerLiveError();
        }
      });
    } else if (
      liveIssueFormValue.team_id === live_issue_Value.team_id &&
      liveIssueFormValue.project_status_id !== completion_key
    ) {
      fetch(`${URL}/api/auth/live_issue/main/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: live_issue_Value.id,
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            is_active: true,
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
        }
      });
    } else {
      fetch(`${URL}/api/auth/live_issue/main/update`, {
        method: "put",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: live_issue_Value.id,
          live_issue: {
            name: liveIssueFormValue.name,
            business_request_document_status:
              liveIssueFormValue.business_request_document_status,
            business_request_document_link:
              liveIssueFormValue.business_request_document_link,
            team_id: liveIssueFormValue.team_id,
            pm_id: liveIssueFormValue.pm_id,
            project_status_id: liveIssueFormValue.project_status_id,
            priority_type_id: liveIssueFormValue.priority_type_id,
            assigned_date: live_issue_Value.assigned_date,
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
        }
      });
    }
  }
  // Complete Live Issue Project
  function handle_Complete_Live_Issue(event) {
    event.preventDefault();
    var date = new Date();
    // var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    //  date.getHours(), date.getMinutes(), date.getSeconds());
    liveIssueFormValue.last_status_change = date.toISOString();
    let completion_key = "8";

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
          handleShowLiveCompleted();
          handleCompleteLiveIssueClose();
          handleUpdateLiveIssueClose();
          OldData();
        } else if (Response.status === 422) {
          handleShowErrorLiveUpdate();
          handleCompleteLiveIssueClose();
        }
      });
    }
  }

  // Delete Live Issue
  function handleSubmitDeleteLiveIssue(event) {
    event.preventDefault();
    fetch(`${URL}/api/auth/live_issue/delete`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      body: JSON.stringify({
        id: live_issue_Value.id,
      }),
    })
      .then((response) => {
        response.json();
        if (response.status === 200) {
          handleShowSuccessDelete();
          handleDeleteLiveIssueClose();
          OldData();
        } else if (response.status !== 200) {
          handleShowErrorDelete();
          handleDeleteLiveIssueClose();
        } else if (response.status === 500) {
          handleShowServerLiveError();
          handleDeleteLiveIssueClose();
        } else if (response.status === 401) {
          history("/");
        }
      })
      .then((results) => results.json());
  }

  const handleChange = (event) => {
    setLiveIssueFormValue({
      ...liveIssueFormValue,
      [event.target.name]: event.target.value,
    });

    set_search_key({
      ...search_key,
      [event.target.name]: event.target.value,
    });

    setstatus_value({
      ...status_value,
      [event.target.name]: event.target.value,
    });

    setteam({
      ...teamValue,
      [event.target.name]: event.target.value,
    });
  };

  function selectProject(project) {
    var assigned_date = new Date(project.assigned_date).toDateString();
    var last_status = new Date(project.last_status_change).toDateString();
    var last_update = new Date(project.updated_at).toDateString();
    var created_project_at = new Date(project.inserted_at).toDateString();

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
      project_progress: project.project_status.effect,
      project_status_level: project.project_status.level,
      project_status_id: project.project_status.id,
      priority_name: project.priority_type.name,
      priority_level: project.priority_type.level,
      team_id: project.team.id,
      team_name: project.team.name,
      last_status_change: last_status,
      assigned_date: assigned_date,
      is_active: project.is_active,
    });
  }

  return (
    <div>
      <br />
      <Container fluid>
        <Row>
          <Col sm={8}>
            <Card className="shadow">
              <Card.Header>Live Issues </Card.Header>

              <Row>
                <Col>
                  <InputGroup>
                    <Form.Select
                      name="project_status_id_search"
                      onChange={handleChange}
                      id="project_status_id_search"
                      required
                    >
                      <option value={0}>Select Status</option>
                      <></>
                      {statusData.map((status, key) => {
                        return (
                          <option key={key} value={status.id}>
                            {status.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <Form.Select
                      name="team_id_search"
                      onChange={handleChange}
                      id="team_id_search"
                      required
                    >
                      <option value={0}>Select Team</option>
                      {teamsData.map((team, key) => {
                        return (
                          <option key={key} value={team.id}>
                            {team.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col sm={7}>
                  <>
                    <Nav className="justify-content-end">
                      <div className="col-md-7 col-sm-9 me-2">
                        <Form
                          onSubmit={handle_Search_Project_Submit}
                          className="d-flex"
                        >
                          <FormControl
                            type="search"
                            name="project_search"
                            placeholder="Search"
                            onChange={handleChange}
                            className="mr-3"
                            required
                            aria-label="Search"
                          />
                          <Button
                            variant="outline-success"
                            type="submit"
                            size="sm"
                          >
                            <h6>
                              <FcSearch />
                            </h6>
                          </Button>
                        </Form>
                      </div>
                    </Nav>
                  </>
                </Col>
              </Row>
              <Card.Body className="sdm-live-issues-card">
                <Tabs defaultActiveKey="active" className="mb-3">
                  <Tab eventKey="active" title="Active">
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
                        {AllActiveLiveIssuesData.slice(0, 5).map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.name}</td>
                                <td> {project.project_status.name}</td>
                                <td> {project.priority_type.name}</td>
                                <td>{project.user.name}</td>
                                <td>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => selectProject(project)}
                                  >
                                    Select
                                  </Button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-success"
                                      size="sm"
                                      onClick={handleUpdateLiveShow}
                                    >
                                      update
                                    </Button>
                                  </button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={handleDeleteLiveIssueShow}
                                    >
                                      Delete
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
                        {AllComletedLiveIssuesData.slice(0, 5).map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.name}</td>
                                <td> {project.project_status.name}</td>
                                <td> {project.priority_type.name}</td>
                                <td>{project.user.name}</td>
                                <td className="text-center">
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => selectProject(project)}
                                  >
                                    Select
                                  </Button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-success"
                                      size="sm"
                                      onClick={handleUpdateLiveShow}
                                    >
                                      update
                                    </Button>
                                  </button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={handleDeleteLiveIssueShow}
                                    >
                                      Delete
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
                  <Tab eventKey="disablled" title="Not Active">
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
                        {AllNotActiveLiveIssuesData.slice(0, 5).map(
                          (project, Index) => {
                            return (
                              <tr key={Index}>
                                <td>{project.name}</td>
                                <td> {project.project_status.name}</td>
                                <td> {project.priority_type.name}</td>
                                <td>{project.user.name}</td>
                                <td className="text-center">
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => selectProject(project)}
                                  >
                                    Select
                                  </Button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-success"
                                      size="sm"
                                      onClick={handleUpdateLiveShow}
                                    >
                                      update
                                    </Button>
                                  </button>
                                  <button
                                    size="sm"
                                    className="btn"
                                    onClick={() => selectProject(project)}
                                  >
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={handleDeleteLiveIssueShow}
                                    >
                                      Delete
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
                          <th>Status </th>
                          <th>Priority</th>
                          <th> PM</th>
                          <th> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AllLiveIssuesData.slice(0, 5).map((project, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{project.name}</td>
                              <td> {project.project_status.name}</td>
                              <td> {project.priority_type.name}</td>
                              <td>{project.user.name}</td>
                              <td className="text-center">
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => selectProject(project)}
                                >
                                  Select
                                </Button>
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectProject(project)}
                                >
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleUpdateLiveShow}
                                  >
                                    update
                                  </Button>
                                </button>
                                <button
                                  size="sm"
                                  className="btn"
                                  onClick={() => selectProject(project)}
                                >
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleDeleteLiveIssueShow}
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
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="success" size="sm" onClick={handleALLLiveShow}>
                  All
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={handleAddLiveShow}>
                  Add Live Issue
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="shadow">
              <Card.Header>projects Details</Card.Header>
              <Card.Body className="sdm-live-issues-details-card">
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
                        end={100 - "live_issue_Value.progress"}
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
              </Card.Body>
              <Card.Footer className="text-center">full details</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      {/* All Live Issue Records */}

      <Modal
        fullscreen={true}
        show={showALLLiveIssue}
        onHide={handleALLLiveIssueClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Live Issues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="sdm-live-issue-modal-card">
              <Row>
                <Col sm={8}>
                  <Card>
                    <Card.Header>Live Issues </Card.Header>
                    <Row className="mt-3">
                      <Col>
                        <InputGroup>
                          <Form.Select
                            name="project_status_id_search"
                            onChange={handleChange}
                            id="project_status_id_search"
                            required
                          >
                            <option value={0}>Select Status</option>
                            <></>
                            {statusData.map((status, key) => {
                              return (
                                <option key={key} value={status.id}>
                                  {status.name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Form.Select
                            name="team_id_search"
                            onChange={handleChange}
                            id="team_id_search"
                            required
                          >
                            <option value={0}>Select Team</option>
                            {teamsData.map((team, key) => {
                              return (
                                <option key={key} value={team.id}>
                                  {team.name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </InputGroup>
                      </Col>
                      <Col sm={7}>
                        <>
                          <Nav className="justify-content-end">
                            <div className="col-md-7 col-sm-9 me-3">
                              <Form
                                onSubmit={handle_Search_Project_Submit}
                                className="d-flex"
                              >
                                <FormControl
                                  type="search"
                                  name="project_search"
                                  placeholder="Search"
                                  onChange={handleChange}
                                  className="mr-3"
                                  required
                                  aria-label="Search"
                                />
                                <Button
                                  variant="outline-success"
                                  type="submit"
                                  size="sm"
                                >
                                  <h6>
                                    <FcSearch />
                                  </h6>
                                </Button>
                              </Form>
                            </div>
                          </Nav>
                        </>
                      </Col>
                    </Row>{" "}
                    <Card.Body className="sdm-live-issue-modal-live-issues-card">
                      <Tabs defaultActiveKey="active" className="mb-3">
                        <Tab eventKey="active" title="Active">
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
                              {AllActiveLiveIssuesData.map((project, Index) => {
                                return (
                                  <tr key={Index}>
                                    <td>{project.name}</td>
                                    <td> {project.project_status.name}</td>
                                    <td> {project.priority_type.name}</td>
                                    <td>{project.user.name}</td>
                                    <td className="text-center">
                                      <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => selectProject(project)}
                                      >
                                        Select
                                      </Button>{" "}
                                      <button
                                        size="sm"
                                        className="btn"
                                        onClick={() => selectProject(project)}
                                      >
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={handleUpdateLiveShow}
                                        >
                                          update
                                        </Button>
                                      </button>{" "}
                                      <button
                                        size="sm"
                                        className="btn"
                                        onClick={() => selectProject(project)}
                                      >
                                        <Button
                                          variant="outline-danger"
                                          size="sm"
                                          onClick={handleDeleteLiveIssueShow}
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
                                <th>Name</th>
                                <th>Status </th>
                                <th>Priority</th>
                                <th> PM</th>
                                <th> Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {AllComletedLiveIssuesData.map(
                                (project, Index) => {
                                  return (
                                    <tr key={Index}>
                                      <td>{project.name}</td>
                                      <td> {project.project_status.name}</td>
                                      <td> {project.priority_type.name}</td>
                                      <td>{project.user.name}</td>
                                      <td className="text-center">
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={() => selectProject(project)}
                                        >
                                          Select
                                        </Button>{" "}
                                        <button
                                          size="sm"
                                          className="btn"
                                          onClick={() => selectProject(project)}
                                        >
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={handleUpdateLiveShow}
                                          >
                                            update
                                          </Button>
                                        </button>{" "}
                                        <button
                                          size="sm"
                                          className="btn"
                                          onClick={() => selectProject(project)}
                                        >
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={handleDeleteLiveIssueShow}
                                          >
                                            Delete
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
                        <Tab eventKey="disablled" title="Not Active">
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
                              {AllNotActiveLiveIssuesData.map(
                                (project, Index) => {
                                  return (
                                    <tr key={Index}>
                                      <td>{project.name}</td>
                                      <td> {project.project_status.name}</td>
                                      <td> {project.priority_type.name}</td>
                                      <td>{project.user.name}</td>
                                      <td className="text-center">
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={() => selectProject(project)}
                                        >
                                          Select
                                        </Button>{" "}
                                        <button
                                          size="sm"
                                          className="btn"
                                          onClick={() => selectProject(project)}
                                        >
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={handleUpdateLiveShow}
                                          >
                                            update
                                          </Button>
                                        </button>{" "}
                                        <button
                                          size="sm"
                                          className="btn"
                                          onClick={() => selectProject(project)}
                                        >
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={handleDeleteLiveIssueShow}
                                          >
                                            Delete
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
                                <th>Status </th>
                                <th>Priority</th>
                                <th> PM</th>
                                <th> Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {AllLiveIssuesData.map((project, Index) => {
                                return (
                                  <tr key={Index}>
                                    <td>{project.name}</td>
                                    <td> {project.project_status.name}</td>
                                    <td> {project.priority_type.name}</td>
                                    <td>{project.user.name}</td>
                                    <td className="text-center">
                                      <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => selectProject(project)}
                                      >
                                        Select
                                      </Button>{" "}
                                      <button
                                        size="sm"
                                        className="btn"
                                        onClick={() => selectProject(project)}
                                      >
                                        <Button
                                          variant="outline-success"
                                          size="sm"
                                          onClick={handleUpdateLiveShow}
                                        >
                                          update
                                        </Button>
                                      </button>{" "}
                                      <button
                                        size="sm"
                                        className="btn"
                                        onClick={() => selectProject(project)}
                                      >
                                        <Button
                                          variant="outline-danger"
                                          size="sm"
                                          onClick={handleDeleteLiveIssueShow}
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
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleAddLiveShow}
                      >
                        Add Live Issue
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Live Issue Details </Card.Header>
                    <Card.Body className="sdm-live-issue-modal-live-issues-details-card">
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
                          <p>{live_issue_Value.last_status_update}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>Days Since Last Status Update:</Col>
                        <Col>
                          <Badge pill bg="info">
                            <CountUp
                              start={0}
                              end={100 - "live_issue_Value.progress"}
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
                    </Card.Body>
                    <Card.Footer className="text-center">
                      full details
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

      {/* Add Live Issue */}

      <Modal
        show={showAddLiveIssue}
        onHide={handleAddLiveIssueClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Live Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_Add_Live_Issue}>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name :
              </InputGroup.Text>
              <FormControl
                aria-label="ProjectName"
                aria-describedby="name"
                name="name"
                placeholder="Project Name"
                type="text"
                onChange={handleChange}
                value={liveIssueFormValue.name}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className="col-4"
                id="business_request_document_status"
              >
                {" "}
                BRD Available:{" "}
              </InputGroup.Text>
              <Form.Select
                name="business_request_document_status"
                id="business_request_document_status"
                onChange={handleChange}
                value={liveIssueFormValue.business_request_document_status}
                required
              >
                {" "}
                <option value="">BRD Status</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                className="col-4"
                id="business_request_document_link"
              >
                {" "}
                BRD File:{" "}
              </InputGroup.Text>
              <Form.Control
                type="file"
                name="business_request_document_link"
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="team_id">
                {" "}
                Team:{" "}
              </InputGroup.Text>
              <Form.Select
                name="team_id"
                onChange={handleChange}
                id="team_id"
                required
              >
                <option value="">Select Team</option>
                {teamsData.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="pm_id">
                {" "}
                PM:{" "}
              </InputGroup.Text>
              <Form.Select
                name="pm_id"
                onChange={handleChange}
                id="pm_id"
                required
              >
                {" "}
                <option value="">Select PM</option>
                {userData.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="project_status_id">
                {" "}
                Status:{" "}
              </InputGroup.Text>
              <Form.Select
                name="project_status_id"
                onChange={handleChange}
                id="project_status_id"
                required
              >
                {" "}
                <option value="">Assign</option>
                <></>
                {statusData.map((status, key) => {
                  return (
                    <option key={key} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}{" "}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="priority_type_id">
                {" "}
                Priority:{" "}
              </InputGroup.Text>
              <Form.Select
                name="priority_type_id"
                onChange={handleChange}
                id="priority_type_id"
                required
              >
                {" "}
                <option value="">Assign</option>
                {PriorityData.map((priority, key) => {
                  return (
                    <option key={key} value={priority.id}>
                      {priority.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <br />
            <Button variant="primary" type="submit">
              Add Live Issue
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddLiveIssueClose}
          >
            Close
          </Button>
        </Modal.Footer>

        <ToastContainer className="p-3" position={"top-end"}>
          {/* Error Create */}
          <Toast
            onClose={handleCloseErrorLiveCreate}
            show={error_live_create}
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
        </ToastContainer>
      </Modal>

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
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="name">
                Name:
              </InputGroup.Text>
              <FormControl
                aria-label="ProjectName"
                aria-describedby="name"
                name="name"
                placeholder="Project Name"
                type="text"
                onChange={handleChange}
                value={liveIssueFormValue.name}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                className="col-4"
                id="business_request_document_status"
              >
                {" "}
                BRD Available:{" "}
              </InputGroup.Text>
              <Form.Select
                name="business_request_document_status"
                id="business_request_document_status"
                onChange={handleChange}
                value={liveIssueFormValue.business_request_document_status}
                required
              >
                <option value="">BRD Status</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className="col-4"
                id="business_request_document_status"
              >
                {" "}
                BRD File:{" "}
              </InputGroup.Text>
              <Form.Control
                type="file"
                name="business_request_document_link"
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="team_id">
                {" "}
                Team:{" "}
              </InputGroup.Text>
              <Form.Select
                name="team_id"
                onChange={handleChange}
                id="team_id"
                value={liveIssueFormValue.team_id}
                required
              >
                {" "}
                <option value="">Select Team</option>
                {teamsData.map((team, key) => {
                  return (
                    <option key={key} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="pm_id">
                {" "}
                PM:{" "}
              </InputGroup.Text>
              <Form.Select
                name="pm_id"
                onChange={handleChange}
                id="pm_id"
                value={liveIssueFormValue.pm_id}
                required
              >
                <option value="">Select PM</option>
                {userData.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>

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
                <></>
                {statusData.map((status, key) => {
                  return (
                    <option key={key} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="col-4" id="priority_type_id">
                {" "}
                Priority:{" "}
              </InputGroup.Text>
              <Form.Select
                name="priority_type_id"
                onChange={handleChange}
                id="priority_type_id"
                value={liveIssueFormValue.priority_type_id}
                required
              >
                <option value="">Assign</option>

                {PriorityData.map((priority, key) => {
                  return (
                    <option key={key} value={priority.id}>
                      {priority.name}
                    </option>
                  );
                })}
              </Form.Select>
            </InputGroup>
            <br />
            <Button variant="success" type="submit">
              Done
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

      {/* Delete Live Issue */}
      {/*  Task */}
      <Modal
        show={show_Delete_Live_issue}
        onHide={handleDeleteLiveIssueClose}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Live Issue </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          please note your are about remove <b>{live_issue_Value.name}</b> from
          the system this action can not be undone/reversed you will be required
          to create a new live Issue
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDeleteLiveIssueClose}
          >
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitDeleteLiveIssue}
          >
            Yes
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
          <Modal.Title>Completion Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          this is to confirm that <b>{live_issue_Value.team_name} completed </b>
          <b>{live_issue_Value.name}</b> the live issue project/task.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCompleteLiveIssueClose}
          >
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handle_Complete_Live_Issue}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="p-3" position={"top-end"}>
        {/* Successfully Create */}
        <Toast
          onClose={handleCloseSuccessLiveCreate}
          show={success_live_create}
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
          <Toast.Body className="text-white"> Updated Successfully</Toast.Body>
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
            <strong className="me-auto">Completed</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Live Issues resolved </Toast.Body>
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
      </ToastContainer>
    </div>
  );
}

export default LiveIssues;
