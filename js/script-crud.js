const adicionarTarefaBtn = document.querySelector('.app__button--add-task')
const adicionarTarefaForm = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')

const tarefas = []

adicionarTarefaBtn.addEventListener('click', () => {
    adicionarTarefaForm.classList.toggle('hidden')
})

adicionarTarefaForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao : textarea.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

    textarea.value = ''
    adicionarTarefaForm.classList.add('hidden')
})