import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

const TableWithManualExport = () => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#myTable",
      theme: "grid",
    });
    doc.save("table.pdf");
  };

  const exportToExcel = () => {
    const table = document.getElementById("myTable");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table.xlsx");
  };

  return (
    <div>
      <Button variant="contained" onClick={exportToPDF}>
        Export to PDF <i class="fa-regular fa-file-pdf ms-1   "></i>
      </Button>
      <Button variant="contained" className="ms-2" onClick={exportToExcel}>
        Export to Excel{" "}
        <i class="fa-regular fa-file-excel ms-1 bg-success "></i>
      </Button>
      <table
        className="table table-bordered table-light table-striped    "
        id="myTable"
        border="1"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>28</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>32</td>
            <td>Los Angeles</td>
          </tr>
          <tr>
            <td>Mike</td>
            <td>45</td>
            <td>Chicago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableWithManualExport;
