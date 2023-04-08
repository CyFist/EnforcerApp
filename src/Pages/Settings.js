import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { QnBnkAtom } from "../state/quizState";

const columns = [
  {
    field: "Question",
    headerName: "Question",
    width: 600,
    editable: true,
  },
  {
    field: "Option1",
    headerName: "Option1",
    width: 200,
    editable: true,
  },
  {
    field: "Option2",
    headerName: "Option2",
    width: 200,
    editable: true,
  },
  {
    field: "Option3",
    headerName: "Option3",
    width: 200,
    editable: true,
  },
  {
    field: "Option4",
    headerName: "Option4",
    width: 200,
    editable: true,
  },
  {
    field: "Answer",
    headerName: "Answer",
    width: 200,
    editable: true,
  },
  /*{
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
  }*/
];

export default function Settings() {
  const qBank = useRecoilValue(QnBnkAtom);

  console.log(qBank);
  return (
    <Container>
      <Box sx={{ p: 3, height: "90vh", width: "100%" }}>
        <DataGrid
          rows={qBank}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          columnBuffer={2}
          columnThreshold={2}
          pageSizeOptions={[12]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
