import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function FlightRuleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flight Rule Code</TableCell>
            <TableCell align="center">Ceiling</TableCell>
            <TableCell align="center">Visibility</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ color: "white", backgroundColor: "green" }}
            >
              VFR
            </TableCell>
            <TableCell align="center">&gt; 3000ft</TableCell>
            <TableCell align="center">&gt; 8000m</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ color: "white", backgroundColor: "blue" }}
            >
              MVFR
            </TableCell>
            <TableCell align="center">1000-3000ft</TableCell>
            <TableCell align="center">5000-8000m</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ color: "white", backgroundColor: "red" }}
            >
              IFR
            </TableCell>
            <TableCell align="center">500-1000ft</TableCell>
            <TableCell align="center">1500-5000m</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ color: "white", backgroundColor: "purple" }}
            >
              LIFR
            </TableCell>
            <TableCell align="center">&lt; 500ft</TableCell>
            <TableCell align="center">&lt; 1500m</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ color: "white", backgroundColor: "black" }}
            >
              UNKN
            </TableCell>
            <TableCell align="center">incomplete data</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FlightRuleTable;
