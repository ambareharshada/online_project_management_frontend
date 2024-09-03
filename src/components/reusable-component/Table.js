import { useState, useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import "./CustomTable.css";
import ReactPaginate from "react-paginate";

const CustomTable = ({ columns, data, headerNames }) => {
  // State to handle sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Handle sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setPageSize,
    gotoPage,
    rows,
    setGlobalFilter,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      data: sortedData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  // Function to handle sorting change
  const handleSortChange = (e) => {
    const [key, direction] = e.target.value.split("-");
    setSortConfig({ key, direction });
  };

  const handlePageChange = ({ selected }) => {
    gotoPage(selected);
  };

  return (
    <div className="container" style={{ margin: "0", padding: "0" ,maxWidth:"1233px"}}>
      <div
        className="search-container"
        style={{ marginTop: "10px", marginLeft: "10px", float: "left" }}
      >
        <input
          className="form-control search mb-3"
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
        />
      </div>

      {/* Sorting Dropdown */}

      <div
        className="page-size-container"
        style={{ float: "right", marginTop: "5px" }}
      >
        <select className="form-select " onChange={handleSortChange}>
          {columns.map((column) => (
            // <optgroup key={column.id}>
            <option value={`${column.accessor}-asc`}>{column.Header}</option>
            // </optgroup>
          ))}
        </select>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={Math.ceil(data.length / pageSize)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
        {/* <div className="page-size-container" style={{ float: "right" }}>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default CustomTable;
