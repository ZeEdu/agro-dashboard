import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import TableEmpresas from "../components/TableEmpresas";
import { GlobalContext } from "../Context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "2.8125rem",
    },
  })
);

const ListarEmpresas = () => {
  const { getEmpresas } = React.useContext(GlobalContext);
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <TableEmpresas rows={getEmpresas()} />
      </div>
    </Container>
  );
};

export default ListarEmpresas;
