const { createApp } = Vue

  // 🔹 Componente per ogni singolo reclamo
  const ReclamoItem = {
    props: ['r'],
    emits: ['rimuovi'],
    template: `
      <li>
        <strong>{{ r.testo }}</strong>
        <span class="data">📅 {{ r.data }}</span>
        <button class="rimuovi" @click="$emit('rimuovi')">❌</button>
      </li>
    `
  }

  // 🔹 Componente per il form di inserimento
  const FormReclamo = {
    data() {
      return { testo: '' }
    },
    emits: ['nuovo-reclamo'],
    template: `
      <form @submit.prevent="invia">
        <label>Motivo del reclamo:</label><br>
        <input v-model="testo" placeholder="Scrivi qui..." required>
        <button>Invia</button>
      </form>
    `,
    methods: {
      invia() {
        this.$emit('nuovo-reclamo', this.testo)
        this.testo = ''
      }
    }
  }

  // 🔹 App principale
  createApp({
    components: { ReclamoItem, FormReclamo },
    data() {
      return {
        nome: 'Vale 💘',
        reclami: []
      }
    },
    methods: {
      aggiungiReclamo(testo) {
        const nuovo = { testo, data: new Date().toLocaleString() }
        this.reclami.push(nuovo)
        this.salva()
      },
      rimuoviReclamo(i) {
        this.reclami.splice(i, 1)
        this.salva()
      },
      perdonaTutti() {
        if (confirm('Vuoi davvero perdonare tutti i reclami? 💕')) {
          this.reclami = []
          this.salva()
        }
      },
      salva() {
        localStorage.setItem('reclami', JSON.stringify(this.reclami))
      }
    },
    mounted() {
      const salvati = localStorage.getItem('reclami')
      if (salvati) this.reclami = JSON.parse(salvati)
    }
  }).mount('#app')