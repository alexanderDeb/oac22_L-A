import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const DataTable = ({ rows, columns, loading, onSelectionModelChange, getRowId }) => {
  const [pageSize, setPageSize] = useState(20);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  return (
    <div className="h-full p-5 bg-white border-gray-200 border drop-shadow-lg rounded-md">
      <StripedDataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        loading={loading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        rowsPerPageOptions={[6, 10, 20, 40, 60, 80]}
        pagination
        pageSize={pageSize}
        checkboxSelection={false}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // onSelectionModelChange={itm => console.log(itm)}
        onSelectionModelChange={onSelectionModelChange}
        disableSelectionOnClick={true}
      />
    </div>
  );
};

export default DataTable;
