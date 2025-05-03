const nomePersonagem = document.getElementById('nome-personagem'); //busca id no html
const idPersonagem = document.getElementById('id-personagem');
const imagemPersonagem = document.getElementById('imagem-personagem');
const form = document.getElementById('form');
const inputId = document.getElementById('input-id');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let personagemAtual = 7; //começa com o personagem id(7)

async function buscarPersonagem(id) { //funçao assincrona para buscar personagem 
  nomePersonagem.innerText = 'Carregando...'; //mostra (carregando...) enquanto carrega nome do personagem
  idPersonagem.innerText = ''; //limpa busca
  imagemPersonagem.style.display = 'none'; //deixa sem imagem enquanto carrega

  try {
    const resposta = await fetch(`https://api.disneyapi.dev/character/${id}`);
    // faz requisiçao para a api usando o ID dos personagens
    //await → faz o codigo esperar ate a resposta chegar
    if (resposta.status === 200) { //se status 200 (significa sucesso)
      const dados = await resposta.json(); //transforma em json(objeto)
      nomePersonagem.innerText = dados.data.name; //escreve nome do personagem
      idPersonagem.innerText = `ID: ${dados.data._id || id}`;
      /*caso o id nao existir na api usa oque o usuario digitou
      (para mostrar em baixo do nome do personagen)*/
      imagemPersonagem.src = dados.data.imageUrl; //coloca no src da imagem a url do api
      imagemPersonagem.style.display = 'block'; //faz a imagem aparecer (tira o display: none)
      personagemAtual = id; //mostra o id atual para a busca de proximo e anterior
    } else { //caso nao tenha resposta 
      nomePersonagem.innerText = 'Personagem não encontrado...';
      idPersonagem.innerText = '';
    }
  } catch (erro) { //caso o bloco try nao der certo
    console.error('Erro ao buscar personagem:', erro); //mostra qual foi o erro
    nomePersonagem.innerText = 'Erro na busca!'; //erro na busca do nome
    idPersonagem.innerText = ''; //limpa o id do personagem
  }
}

form.addEventListener('submit', (event) => { //quando o usuario → buscar
  event.preventDefault(); //evita que o site recarregue
  const id = parseInt(inputId.value); //converte o numero digitado pelo usuario em inteiro
  if (!isNaN(id)) { //se o usuario realmente digitou um numero
    buscarPersonagem(id); //funçao para busca de personagen
  }
  inputId.value = ''; //deixa busca vazia
});

//botoes anterior e proximo
btnPrev.addEventListener('click', () => { //botao anterior
  if (personagemAtual > 1) { //caso o numero atual for maior q 1(evita numeros negativos)
    personagemAtual--;  //diminui 1 do numero atual
    buscarPersonagem(personagemAtual);
  }
});

btnNext.addEventListener('click', () => { //botao proximo
  personagemAtual++; //aumenta 1 do numero atual
  buscarPersonagem(personagemAtual);
});

//carrega o primeiro personagem(7)
buscarPersonagem(personagemAtual);

  