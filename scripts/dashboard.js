import {get} from "./api.js";


const carregarQuantidadeProjetos = async () => {

    const projetos = await get("http://localhost:5000/projetos");


};