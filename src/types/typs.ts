export type productstype = {
    id: string;
    details: string;
    title: string;
    img: string;
    price: number;
}
export type carttype = {
    details: string;
    title: string;
    img: string;
    price: number;
    count: number;
    uid: string;
    pid: string;
    id: string;
}
export type usertype = {
    uid: string | undefined;
    displayName: string | null | undefined;
    email: string | null | undefined;
}