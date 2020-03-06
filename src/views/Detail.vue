<template>
  <div>
    <shared-header></shared-header>
    <detail-section></detail-section>
  </div>
</template>

<script>
import SharedHeader from "../components/Shared/SharedHeader";
import DetailSection from "../components/Detail/DetailSection";

export default {
  components: {
    SharedHeader,
    DetailSection
  },
  beforeMount() {
    const id = this.$route.params.id;
    this.$store.dispatch("addDetail", { id });
  }
};
</script>
