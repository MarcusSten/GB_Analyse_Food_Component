<template>
  <div>
    <TextComp msg="Hello world" />
    <test-backend />
  </div>
</template>

<script>
import TestBackend from "./components/backendTesT/TestBackend.vue";
import TextComp from "./components/TextComp.vue";

export default {
  name: "App",
  components: {
    TextComp,
    TestBackend,
  },
};
</script>
