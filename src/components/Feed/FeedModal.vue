<template>
  <div class="background">
    <div class="modal">
      <h2>필터</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <input
            :id="category.id"
            type="checkbox"
            :checked="category.checked"
            @change="onChangeCheckbox"
          />
          <label :for="category.id">{{ category.name }}</label>
        </li>
      </ul>
      <button @click="onClickButton">저장하기</button>
    </div>
  </div>
</template>

<script>
import { TOGGLE_FILTER, TOGGLE_CATEGORY } from "../../store/index";

export default {
  data() {
    return {
      checkedElements: this.$store.state.categories.map(c => ({
        id: c.id,
        checked: c.checked
      }))
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    onChangeCheckbox(e) {
      const id = Number(e.target.id);
      const targetIdx = this.checkedElements.findIndex(c => c.id === id);
      this.$set(
        this.checkedElements[targetIdx],
        "checked",
        !this.checkedElements[targetIdx]["checked"]
      );
    },
    onClickButton() {
      this.$store.commit(TOGGLE_FILTER);
      this.$store.commit(TOGGLE_CATEGORY, {
        checkedIds: this.checkedElements.filter(c => c.checked).map(c => c.id)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.background {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 460px;
  height: 268px;
  background-color: #ffffff;
  padding: 31px 30px;
  box-sizing: border-box;

  h2 {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 13px;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input[type="checkbox"] {
      appearance: none;
    }

    input[type="checkbox"] + label {
      cursor: pointer;
      user-select: none;
    }

    input[type="checkbox"] + label:before {
      content: " ";
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin: -2px 8px 0 0;
      text-align: center;
      vertical-align: middle;
      border: 1px solid $primary-grey;
    }

    input[type="checkbox"]:checked + label:before {
      content: "\2714";
      color: #000000;
    }
  }

  button {
    display: block;
    background-color: $primary-green;
    color: white;
    padding: 8px 20px;
    border-radius: 3px;
    margin-left: auto;
    margin-right: 1rem;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    width: 337px;
    height: 268px;
  }
}
</style>
