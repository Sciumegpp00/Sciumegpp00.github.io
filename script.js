const { createApp } = Vue

createApp({
  data() {
    return {
      nome: 'Giulia 💖',
      nuovoReclamo: '',
      reclami: []
    }
  },
  methods: {
    inviaReclamo() {
      this.reclami.push({
        testo: this.nuovoReclamo,
        data: new Date().toLocaleString()
      })
      this.nuovoReclamo = ''
      localStorage.setItem('reclami', JSON.stringify(this.reclami))
    }
  },
  mounted() {
    const salvati = localStorage.getItem('reclami')
    if (salvati) this.reclami = JSON.parse(salvati)
  }
}).mount('#app')
