import { Container, Grid, Typography } from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Thumbnail from "../components/Thumbnail";

const Home = () => {
  return (
    <Container>
      <header>
        <Typography variant="h6">Início</Typography>
      </header>
      <Grid container spacing={2}>
        <Grid item>
          <Thumbnail
            Icon={HomeWorkIcon}
            text="Listar Empresas"
            link="/listar"
          />
        </Grid>
        <Grid item>
          <Thumbnail
            Icon={StorefrontIcon}
            text="Cadastrar Empresa"
            link="/cadastrar"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
