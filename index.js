

import express, { response } from 'express';
import path from 'path'

const host = '0.0.0.0';
const porta = 3000;

const app = express ();

let listaEmpresa = [];

app.use(express.static(path.join(process.cwd(), 'publico')));
app.use(express.urlencoded({extendend: true}));

function cadastrarEmpresa (requisicao, resposta)
{
    const cnpj = requisicao.body.cnpj;
    const nome = requisicao.body.nome;
    const nome_fornecedor = requisicao.body.nome_fornecedor;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const tel = requisicao.body.tel;

    if(cnpj && nome && nome_fornecedor && endereco && cidade && uf && cep && email && tel)
    {
        listaEmpresa.push ({
            cnpj: cnpj,
            nome: nome,
            nome_fornecedor: nome_fornecedor,
            endereco: endereco,
            cidade: cidade,
            uf: uf,
            cep: cep,
            email: email,
            tel: tel
        })
        resposta.redirect('/listarEmpresas');
    }
    else
    {
        resposta.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="cadastrar.css">
            <title>Página de cadastro</title>
        </head>
        <body>

            <div class="container">
                <form method="POST" action="/cadastroEmpresa">
                    <h1>Cadastro de empresa</h1>

                    <label for="nome">Nome da empresa</label>
                    <input type="text" id="nome" name="nome" value=${nome}>`);
            
        if(nome == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Nome invalido</p>`);
        }

        resposta.write(`
        <label for="nome_fornecedor">Nome do fornecedor</label>
            <input type="text" id="nome_fornecedor" name="nome_fornecedor" value=${nome_fornecedor}>`);

        if(nome_fornecedor == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Nome do fornecedor invalido!</p>`);
        }

        resposta.write(`
        <label for="cnpj">CNPJ</label>
        <input type="text" id="cnpj" name="cnpj" value=${cnpj}>`);
        
        if(cnpj == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">CNPJ invalido!</p>`);
        }
        
        resposta.write(`<label for="">Endereço</label>
        <input type="text" id="endereco" name="endereco" value=${endereco}>`);

        if(endereco == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Endereço invalido!</p>`);
        }

        resposta.write(`<label for="cidade">Cidade</label>
        <input type="text" id="cidade" name="cidade" value=${cidade}>`);

        if(cidade == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Cidade invalida!</p>`);
        }

        resposta.write(`<label for="uf">Estado</label>
        <select name="uf" id="uf">
            <option selected disable value=${uf}>Selecione uma opção</option>
            <option>AC</option>
            <option>AL</option>
            <option>AP</option>
            <option>AM</option>
            <option>BA</option>
            <option>CE</option>
            <option>DF</option>
            <option>ES</option>
            <option>GO</option>
            <option>MA</option>
            <option>MT</option>
            <option>MS</option>
            <option>MG</option>
            <option>PA</option>
            <option>PB</option>
            <option>PR</option>
            <option>PE</option>
            <option>PI</option>
            <option>RJ</option>
            <option>RN</option>
            <option>RS</option>
            <option>RO</option>
            <option>RR</option>
            <option>SC</option>
            <option>SP</option>
            <option>SE</option>
            <option>TO</option>
          </select>`);

        if(!uf)
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Estado invalido!</p>`);
        }

        resposta.write(`<label for="cep">CEP</label>
          <input type="text" name="cep" id="cep" value=${cep}>`);

        if(cep == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">CEP invalido!</p>`);
        }

        resposta.write(`<label for="email">Email</label>
        <input type="text" name="email" id="email" value=${email}>`);

        if(email == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Email invalido!</p>`);
        }

        resposta.write(`<label for="tel">Telefone</label>
        <input type="text" name="tel" id="tel" value=${tel}>`);

        if(tel == "")
        {
            resposta.write(`<p style="color: white; background-color: rgb(248, 79, 79); padding: 5px; border-radius: 8px;">Telefone invalido!</p>`);
        }

        resposta.write(` <div class="botoes">
        <input type="submit" class="btn cadastro" value="Cadastrar">
        <input type="reset" class="btn redefinir" value="Redefinir">
            </div> 

            <a href="index.html" class="voltar">Voltar para página principal</a>
            <a href="/listarEmpresas" class="listar">Listar empresas cadastradas</a>

        </form>
        </div>  

        </body>
        </html>`);

        resposta.end();
    }
}

app.get('/listarEmpresas' , (req,resp) => {
    resp.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alunos Cadastrados</title>

        <style>
            *
            {
                padding: 0;
                margin: 0;
                box-sizing: border-box;

                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            table, th, td
            {
                border-collapse:collapse;
                padding: 5px;
            }

            table
            {
                display: flex;
                justify-content: center;

            }

            th
            {
                background-color: 
                lightskyblue;
                color: whit;
            }

            th,td
            {
                border: 1px solid black;
            }

            h1
            {
                display: flex;
                justify-content: center;
            }

            a
            {
                display: flex;
                flex-direction: row;
                justify-content: center;
                text-align: center;
                text-decoration: none;
                color: rgb(255, 102, 0);
            }

            a:hover
            {
                font-size: 17px;
            }
        </style>
    </head>
    <body>
        
        <table>
                <h1>Empresas Cadastradas</h1>
                <tr>
                    <th>Nome da empresa</th>
                    <th>Nome do fornecedor</th>
                    <th>CNPJ</th>
                    <th>Endereço</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>CEP</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr> 
            `);      
            
                for(let i=0;i<listaEmpresa.length;i++)
                {
                    resp.write(`<tr>
                    <td>${listaEmpresa[i].nome}</td>
                    <td>${listaEmpresa[i].nome_fornecedor}</td>
                    <td>${listaEmpresa[i].cnpj}</td>
                    <td>${listaEmpresa[i].endereco}</td>
                    <td>${listaEmpresa[i].cidade}</td>
                    <td>${listaEmpresa[i].uf}</td>
                    <td>${listaEmpresa[i].cep}</td>
                    <td>${listaEmpresa[i].email}</td>
                    <td>${listaEmpresa[i].tel}</td>
                    </tr>
                    
                    `);
                }
                
                resp.write(`
                </table>
                <a href="index.html">Voltar a página Inicial</a>
                <a href="cadastrar.html">Cadastrar mais empresas</a>
            </body>
            </html>`);
    resp.end();
})

app.post('/cadastroEmpresa', cadastrarEmpresa);

app.listen(porta,host,() => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
})