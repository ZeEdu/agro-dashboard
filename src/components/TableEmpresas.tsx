import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { MoreVert } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../Context";
import IEmpresa from "../interfaces/IEmpresa";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftButton: {
      marginRight: theme.spacing(2),
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      flexGrow: 1,
    },
    table: {
      minWidth: 500,
    },
    idWrapper: {
      marginLeft: theme.spacing(1),
    },
    idTitle: {
      display: "block",
      fontWeight: "bold",
      color: "#484E6A",
    },
    idSubTitle: {
      display: "block",
      color: "#9AA2A1",
    },
    bodyCell: {
      color: "#484E6A",
    },
  })
);

type Props = {
  rows: IEmpresa[];
};

const TableEmpresas: FC<Props> = ({ rows }) => {
  const { removeEmpresa } = React.useContext(GlobalContext);
  const { push } = useHistory();
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditButton = (id: string) => {
    push(`/edit/${id}`);
    handleClose();
  };
  const handleRemoveButton = (id: string) => {
    removeEmpresa(id);
    handleClose();
  };

  return (
    <TableContainer component={Paper}>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.leftButton}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Empresas
          </Typography>
        </Toolbar>
      </AppBar>
      <Table
        className={classes.table}
        size="small"
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Identificação</TableCell>
            <TableCell>Cidade/UF</TableCell>
            <TableCell>CEP </TableCell>
            <TableCell>Data de Abertura</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Grid container>
                  <Grid item>
                    <Avatar>{row.nome.slice(0)[0]}</Avatar>
                  </Grid>
                  <Grid item>
                    <div className={classes.idWrapper}>
                      <span className={classes.idTitle}>{row.nome}</span>
                      <span className={classes.idSubTitle}>
                        {row.documento}
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <span className={classes.bodyCell}>
                  {row.cidade}/{row.uf}
                </span>
              </TableCell>
              <TableCell>
                <span className={classes.bodyCell}>{row.cep}</span>
              </TableCell>
              <TableCell>
                <span className={classes.bodyCell}>
                  {new Date(row.dataAbertura).getMonth() + 1} /
                  {new Date(row.dataAbertura).getFullYear()}
                </span>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem onClick={() => handleEditButton(row.id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleRemoveButton(row.id)}>
                    Inativar
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableEmpresas;
