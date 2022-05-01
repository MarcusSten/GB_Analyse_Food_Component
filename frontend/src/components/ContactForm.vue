<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-row>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="teal lighten-1"
                    v-bind = "attrs"
                    v-on="on"
                  >
                    <v-img
                        v-if="isMobile()"
                        src="../assets/email.svg"
                    />
                    <span
                        v-else
                        style="color: white;"
                    >Связаться с нами</span>

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
                    :counter="10"
                    :rules="nameRules"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email*"
                    :rules="emailRules"
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
              @click="sendFormResults"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-form>
</template>
<script>
import { isMobile } from 'mobile-device-detect';
export default {
  props:['cardData'],
  data: () => ({
    dialog: false,
    textToAdd: "",
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods:{
    isMobile(){
      return isMobile;
    },
    sendFormResults(){

      this.valid = this.validate();
      console.log(this.valid)
      if(this.valid){
        this.dialog = false;
      }

    },

    validate () {
      return this.$refs.form.validate()
    },

  },

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