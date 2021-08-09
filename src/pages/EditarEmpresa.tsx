import React from "react";
import { useParams } from "react-router-dom";
import EmpresaForm from "../components/EmpresaForm";
import { GlobalContext } from "../Context";
import IEmpresa from "../interfaces/IEmpresa";

const EditarEmpresa = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmpresa } = React.useContext(GlobalContext);
  let empresa: IEmpresa | undefined;
  if (id) empresa = getEmpresa(id);

  if (empresa) return <EmpresaForm method="add" data={empresa} />;

  return <div></div>;
};

export default EditarEmpresa;
