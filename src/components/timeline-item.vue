<template>
  <div class="border-left timeline-container mt-4">
    <div class="timeline-item" v-for="edu of data" :key="Math.randon+edu.title">
      <h3>{{edu.title}}</h3>
      <div class="course-info">
        <span class="text-primary">{{edu.year}}</span>
        | {{edu.institution}}
      </div>
      <p>{{edu.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>

<style scoped lang="scss">
.timeline-container {
  height: 350px;
}
.timeline-item {
  margin-bottom: 20px;
  width: 65%;
  height: auto;
  background: #fff;
  margin-left: 20px;
  border-left: 3px solid $main_color;
  position: relative;
  z-index: 20;
  padding: 10px 20px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
    font-weight: normal;
  }
  div.course-info {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
  p {
    font-size: 0.9rem;
  }
}
.timeline-item:last-child {
  margin-bottom: 20px;
}
.timeline-item::before {
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 10px;
  position: absolute;
  background: #fff;
  border: 2px solid $main_color;
  top: 28px;
  left: -29px;
  z-index: 2;
}
.timeline-item::after {
  content: "";
  height: 2px;
  width: 29px;
  background-color: $main_color;
  position: absolute;
  top: 33px;
  left: -29px;
  z-index: 1;
}
</style>
