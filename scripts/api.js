
//Função genérica para realizar uma requisição GET
const get = async (url) => {
    const response = await fetch(url);
    return await response.json();
};
//Função genérica para realizar uma requisição POST
const post = async (url, data) => {
    await fetch(url, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
};

export {get , post};
