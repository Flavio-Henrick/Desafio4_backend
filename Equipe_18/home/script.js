const menuButton = document.getElementById('menu-button');
const navUl = document.querySelector('.nav-bar ul');
const optionsPanel = document.getElementById('options-panel');
const optionsButton = document.getElementById('options-button');
const holidayList = document.getElementById('holiday-list');

// Alternar menu mobile
menuButton.addEventListener('click', () => {
  navUl.classList.toggle('show');
  optionsPanel.classList.remove('visible');
});

// Alternar painel de opções
optionsButton.addEventListener('click', () => {
  optionsPanel.classList.toggle('visible');
  navUl.classList.remove('show');
});

// Alternar tema claro/escuro
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Aplicar tema salvo
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

// Carregar feriados
const apiKey = 'auBSbfzmgYpw0FrL9H2jsOd0EtmG7466';
const country = 'BR';
const year = new Date().getFullYear();

fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}&type=national`)
  .then(response => response.json())
  .then(data => {
    const holidays = data.response.holidays;
    holidayList.innerHTML = '';

    const traducoes = {
      "New Year's Day": "Ano Novo",
      "Carnival Monday": "Segunda-feira de Carnaval",
      "Carnival Tuesday": "Terça-feira de Carnaval",
      "Carnival end (until 2pm)": "Fim do Carnaval (até às 14h)",
      "Good Friday": "Sexta-feira Santa",
      "Tiradentes Day": "Dia de Tiradentes",
      "Labor Day / May Day": "Dia do Trabalho",
      "Corpus Christi": "Corpus Christi",
      "Independence Day": "Dia da Independência",
      "Our Lady of Aparecida / Children's Day": "Nossa Senhora Aparecida / Dia das Crianças",
      "Public Service Holiday": "Feriado de Serviço Público",
      "All Souls' Day": "Dia de Finados",
      "Republic Proclamation Day": "Proclamação da República",
      "Black Awareness Day": "Dia da Consciência Negra",
      "Christmas Eve (from 2pm)": "Véspera de Natal (a partir das 14h)",
      "Christmas Day": "Natal",
      "New Year's Eve (from 2pm)": "Véspera de Ano Novo (a partir das 14h)"
    };

    holidays.forEach(holiday => {
      const li = document.createElement('li');
      const nomeTraduzido = traducoes[holiday.name] || holiday.name;
      li.textContent = `${holiday.date.iso} - ${nomeTraduzido}`;
      holidayList.appendChild(li);
    });
  })
  .catch(error => {
    holidayList.innerHTML = '<li>Erro ao carregar feriados.</li>';
    console.error('Erro ao buscar feriados:', error);
  });
