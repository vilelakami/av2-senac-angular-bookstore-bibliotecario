// criando interface livro com id opcional, titulo, autor e ano
export interface Livro {
    _id?: string;
    titulo: string;
    autor: string;
    ano: number;
    imagem?: string;
}