<template>
  <v-app>
    <div class="about">
      <div>
        <h1>Stack</h1>
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
</style>

<style>
  .stack-container .flowchart-node .node-main .node-type {
    color: #ff5252;
    font-weight: bold;
    font-size: 18px;
    background-color: white;
    margin-top: 20px;
  }

  .stack-container .flowchart-node {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
</style>
