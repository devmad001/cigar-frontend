<template>
  <div class="crop">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            :movable="false"
            ref="cropper"
            :aspect-ratio="3 / 3"
            :src="image"
            preview=".preview"
          />
        </div>
        <div class="actions">
          <button aria-label="submit" :disabled="loader" class="crop-button" @click.prevent="cropImage">
            <Loader v-if="loader"/>
            <span v-else>Save</span>
          </button>
        </div>
      </section>
  </div>
</template>

<script>
import Loader from '../../../ui/BaseLoader'
import VueCropper from 'vue-cropperjs';
import './cropperStyle.scss';

export default {
  components: {
    VueCropper, Loader
  },
  props: {
    image: {
      type: String
    }
  },
  data() {
    return {
      imgSrc: '',
      cropImg: '',
      data: null,
      newImg: null
    };
  },
  computed: {
    loader() {
      return this.$store.getters.loader
    },
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    dataURLtoFile(url, filename) {
      let arr = url.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
      while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  },
   async cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL('image/jpeg');
      const uniqName = Date.now()
      const cropped = this.dataURLtoFile(this.cropImg, `${uniqName}.jpeg`)
      let formData = new FormData
      formData.append('image', cropped)
      this.$store.dispatch('setLoader', true)
      const response = await fetch(
        'https://hiscigar.com/api/v1/users/profile',
        {
          method: 'PUT',
          headers: {
            'Session-Token': this.token
          },
          body: formData
        }
      );
     const responseData = await response.json();
      if (responseData) this.$store.dispatch('setLoader', false)
      this.$store.dispatch('setCroppedAvatar', null)
      this.$store.dispatch('getUserInfo')
    },
  }
};
</script>

<style lang="scss" scoped>
svg path,
svg rect{
  fill: #6C3F13;
}
input[type="file"] {
  display: none;
}

.loader {
  display: flex;
}

.crop-button {
  margin-top: 15px;
  cursor: pointer;
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6C3F13;
  border-radius: 25px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none;
  color: #fff;
  font-family: Lato;
  &:disabled {
    background-color: #E5E5E5;
    pointer-events: none;
  }
}

.crop {
  display: flex;
  justify-content: center;
}

.cropper-area {
  width: 70%;
}

.actions {
  margin-top: 1rem;
  display: flex;
}

.cropper-bg {
  background-image: none !important;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}
</style>
