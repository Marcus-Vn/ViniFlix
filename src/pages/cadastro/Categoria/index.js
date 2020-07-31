import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroCategoria(){

  const valoresIniciais = {
    nome: 'categoria',
    descrição: 'descrição',
    cor:'',
  }
  const [Categorias, setCategorias] =  useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor){
    setValues({
      ...values,
      [chave]: valor,
    })

  }

  function HandleChange(infosDoEvento){
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value
      );
  }

  return(
    <PageDefault>
        <h1>Cadastro de Categoria: {values.nome}</h1>
          
          <form onSubmit={function handleSubmit(infosDoEvento) {
            infosDoEvento.preventDefault();
            
            setCategorias([
              ...Categorias,
              values
            ]);

            setValues(valoresIniciais);
          }}>

            <FormField

              label = "Nome da Categoria"
              type = "text"
              name = "nome"
              value = {values.nome}
              onChange={HandleChange} 
            
            />

            <FormField
            
              label = "Descrição"
              type = "text"
              name = "descrição"
              value = {values.descrição}
              onChange={HandleChange} 
          
            />

            <FormField
              
              label = "Cor"
              type = "color"
              name = "cor"
              value = {values.cor}
              onChange={HandleChange} 
          
            />

              <button>
                Cadastrar
              </button>

              <ul>
                {Categorias.map((categoria, indice) =>{
                  return(
                    <li key={`${categoria}${indice}`}>
                      {categoria.nome}
                    </li>
                  )                  
                })}
              </ul>

          </form>

        <Link to="/">
          Ir para home
        </Link>
    </PageDefault>
  )

}

export default CadastroCategoria;