import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Função de embaralhamento Fisher-Yates
function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // Enquanto restar elementos para embaralhar...
    while (currentIndex !== 0) {
  
      // Escolhe um elemento restante...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // E troca com o elemento atual.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function TaggingPage({ documentId }) {
    // Setup inicial de estados
    const [selectedTags, setSelectedTags] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [existingTags, setExistingTags] = useState([]);


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);
  

    useEffect(() => {
        const fetchAndShuffleTags = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/tags/');
                let shuffledTags = shuffleArray(response.data);
                shuffledTags = shuffledTags.slice(0, 2000).map(tag => tag.tag_name); // Pegue apenas os primeiros 2000
                console.log("Tags embaralhadas:", shuffledTags);
                setExistingTags(shuffledTags);
            } catch (error) {
                console.error("Erro ao buscar tags:", error);
            }
        };

        fetchAndShuffleTags();
    }, []);

    // const existingTags = ["Futebol", "Time", "Jogo"];
    
    // Manipular tags selecionadas
    const handleTagClick = tag => {
        if (!selectedTags.includes(tag)) {
          setSelectedTags([...selectedTags, tag]);
        }
    };
    
    // Remover tag selecionada
    const removeTag = tag => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    // Filtrar tags existentes
    const filteredTags = existingTags.filter(
    tag => tag.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Manipular input dinamicamente a cada caractere digitado
    const handleInputChange = (event) => {
        // Atualizar o valor do input
        const newInputValue = event.target.value;
        setInputValue(newInputValue);
        
        // Abrir o dropdown se houver texto no input
        if (newInputValue) {
            setDropdownOpen(true);
            // Filtrar tags existentes
            const newFilteredTags = existingTags.filter(tag =>
            tag.toLowerCase().includes(newInputValue.toLowerCase())
            );

        } else {
            setDropdownOpen(false);
        }
        };

    // Fechar dropdown ao clicar fora
    window.addEventListener('click', (event) => {
        if (!event.target.closest('.relative')) {
            closeDropdown();
        }
    });

    // Enviar tags selecionadas para o backend
    const handleSubmit = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/documents/${documentId}`);
        const documentData = response.data;
    
        const tagsAsString = selectedTags.join(";");
    
        documentData.tags = tagsAsString;
    
        await axios.put(`http://127.0.0.1:8000/documents/${documentId}`, documentData);
    
        console.log("Tags atualizadas com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar as tags:", error);
      }
    };    


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-gray rounded-lg shadow p-6">
        <img
          src="https://fakeimg.pl/600x400" // Substitua com a URL da imagem real
          alt="Document"
          className="mb-4 w-full h-32 object-cover rounded"
        />
 <div className="relative">
 <div className="flex flex-wrap items-center gap-2 p-2 border rounded">
    {selectedTags.map(tag => (
                <div
                    key={tag}
                    className="flex items-center gap-1 bg-red-200 px-2 py-1 rounded"
                >
                    <span className="text-red-700">{tag}</span>
                    <button
                    className="text-red-700 hover:text-red-900"
                    onClick={() => removeTag(tag)}
                    >
                    ×
                    </button>
                </div>
                ))}
      <input
        className="outline-none flex-grow w-full p-2"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownOpen(true)}
      />
    </div>
    {dropdownOpen && (
      <div className="absolute left-0 right-0 z-10 mt-1 bg-white border rounded shadow">
        <ul>
          {filteredTags.map(tag => (
            <li
              key={tag}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    )}
        </div>

        <div className="text-center">
        <h2 className="text-2xl text-gray font-semibold mb-4">Quais palavras-chave descrevem de forma apropriada o documento acima?</h2>
        </div>
    
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition ease-in duration-200">
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors duration-200">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

}

export default TaggingPage;