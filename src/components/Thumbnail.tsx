import {
  Card,
  CardContent,
  SvgIconTypeMap,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/styles";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 250,
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    fontSize: 72,
    marginTop: 12,
    color: "#828D8C",
  },
});

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  text: string;
  link: string;
};

const Thumbnail: FC<Props> = ({ Icon, text, link }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(link);
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <Icon className={classes.icon} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Thumbnail;
