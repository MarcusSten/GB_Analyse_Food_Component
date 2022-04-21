<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="d-flex align-self-center right"
            color="error"
            v-bind="attrs"
            v-on="on"
        >
          Связаться с нами
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Связь с нами</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="Имя*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email*"
                    required
                ></v-text-field>
              </v-col>
              
                <v-col
                 cols="12"
                  >
                  <v-textarea
                      outlined
                      auto-grow
                      rows="8"
                      label="Ваше предложение"
                      hint = "Изложите ваши предложения"
                      v-model="textToAdd"
                  ></v-textarea>
               </v-col>
            </v-row>
          </v-container>
          <small>*указывает обязательное поле</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="error"
              text
              @click="dialog = false"
          >
            Отменить
          </v-btn>
          <v-btn
              color="green"
              text
              @click="dialog = false"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props:['cardData'],
  data: () => ({
    dialog: false,
    textToAdd: "",
  }),
  mounted() {
    if (this.cardData) {
      // console.log("Mounted", this.cardData)
      this.textToAdd += this.cardData.name;
      this.textToAdd += "\nПожалуйста, введите ваш текст далее:\n";
      this.textToAdd = this.textToAdd.toString();
    }

  }
}
</script>