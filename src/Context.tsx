import React, { useState } from "react";
import IEmpresa from "./interfaces/IEmpresa";

const SAMPLES = [
  {
    cidade: "Betim",
    uf: "São Paulo",
    bairro: "Jardim das Alterosas",
    complemento: "2ª Seção",
    numero: "150",
    endereco: "Rua São Pedro",
    cep: "32673100",
    dataAbertura: "1998-05-05T03:00:00.000Z",
    email: "eduardo@gmail.com",
    nome: "Eduardo",
    documento: "105853969",
    tipoDocumento: "RG",
    image: {},
    id: "krxs37xz",
  },
];

type GlobalContextType = {
  getEmpresas: () => IEmpresa[];
  getEmpresa: (id: string) => IEmpresa | undefined;
  addEmpresa: (empresa: IEmpresa) => void;
  editEmpresa: (empresa: IEmpresa) => void;
  removeEmpresa: (id: string) => void;
};

export const GlobalContext = React.createContext({} as GlobalContextType);

export const GlobalStorage = ({ children }: { children: React.ReactNode }) => {
  const [listaEmpresas, setListaEmpresas] = useState<IEmpresa[]>([...SAMPLES]);

  const getEmpresa = (id: string) => {
    const findRes = listaEmpresas.find((v) => v.id === id);
    if (findRes) return findRes;
    else return undefined;
  };

  const getEmpresas = () => {
    return [...listaEmpresas];
  };

  const addEmpresa = (empresa: IEmpresa) => {
    const findId = listaEmpresas.find((e) => e.id === empresa.id);
    if (findId) return;
    setListaEmpresas((prvState) => [...prvState, empresa]);
  };

  const editEmpresa = (empresa: IEmpresa) => {};

  const removeEmpresa = (id: string) => {
    setListaEmpresas((prvState) => {
      const filtered = prvState.filter((item) => item.id !== id);
      return [...filtered];
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        getEmpresas,
        getEmpresa,
        addEmpresa,
        editEmpresa,
        removeEmpresa,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
