<template>
  <v-app>
    <div class="about">
      <div>
        <a href="https://github.com/MarcusSten/GB_Analyse_Food_Component/tree/main" target="_blank">
          <i class='bx bxl-github'></i>
        </a>
      </div>
      <div class="creators-block">
        <h1>Creators</h1>
        <div class="creators">
          <v-avatar
            color="teal lighten-1"
            size="70"
          >Артем</v-avatar>
          <v-avatar
            color="teal lighten-1"
            size="70"
          >Вика</v-avatar>
          <v-avatar
            color="teal lighten-1"
            size="70"
          >Влад</v-avatar>
          <v-avatar
            color="teal lighten-1"
            size="70"
          >Олег</v-avatar>
        </div>
      </div>
      <div>
        <h1>Stack</h1>
        <h3 class="mobile-text">VueJS + NodeJS + Vuetify</h3>
        <v-col class="d-flex justify-center">
          <div class="stack-container">
            <simple-flowchart :scene.sync="data"></simple-flowchart>
          </div>
        </v-col>
      </div>
    </div>
  </v-app>
</template>

<script>
  import SimpleFlowchart from 'vue-simple-flowchart';
  import 'vue-simple-flowchart/dist/vue-flowchart.css';

  export default {
    components: {
      SimpleFlowchart
    },
    data() {
      return {
        data: {
          centerX: 500,
          centerY: 140,
          scale: 1,
          nodes: [
            {
                id: 1,
                x: -180,
                y: 150,
                type: 'Project',
                label: '',
            },
            {
                id: 2,
                x: -180,
                y: -110,
                type: 'Vue CLI',
                label: '',
            },
            {
                id: 3,
                x: -290,
                y: 20,
                type: 'Vue',
                label: '',
            },
            {
                id: 4,
                x: -400,
                y: 150,
                type: 'Node',
                label: '',
            },
            {
                id: 5,
                x: -400,
                y: -110,
                type: 'Vuetify',
                label: '',
            },
          ],
            links: [
            {
                id: 1,
                from: 1,
                to: 4,
            },
            {
                id: 2,
                from: 2,
                to: 3,
            },
            {
                id: 3,
                from: 3,
                to: 1,
            },
            {
                id: 4,
                from: 4,
                to: 1,
            },
            {
                id: 5,
                from: 5,
                to: 3,
            },
          ]
      },
    };
  }
}

</script>

<style>
  .stack-container {
    width: 500px;
  }

  .bx {
    font-size: 50px !important;
    color: #26A69A;
  }

  .bx:hover {
    color: #48817b;
  }

  .creators-block {
    width: 400px;
    margin: 0 auto;
  }

  .mobile-text {
    display: none;
  }

  @media screen and (max-width: 400px) {
      .creators {
        flex-direction: column;
        align-items: center;
        
      }
      .creators-block {
        width: 100%;
      }
      .stack-container {
        display: none;
      }
      .v-avatar {
        margin-bottom: 20px;
      }
      .mobile-text {
        display: block;
      }
  }

  .v-avatar {
    color: white;
    font-weight: bold;
  }

  .creators {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
</style>

<style>
  .stack-container .flowchart-node .node-main .node-type {
    color: #26A69A;
    font-weight: bold;
    font-size: 18px;
    background-color: white;
    margin-top: 20px;
  }

  .stack-container .flowchart-node {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
</style>
