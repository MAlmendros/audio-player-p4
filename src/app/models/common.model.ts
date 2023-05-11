export interface Song {
    id: number;
    title: string;
    author: string;
    year: number;
    album: string;
    genre: string[];
    label: string;
    country: string;
    duration: number;
    producer: string;
    showDetails: boolean; // Esta variable es de control para mostrar o no el detalle.
}
