import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Select from "./Select";

import { create, deleteOne } from "../../api/quizApi";

const getLanguages = (data) => (data && Object.keys(data)) || [];
const getGroups = (data, language) =>
  (data && language && data[language] && Object.keys(data[language])) || [];

const getQuestions = (data, language, group) =>
  (data && language && group && data[language][group]) || [];

function EditToolbar(props) {
  const {
    setRows,
    setRowModesModel,
    languages,
    selectedLanguage,
    selectedGroup,
    setSelectedLanguage,
    setSelectedGroup,
  } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        language: selectedLanguage || "",
        group: selectedGroup || "",
        local: "",
        foreign: "",
        foreignDisplay: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Select
        title="Language"
        items={getLanguages(languages)}
        setValue={setSelectedLanguage}
      />
      <Select
        title="Group"
        items={getGroups(languages, selectedLanguage)}
        setValue={setSelectedGroup}
      />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid(props) {
  const { showTable, languages } = props;
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [selectedGroup, setSelectedGroup] = React.useState();

  React.useEffect(() => {
    setRows(
      (selectedLanguage &&
        selectedGroup &&
        languages[selectedLanguage] &&
        languages[selectedLanguage][selectedGroup]) ||
        []
    );
  }, [languages, selectedGroup, selectedLanguage]);

  if (!showTable) {
    return undefined;
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      setRows(rows.filter((row) => row.id !== id));
      await deleteOne(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // setQuestions((prevQuestions) => {
    //   console.log(prevQuestions, newRow);
    //   prevQuestions.push(newRow);
    //   return prevQuestions;
    // });

    try {
      await create(newRow);
    } catch (error) {
      console.log("error posting", error);
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "language", headerName: "Language", width: 180, editable: true },
    { field: "group", headerName: "Group", width: 180, editable: true },
    { field: "local", headerName: "Local", width: 180, editable: true },
    { field: "foreign", headerName: "Foreign", width: 180, editable: true },
    {
      field: "foreignDisplay",
      headerName: "Display",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        height: "100%",
        background: "white",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            languages,
            selectedLanguage,
            selectedGroup,
            setSelectedLanguage,
            setSelectedGroup,
          },
        }}
      />
    </Box>
  );
}
