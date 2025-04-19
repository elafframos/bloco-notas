// Tema
document.querySelector('.tema').addEventListener('click', function(){
    document.body.classList.toggle('dark')
    localStorage.setItem('tema', document.body.classList.contains('dark') ? 'dark' : 'light')
})

if(localStorage.getItem('tema') === 'dark'){
    document.body.classList.add('dark')
}

// Menu hambuerger
document.querySelector('img').addEventListener('click', function(){
    const config = document.querySelector('.config')
    const fechar = document.querySelector('.fechar')

    config.style.display = 'block'

    fechar.addEventListener('click', function(){
        config.style.display = 'none'
    })
})

// Adiciona uma nova nota
document.querySelector('.salvar').addEventListener('click', function(){
    const nota = document.querySelector('.texto-nota').value
    if(nota.trim() === "") return // O trim() serve para remover espaços

    let notas = JSON.parse(localStorage.getItem('notas')) || []
    notas.push(nota)
    localStorage.setItem('notas', JSON.stringify(notas))

    renderizarNotas()
    document.querySelector('.texto-nota').value = ""
})

// Renderiza todas as notas salvas
function renderizarNotas(){
    const secao = document.querySelector('.notas-salvas')
    secao.innerHTML = ""

    const notas = JSON.parse(localStorage.getItem('notas')) || []

    notas.forEach((nota, index) => {
        const novaNota = document.createElement('p')
        novaNota.classList.add('novaNota')
        novaNota.textContent = nota

        const apagar = document.createElement('button')
        apagar.innerHTML = 'X'
        apagar.classList.add('x')

        apagar.addEventListener('click', () => {
            notas.splice(index, 1) // Remove a nota do array
            localStorage.setItem('notas', JSON.stringify(notas))
            renderizarNotas() // Re-renderiza as notas
            alert('Nota apagada com sucesso!')
        })

        novaNota.appendChild(apagar)
        secao.appendChild(novaNota)
    })
}

// Ao carregar a página renderizar todas as notas
window.addEventListener('load', renderizarNotas)