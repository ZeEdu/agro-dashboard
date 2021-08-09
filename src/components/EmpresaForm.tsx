import {
  AppBar,
  Avatar,
  Button,
  Container,
  createStyles,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React, { FC, useState } from "react";
import * as yup from "yup";
import uniqid from "uniqid";

import IEmpresa from "../interfaces/IEmpresa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../Context";
import { useHistory } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "2.8125rem",
    },
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
    imageInputWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    imageInput: {
      display: "none",
    },
    imageLabel: {
      display: "flex",

      "&:hover": {
        cursor: "pointer",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    row: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        flex: 1,
        "&:last-child": {
          flexGrow: 2,
        },
      },
    },
    lastFormControl: {
      flexGrow: 2,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type imageType = {
  preview: string | undefined;
  raw: any | undefined;
};

const errorMessages = {
  required: "O campo é obrigatório",
  email: "Email mal formatado",
};

const formSchema = yup.object().shape({
  tipoDocumento: yup.string().required(errorMessages.required),
  documento: yup.string().required(errorMessages.required),
  nome: yup.string().required(errorMessages.required),
  email: yup
    .string()
    .required(errorMessages.required)
    .email(errorMessages.email),
  dataAbertura: yup.date().required(errorMessages.required),
  cep: yup.string().required(errorMessages.required),
  endereco: yup.string().required(errorMessages.required),
  numero: yup.string().required(errorMessages.required),
  complemento: yup.string().required(errorMessages.required),
  bairro: yup.string().required(errorMessages.required),
  uf: yup.string().required(errorMessages.required),
  cidade: yup.string().required(errorMessages.required),
});

type formData = {
  tipoDocumento: string;
  documento: string;
  nome: string;
  email: string;
  dataAbertura: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  cidade: string;
};

interface Props {
  method: "add" | "edit";
  data?: IEmpresa;
}

const EmpresaForm: FC<Props> = ({ method, data }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const { addEmpresa, editEmpresa } = React.useContext(GlobalContext);
  const history = useHistory();

  const [image, setImage] = useState<imageType | undefined>(undefined);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (event: any) => {
    if (!event.target.files[0]) return;
    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0],
    });
  };

  const handleImageError = () => {
    setImageError("Provida uma imagem da empresa");
  };

  const onSubmit = (values: formData) => {
    if (!image) return handleImageError();

    const empresa: IEmpresa = {
      ...values,
      image: image.raw,
      id: uniqid(),
    };

    if (method === "add") addEmpresa(empresa);
    else if (method === "edit") {
      editEmpresa(empresa);
    }
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <AppBar position="relative" color="primary">
                  <Toolbar>
                    <IconButton edge="start" className={classes.leftButton}>
                      <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Empresas / {method === "add" && "Cadastrar"}{" "}
                      {method === "edit" && "Editar"} Empresa
                    </Typography>
                    <Button variant="contained" color="primary" type="submit">
                      Salvar
                    </Button>
                  </Toolbar>
                </AppBar>
                <Grid container>
                  <Grid item xs={12} md={2}>
                    <div className={classes.imageInputWrapper}>
                      <label
                        htmlFor="avatar-button-file"
                        className={classes.imageLabel}
                      >
                        <input
                          accept="image/*"
                          className={classes.imageInput}
                          id="avatar-button-file"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <IconButton
                          aria-label="Upload Picture"
                          component="span"
                        >
                          <Avatar
                            alt="Placeholder Image"
                            src={image?.preview ? image.preview : undefined}
                          />
                        </IconButton>
                        {imageError && (
                          <FormHelperText error={true}>
                            {imageError}
                          </FormHelperText>
                        )}
                      </label>
                    </div>
                  </Grid>
                  <Grid item container xs={12} md={10}>
                    <Grid item className={classes.row}>
                      <FormSelect
                        name="tipoDocumento"
                        control={control}
                        defaultValue={data ? data["tipoDocumento"] : ""}
                        error={Boolean(
                          errors["tipoDocumento"] &&
                            touchedFields["tipoDocumento"]
                        )}
                        label="Tipo de Documento"
                        message={
                          errors["documento"] ? errors["documento"].message : ""
                        }
                        options={[
                          { name: "RG", value: "RG" },
                          { name: "CPF", value: "CPF" },
                        ]}
                      />
                      <FormInput
                        name="documento"
                        control={control}
                        defaultValue={data ? data["documento"] : ""}
                        label="Documento"
                        error={Boolean(
                          errors["documento"] && touchedFields["documento"]
                        )}
                        message={
                          errors["documento"] ? errors["documento"].message : ""
                        }
                      />

                      <FormInput
                        name="nome"
                        control={control}
                        defaultValue={data ? data["nome"] : ""}
                        label="Nome"
                        error={Boolean(errors["nome"] && touchedFields["nome"])}
                        message={errors["nome"] ? errors["nome"].message : ""}
                      />
                    </Grid>
                    <Grid item className={classes.row}>
                      <FormInput
                        name="dataAbertura"
                        control={control}
                        defaultValue={
                          data ? new Date(data["dataAbertura"]) : ""
                        }
                        label="Data de Abertura"
                        error={Boolean(
                          errors["dataAbertura"] &&
                            touchedFields["dataAbertura"]
                        )}
                        message={
                          errors["dataAbertura"]
                            ? errors["dataAbertura"].message
                            : ""
                        }
                      />
                      <FormInput
                        name="email"
                        control={control}
                        defaultValue={data ? data["email"] : ""}
                        label="Email"
                        error={Boolean(
                          errors["email"] && touchedFields["email"]
                        )}
                        message={errors["email"] ? errors["email"].message : ""}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Paper style={{ marginTop: "1rem" }}>
                <Grid container>
                  <Grid item className={classes.row}>
                    <FormInput
                      name="cep"
                      control={control}
                      defaultValue={data ? data["cep"] : ""}
                      label="CEP"
                      error={Boolean(errors["cep"] && touchedFields["cep"])}
                      message={errors["cep"] ? errors["cep"].message : ""}
                    />
                    <FormInput
                      name="endereco"
                      control={control}
                      defaultValue={data ? data["endereco"] : ""}
                      label="Endereço"
                      error={Boolean(
                        errors["endereco"] && touchedFields["endereco"]
                      )}
                      message={
                        errors["endereco"] ? errors["endereco"].message : ""
                      }
                    />
                  </Grid>
                  <Grid item className={classes.row}>
                    <FormInput
                      name="numero"
                      control={control}
                      defaultValue={data ? data["numero"] : ""}
                      label="Número"
                      error={Boolean(
                        errors["numero"] && touchedFields["numero"]
                      )}
                      message={errors["numero"] ? errors["numero"].message : ""}
                    />
                    <FormInput
                      name="complemento"
                      control={control}
                      defaultValue={data ? data["complemento"] : ""}
                      label="Complemento"
                      error={Boolean(
                        errors["complemento"] && touchedFields["complemento"]
                      )}
                      message={
                        errors["complemento"]
                          ? errors["complemento"].message
                          : ""
                      }
                    />

                    <FormInput
                      name="bairro"
                      control={control}
                      defaultValue={data ? data["bairro"] : ""}
                      label="Bairro"
                      error={Boolean(
                        errors["bairro"] && touchedFields["bairro"]
                      )}
                      message={errors["bairro"] ? errors["bairro"].message : ""}
                    />

                    <FormSelect
                      name="uf"
                      control={control}
                      defaultValue={data ? data["uf"] : ""}
                      error={Boolean(errors["uf"] && touchedFields["uf"])}
                      label="UF"
                      message={errors["uf"] ? errors["uf"].message : ""}
                      options={[
                        { name: "SP", value: "São Paulo" },
                        { name: "RJ", value: "Rio de Janeiro" },
                      ]}
                    />
                    <FormInput
                      name="cidade"
                      control={control}
                      defaultValue={data ? data["cidade"] : ""}
                      label="Cidade"
                      error={Boolean(
                        errors["cidade"] && touchedFields["cidade"]
                      )}
                      message={errors["cidade"] ? errors["cidade"].message : ""}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
};

export default EmpresaForm;
