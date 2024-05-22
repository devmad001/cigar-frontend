<template>
      <ContactUsForm
        title="Contact us"
        :classname="{
          defaultClass: 'advertise-form',
          advertiseStyle: 'advertise-style',
        }"
      />
</template>

<script>
import ContactUsForm from "./forms/ContactUsForm";

export default {
  components: {
    ContactUsForm
  },
}
</script>
