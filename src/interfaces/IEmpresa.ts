export default interface IEmpresa {
  id: string;
  tipoDocumento: string;
  documento: string;
  nome: string;
  email: string;
  dataAbertura: string;
  image?: any;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  cidade: string;
}
