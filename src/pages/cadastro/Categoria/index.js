import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [Categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function HandleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://vini-flix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  });

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();

        setCategorias([
          ...Categorias,
          values,
        ]);

        setValues(valoresIniciais);
      }}
      >

        <FormField

          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={HandleChange}
        />

        <FormField

          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={HandleChange}
        />

        <FormField

          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={HandleChange}
        />

        <Button>
          Cadastrar
        </Button>

      </form>

      {Categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {Categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
