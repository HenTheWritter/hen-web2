export interface Pokemon {
  id?: number;
  nome: string;
  descricao: string;
  tipo: string;
  numero: number;
  imagemUrl?: string;
}

export const TIPOS_POKEMON = [
  "Normal", "Fogo", "Água", "Planta", "Elétrico", "Gelo", "Lutador",
  "Venenoso", "Terra", "Voador", "Psíquico", "Inseto", "Pedra",
  "Fantasma", "Dragão", "Sombrio", "Aço", "Fada",
];

export const COR_TIPO: Record<string, string> = {
  Normal: "#a8a77a", Fogo: "#ee8130", Água: "#6390f0", Planta: "#4caf50",
  Elétrico: "#e6b800", Gelo: "#5ec8c8", Lutador: "#c22e28", Venenoso: "#a33ea1",
  Terra: "#b8923a", Voador: "#8d7fe0", Psíquico: "#f95587", Inseto: "#8aa31a",
  Pedra: "#a08c2f", Fantasma: "#735797", Dragão: "#6f35fc", Sombrio: "#6d5748",
  Aço: "#7a7aa0", Fada: "#d685ad",
};